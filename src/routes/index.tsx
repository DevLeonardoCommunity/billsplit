import { component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import Button from "~/components/button/button";

export default component$(() => {
  const nav = useNavigate();

  return (
    <>
      <main>
        <div class="flex flex-col gap-10 items-center">
          <h2 class="text-3xl">Split your travel expenses easily</h2>
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
