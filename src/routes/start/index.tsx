import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import MemberData from "~/components/member-data/member-data";

export default component$(() => {
  return (
    <div class="flex flex-col gap-4">
      <MemberData />
      <MemberData />
      <MemberData />
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
