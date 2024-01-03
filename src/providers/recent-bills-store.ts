import type { Bill } from "~/types";

const BILLS_KEY = "recentBills";

type RecentBills = {
  [key: string]: Bill;
};

function getRecentBill(id: string): Bill | undefined {
  return getRecentBills()[id];
}

function getRecentBills(): RecentBills {
  return JSON.parse(localStorage.getItem(BILLS_KEY) || "{}");
}

function getRecentBillsArray(): Bill[] {
  return Object.values(getRecentBills());
}

function saveRecentBill(bill: Pick<Bill, "id" | "members">): void {
  const bills = getRecentBills();
  const existingBill: Bill = bills[bill.id];

  bills[bill.id] = {
    ...bill,
    createdAt: existingBill?.createdAt ?? new Date(),
    name: existingBill?.name ?? `Bill ${Object.keys(bills).length + 1}`,
  };
  localStorage.setItem(BILLS_KEY, JSON.stringify(bills));
}

export const recentBillsStore = {
  getRecentBill,
  getRecentBills,
  getRecentBillsArray,
  saveRecentBill,
};
