const BILLS_KEY = "recentBills";

export type RecentBill = {
  id: string;
  name: string;
  updatedAt: Date;
};

type RecentBills = {
  [key: string]: RecentBill;
};

function getRecentBill(id: string): RecentBill | undefined {
  return getRecentBills()[id];
}

function getRecentBills(): RecentBills {
  return JSON.parse(localStorage.getItem(BILLS_KEY) || "{}");
}

function getRecentBillsArray(): RecentBill[] {
  return Object.values(getRecentBills());
}

function saveRecentBill(bill: Pick<RecentBill, "id" | "name">): void {
  const bills = getRecentBills();

  bills[bill.id] = {
    ...bill,
    updatedAt: new Date(),
  };
  localStorage.setItem(BILLS_KEY, JSON.stringify(bills));
}

function removeRecentBill(id: string): RecentBill[] {
  const bills = getRecentBills();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [id]: removeBill, ...newBills } = bills;

  localStorage.setItem(BILLS_KEY, JSON.stringify(newBills));

  return getRecentBillsArray();
}

export const recentBillsStore = {
  getRecentBill,
  getRecentBills,
  getRecentBillsArray,
  saveRecentBill,
  removeRecentBill,
};
