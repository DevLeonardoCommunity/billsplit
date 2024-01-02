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

function saveRecentBill(bill: RecentBill): void {
  const bills = getRecentBills();
  bills[bill.id] = bill;
  localStorage.setItem(BILLS_KEY, JSON.stringify(bills));
}

export const recentBills = {
  getRecentBills,
  getRecentBillsArray,
  saveRecentBill,
};
