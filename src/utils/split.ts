import { $ } from "@builder.io/qwik";
import type { MemberDataStore } from "~/routes/start";

export type Transaction = {
  from: string;
  to: string;
  amount: number;
};

export const computeSplit = $(
  (members: Pick<MemberDataStore, "name" | "items">[]): Transaction[] => {
    const totals = members.map((member) =>
      member.items.reduce((acc, item) => acc + item.price, 0)
    );

    const average =
      totals.reduce((acc, total) => acc + total, 0) / totals.length;
    const owes = totals.map((total, i) => ({
      index: i,
      amount: total - average,
    }));
    const positive = owes.filter((owe) => owe.amount > 0);
    const negative = owes.filter((owe) => owe.amount <= 0);

    const transactions: Transaction[] = [];

    for (const positiveOwe of positive) {
      for (const negativeOwe of negative) {
        if (positiveOwe.amount + negativeOwe.amount > 0) {
          transactions.push({
            from: members[negativeOwe.index].name || `Mr. ${negativeOwe.index}`,
            to: members[positiveOwe.index].name || `Mr. ${positiveOwe.index}`,
            amount:
              Math.round(
                Math.min(positiveOwe.amount, -negativeOwe.amount) * 100
              ) / 100,
          });
        }
      }
    }
    return transactions;
  }
);
