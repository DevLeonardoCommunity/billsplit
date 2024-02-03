import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import Button from "~/components/button/button";
import { FaXmarkSolid } from "@qwikest/icons/font-awesome";

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
                  <li key={bill.id} class="mt-2 flex items-center">
                    <a
                      href={`/start/${bill.id}`}
                      class="text-blue-600 hover:underline"
                    >
                      {bill.name} (
                      {new Date(bill.updatedAt).toLocaleDateString()})
                    </a>
                    <button
                      class="text-[#c0392b] hover:text-[#34495e] ml-2"
                      onClick$={() => {
                        recentBills.value = recentBillsStore.removeRecentBill(
                          bill.id,
                        );
                      }}
                    >
                      <FaXmarkSolid font-size={24} />
                    </button>
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
