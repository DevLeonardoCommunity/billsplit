import type { RecentBill } from "~/types";

const BILLS_KEY = "recentBills";

type RecentBills = {
  [key: string]: RecentBill;
};

function getRecentBills(): RecentBills {
  return JSON.parse(localStorage.getItem(BILLS_KEY) || "{}");
}

function getRecentBillsArray(): RecentBill[] {
  return Object.values(getRecentBills());
}

function saveRecentBill(bill: Pick<RecentBill, "id" | "members">): void {
  const bills = getRecentBills();
  const existingBill: RecentBill = bills[bill.id];

  bills[bill.id] = {
    ...bill,
    createdAt: existingBill?.createdAt ?? new Date(),
    name: existingBill?.name ?? `Bill ${Object.keys(bills).length + 1}`,
  };
  localStorage.setItem(BILLS_KEY, JSON.stringify(bills));
}

export const recentBillsStore = {
  getRecentBills,
  getRecentBillsArray,
  saveRecentBill,
};
