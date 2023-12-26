import { component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

export default component$(() => {
  const nav = useNavigate();

  return (
    <header class="w-full p-10 flex justify-between">
      <div class="cursor-pointer text-4xl" onClick$={() => nav("/")}>
        BillSplit
      </div>
    </header>
  );
});
