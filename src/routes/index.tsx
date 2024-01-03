import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import Button from "~/components/button/button";
import {
  type RecentBill,
  recentBillsStore,
} from "~/providers/recent-bills-store";

export default component$(() => {
  const nav = useNavigate();
  const recentBills = useSignal<RecentBill[]>([]);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    recentBills.value = recentBillsStore.getRecentBillsArray();
  });

  const onStart = $(() => {
    sessionStorage.setItem(
      "NEWBILL",
      JSON.stringify({
        name: "Untitled Bill",
        membersCount: 3,
      }),
    );

    nav("/start");
  });

  return (
    <>
      <main>
        <div class="flex flex-col gap-10 items-center">
          <h2 class="text-3xl">Split your travel expenses easily</h2>
          <div>
            <Button size={"big"} onClick$={onStart}>
              Start!
            </Button>
          </div>
          {recentBills.value.length > 0 && (
            <div>
              <h3 class="text-2xl">Recent Bills</h3>
              <ul>
                {recentBills.value.map((bill) => (
                  <li key={bill.id} class="mt-2">
                    <a
                      href={`/start/${bill.id}`}
                      class="text-blue-600 hover:underline"
                    >
                      {bill.name} (
                      {new Date(bill.updatedAt).toLocaleDateString()})
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
