import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <footer class="w-full p-10 text-center">
      Work in progress | Contribute on{" "}
      <a
        class="text-blue-600 hover:underline"
        href="https://github.com/Balastrong/billsplit"
        target="_blank"
      >
        GitHub
      </a>{" "}
      ⭐️
    </footer>
  );
});
