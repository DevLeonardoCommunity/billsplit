import { component$ } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import Button from "~/components/button/button";

export default component$(() => {
  const nav = useNavigate();

  return (
    <>
      <main>
        <div class="flex flex-col gap-10 items-center">
          <p>Lorem ipsum dolor sit amet</p>
          <div>
            <Button size={"big"} onClick$={() => nav("/start")}>
              Start!
            </Button>
          </div>
        </div>
      </main>
    </>
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
