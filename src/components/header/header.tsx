import { component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

export default component$(() => {
  const nav = useNavigate();

  return (
    <header class="w-full px-8 py-3 flex justify-between bg-blue-300 sticky top-0 sticky:bg-red-50">
      <div class="cursor-pointer text-3xl" onClick$={() => nav("/")}>
        BillSplit
      </div>
    </header>
  );
});
