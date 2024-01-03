import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStore,
  useTask$,
  type QRL,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import Button from "~/components/button/button";
import MemberData from "~/components/member-data/member-data";
import { useBillStorage } from "~/hooks/useBillStorage";
import { recentBillsStore } from "~/providers/recent-bills-store";
import type { Member } from "~/types";
import { sum } from "~/utils/math";
import { computeSplit, type Transaction } from "~/utils/split";

export type MemberDataStore = Member & {
  add: QRL<() => void>;
  remove: QRL<(index: number) => void>;
  clear: QRL<() => void>;
};

const initialStore: () => MemberDataStore = () => ({
  items: [
    {
      id: Math.random().toString(36).slice(2),
    },
  ],
  add: $(function (this: MemberDataStore) {
    this.items = this.items.concat({
      id: Math.random().toString(36).slice(2),
    });
  }),
  remove: $(function (this: MemberDataStore, index: number) {
    this.items = this.items.filter((_, i) => i !== index);
  }),
  clear: $(function (this: MemberDataStore) {
    this.items = [];
  }),
});

type BillStore = {
  name: string;
  members: MemberDataStore[];
  clearAll: QRL<() => void>;
};

export default component$(() => {
  const store = useStore<BillStore>({
    name: "Untitled Bill",
    members: [initialStore(), initialStore(), initialStore()],
    clearAll: $(function (this: BillStore) {
      this.members.forEach((member) => member.clear());
    }),
  });
  const isDirty = useSignal(true);
  const transactions = useSignal<Transaction[] | undefined>(undefined);
  const { params } = useLocation();
  const { get, save } = useBillStorage();

  // eslint-disable-next-line qwik/no-use-visible-task
  // useVisibleTask$(() => {
  //   const recent = recentBillsStore.getRecentBill(params.id);
  //   if (!recent) return;

  //   store.members.forEach((member, i) => {
  //     member.name = recent.members[i].name;
  //     member.items = recent.members[i].items;
  //   });
  //   store.name = recent.name;
  // });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    const recent = await get(params.id);
    if (!recent) return;

    store.members.forEach((member, i) => {
      member.name = recent.members[i].name;
      member.items = recent.members[i].items;
    });
    store.name = recent.name;
  });

  const grandTotal = useComputed$(() =>
    sum(store.members.map(({ items }) => sum(items.map(({ price }) => price)))),
  );

  const split = useComputed$(
    () => Math.round((grandTotal.value / store.members.length) * 100) / 100,
  );

  useTask$(({ track }) => {
    track(grandTotal);
    isDirty.value = true;
  });

  const onSplitClick = $(async () => {
    isDirty.value = false;
    transactions.value = await computeSplit(store.members);

    recentBillsStore.saveRecentBill({
      id: params.id,
      members: store.members.map(({ name, items }) => ({
        name,
        items,
      })),
    });

    // Store to Bill
    save({
      id: params.id,
      name: store.name,
      members: store.members.map(({ name, items }) => ({
        name,
        items,
      })),
    });
  });

  return (
    <div>
      <h2 class="text-3xl mb-4 text-center">{store.name}</h2>
      <div class="flex flex-col md:flex-row gap-8">
        <div class="flex flex-col gap-4 flex-1 items-center">
          {store.members.map((member, i) => (
            <MemberData key={i} store={member} number={i + 1} />
          ))}
        </div>
        <div class="flex-1 text-center ">
          <p class="mb-4">Grand total: {grandTotal}</p>
          <p class="mb-4">Split: {split}</p>
          <div class="flex justify-center items-center gap-2">
            <Button onClick$={onSplitClick} size={"big"}>
              Split your bills!
            </Button>
            <div>
              <Button
                variant="danger"
                onClick$={() => {
                  store.clearAll();
                  isDirty.value = false;
                  transactions.value = undefined;
                }}
              >
                Reset
              </Button>
            </div>
          </div>
          {transactions.value && (
            <div class="mt-4">
              {isDirty.value && <p class="mb-2">You have unsaved changes!</p>}
              {transactions.value.length > 0
                ? transactions.value.map((transaction, i) => {
                    return (
                      <div key={i}>
                        {transaction.from} owes {transaction.to}{" "}
                        {transaction.amount}
                      </div>
                    );
                  })
                : "You're all even!"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
