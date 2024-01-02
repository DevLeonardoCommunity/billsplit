import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import Button from "~/components/button/button";
import { recentBillsStore } from "~/providers/recent-bills-store";
import type { RecentBill } from "~/types";

export default component$(() => {
  const nav = useNavigate();
  const recentBills = useSignal<RecentBill[]>([]);

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
            {recentBills.value.length > 0 && (
              <div>
                <h3>Recent Bills</h3>
                {recentBills.value.map((bill) => (
                  <div key={bill.id}>
                    <a href={`/start/${bill.id}`}>{bill.name}</a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
});
