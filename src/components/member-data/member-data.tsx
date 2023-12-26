import type { QRL } from "@builder.io/qwik";
import { $, component$, useStore } from "@builder.io/qwik";
import Button from "../button/button";

export type MemberDataProps = {
  name: string;
  items: {
    name: string;
    price: number;
  }[];
  add: QRL<() => void>;
  remove: QRL<(index: number) => void>;
};

export default component$(() => {
  const store = useStore<MemberDataProps>({
    name: "",
    items: [
      {
        name: "",
        price: 0,
      },
    ],
    add: $(function (this: MemberDataProps) {
      this.items = this.items.concat({
        name: "",
        price: 0,
      });
    }),
    remove: $(function (this: MemberDataProps, index: number) {
      this.items = this.items.filter((_, i) => i !== index);
    }),
  });

  return (
    <div class="flex flex-col gap-4 p-4 border-2 border-solid rounded border-sky-500 bg-blue-300 w-[300px]">
      <div class="flex gap-2 items-center">
        <input
          type="text"
          class="w-full shadow border-2 rounded p-1"
          onInput$={(_, el) => (store.name = el.value)}
        />
        <span class="mx-4">{store.items.length}</span>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-2">
          {store.items.map((item, i) => (
            <div key={`_${i}${item.name}`} class="flex gap-2">
              <input
                type="text"
                class="w-full shadow border-2 rounded p-1"
                placeholder="Item name"
                value={item.name}
                onChange$={(_, el) => (item.name = el.value)}
              />
              <input
                type="number"
                class="w-full shadow border-2 rounded p-1"
                placeholder="Price"
                value={item.price}
                onChange$={(_, el) => (item.price = Number(el.value))}
              />
              <Button
                onClick$={() => {
                  store.remove(i);
                }}
              >
                X
              </Button>
            </div>
          ))}
          Total: {store.items.reduce((acc, item) => acc + item.price, 0)}
        </div>
        <Button onClick$={$(() => store.add())}>+1</Button>
      </div>
    </div>
  );
});
