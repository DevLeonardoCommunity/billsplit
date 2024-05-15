import {
  $,
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import Button from "~/components/button/button";
import { FaXmarkSolid } from "@qwikest/icons/font-awesome";

import {
  type RecentBill,
  recentBillsStore,
} from "~/providers/recent-bills-store";

export default component$(() => {
  const billData = useStore({
    billName: "",
    memberCount: 0,
  });

  const nav = useNavigate();
  const recentBills = useSignal<RecentBill[]>([]);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    recentBills.value = recentBillsStore.getRecentBillsArray();
  });

  const onStart = $(async () => {
    if (billData.billName.trim() === "") {
      alert("Enter bill's name");
      return;
    }
    if (billData.memberCount === 0) {
      alert("Enter number of members");
      return;
    }
    billData.billName = billData.billName.trim();

    const searchParams = new URLSearchParams({
      billName: billData.billName,
      memberCount: billData.memberCount.toString(),
    });
    await nav("/start?" + searchParams.toString());
  });

  return (
    <>
      <main>
        <div class="flex flex-col gap-4 items-center">
          <h2 class="text-3xl">Split your travel expenses easily</h2>

          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label for="bill-name" class="block mb-2 text-xl font-medium">
                Bill name
              </label>
              <input
                type="text"
                id="bill-name"
                class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter name of bill"
                onInput$={(_, el) => (billData.billName = el.value)}
              />
            </div>
            <div>
              <label for="bill-name" class="block mb-2 text-xl font-medium">
                Number of members
              </label>
              <input
                type="number"
                id="bill-name"
                class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter number of members"
                onInput$={(_, el) =>
                  (billData.memberCount = parseInt(el.value))
                }
              />
            </div>
          </div>
          <Button size={"big"} onClick$={onStart}>
            Start!
          </Button>
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
                      {new Intl.DateTimeFormat(undefined, {
                        dateStyle: "medium",
                        timeStyle: "medium",
                      }).format(new Date(bill.updatedAt))}
                      )
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
