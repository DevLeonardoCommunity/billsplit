import { $ } from "@builder.io/qwik";
import type { MemberDataStore } from "~/routes/start";
import { sum } from "./math";

export type Transaction = {
  from: string;
  to: string;
  amount: number;
};

export const computeSplit = $(
  (members: Pick<MemberDataStore, "name" | "items">[]): Transaction[] => {
    const totals = members.map(({ items }) =>
      sum(items.map(({ price }) => price)),
    );
    const average =
      totals.reduce((acc, total) => acc + total, 0) / totals.length;

    type Owed = {
      index: number;
      amount: number;
    };

    const { positives, negatives } = totals.reduce(
      (acc, total, i) => {
        const amount = total - average;
        if (amount > 0) {
          acc.positives.push({ index: i, amount });
        } else if (amount < 0) {
          acc.negatives.push({ index: i, amount });
        }
        return acc;
      },
      { positives: [] as Owed[], negatives: [] as Owed[] },
    );

    const transactions: Transaction[] = [];

    for (const positive of positives) {
      for (const negative of negatives) {
        const amount = Math.min(positive.amount, -negative.amount);
        positive.amount -= amount;
        negative.amount += amount;
        transactions.push({
          from: members[negative.index].name ?? `Member ${negative.index + 1}`,
          to: members[positive.index].name ?? `Member ${positive.index + 1}`,
          amount: Math.round(amount * 100) / 100,
        });
      }
    }

    return transactions;
  },
);
