import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import Button from "~/components/button/button";
import { recentBillsStore } from "~/providers/recent-bills-store";
import type { Bill } from "~/types";

export default component$(() => {
  const nav = useNavigate();
  const recentBills = useSignal<Bill[]>([]);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    recentBills.value = recentBillsStore.getRecentBillsArray();
  });

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
          {recentBills.value.length > 0 && (
            <div>
              <h3 class="text-2xl">Recent Bills</h3>
              <ul>
                {recentBills.value.map((bill) => (
                  <li key={bill.id} class="text-center mt-2">
                    <a
                      href={`/start/${bill.id}`}
                      class="text-blue-600 hover:underline"
                    >
                      {bill.name} (
                      {new Date(bill.createdAt).toLocaleDateString()})
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </>
  );
});
