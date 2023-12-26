import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStore,
  type QRL,
  useTask$,
} from "@builder.io/qwik";
import Button from "~/components/button/button";
import MemberData from "~/components/member-data/member-data";
import { sum } from "~/utils/math";
import { computeSplit, type Transaction } from "~/utils/split";

export type MemberDataStore = {
  name?: string;
  items: {
    id: string;
    name?: string;
    price?: number;
  }[];
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
  members: MemberDataStore[];
  clearAll: QRL<() => void>;
};

export default component$(() => {
  const store = useStore<BillStore>({
    members: [initialStore(), initialStore(), initialStore()],
    clearAll: $(function (this: BillStore) {
      this.members.forEach((member) => member.clear());
    }),
  });
  const isDirty = useSignal(true);

  const grandTotal = useComputed$(() =>
    sum(store.members.map(({ items }) => sum(items.map(({ price }) => price))))
  );

  const split = useComputed$(
    () => Math.round((grandTotal.value / store.members.length) * 100) / 100
  );

  useTask$(({ track }) => {
    track(grandTotal);
    isDirty.value = true;
  });

  const transactions = useSignal<Transaction[] | undefined>(undefined);

  return (
    <div class="flex flex-col md:flex-row gap-8">
      <div class="flex flex-col gap-4 flex-1 items-center">
        <MemberData store={store.members[0]} number={1} />
        <MemberData store={store.members[1]} number={2} />
        <MemberData store={store.members[2]} number={3} />
      </div>
      <div class="flex-1 text-center ">
        <p class="mb-4">Grand total: {grandTotal}</p>
        <p class="mb-4">Split: {split}</p>
        <div class="flex justify-center items-center gap-2">
          <Button
            onClick$={async () => {
              isDirty.value = false;
              transactions.value = await computeSplit(store.members);
            }}
            size={"big"}
          >
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
  );
});
