import type { QRL } from "@builder.io/qwik";
import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Button from "~/components/button/button";
import MemberData from "~/components/member-data/member-data";
import type { Transaction } from "~/utils/split";
import { computeSplit } from "~/utils/split";

export type MemberDataStore = {
  name: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  add: QRL<() => void>;
  remove: QRL<(index: number) => void>;
};

const initialStore: () => MemberDataStore = () => ({
  name: "",
  items: [
    {
      id: Math.random().toString(36).slice(2),
      name: "",
      price: 0,
    },
  ],
  add: $(function (this: MemberDataStore) {
    this.items = this.items.concat({
      id: Math.random().toString(36).slice(2),
      name: "",
      price: 0,
    });
  }),
  remove: $(function (this: MemberDataStore, index: number) {
    this.items = this.items.filter((_, i) => i !== index);
  }),
});

export default component$(() => {
  const store = useStore<MemberDataStore[]>([
    initialStore(),
    initialStore(),
    initialStore(),
  ]);

  const grandTotal = useComputed$(() =>
    store.reduce((acc, store) => {
      return acc + store.items.reduce((acc, item) => acc + item.price, 0);
    }, 0)
  );

  const split = useSignal<Transaction[] | undefined>(undefined);

  return (
    <div class="flex flex-row">
      <div class="flex flex-col gap-4 flex-1">
        <MemberData store={store[0]} />
        <MemberData store={store[1]} />
        <MemberData store={store[2]} />
      </div>
      <div class="flex-1">
        <p>Grand total: {grandTotal}</p>
        <Button
          onClick$={async () => {
            split.value = await computeSplit(store);
          }}
        >
          Split
        </Button>
        {split.value && (
          <div>
            {split.value.map((transaction, i) => {
              return (
                <div key={i}>
                  {transaction.from} owes {transaction.to} {transaction.amount}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
