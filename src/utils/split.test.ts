import { describe, expect, test } from "vitest";
import { computeSplit } from "./split";

const generateMembers = (amounts: number[]) =>
  amounts.map((amount, i) => ({
    name: `${i}`,
    items: [{ id: `${i}`, price: amount }],
  }));

describe("Core logic", () => {
  describe("Split between two members", async () => {
    test("One with zero contribution", async () => {
      const result = await computeSplit(generateMembers([100, 0]));

      expect(result).toEqual([
        {
          from: "1",
          to: "0",
          amount: 50,
        },
      ]);
    });

    test("Both contributed", async () => {
      const result = await computeSplit(generateMembers([100, 20]));

      expect(result).toEqual([
        {
          from: "1",
          to: "0",
          amount: 40,
        },
      ]);
    });

    test("All paid the same", async () => {
      const result = await computeSplit(generateMembers([100, 100]));
      expect(result).toEqual([]);
    });
  });

  describe("Split between three members", async () => {
    test("Two positives, one negative", async () => {
      const result = await computeSplit(generateMembers([30, 30, 0]));
      expect(result).toEqual([
        {
          from: "2",
          to: "0",
          amount: 10,
        },
        {
          from: "2",
          to: "1",
          amount: 10,
        },
      ]);
    });

    test("First positive, two negatives", async () => {
      const result = await computeSplit(generateMembers([100, 0, 0]));
      expect(result).toEqual([
        {
          from: "1",
          to: "0",
          amount: 33.33,
        },
        {
          from: "2",
          to: "0",
          amount: 33.33,
        },
      ]);
    });

    test("Last positive, two negatives", async () => {
      const result = await computeSplit(generateMembers([0, 0, 100]));
      expect(result).toEqual([
        {
          from: "0",
          to: "2",
          amount: 33.33,
        },
        {
          from: "1",
          to: "2",
          amount: 33.33,
        },
      ]);
    });

    test("All paid the same", async () => {
      const result = await computeSplit(generateMembers([100, 100, 100]));
      expect(result).toEqual([]);
    });
  });
});

describe("Outputs", () => {
  test("Rounds to two decimal places", async () => {
    const result = await computeSplit(generateMembers([100, 0.01]));
    expect(result).toEqual([
      {
        from: "1",
        to: "0",
        amount: 50,
      },
    ]);
  });

  test("Handles all members without a name", async () => {
    const result = await computeSplit([
      { items: [{ id: "1", price: 100 }] },
      { items: [] },
    ]);
    expect(result).toEqual([
      {
        from: "Member 2",
        to: "Member 1",
        amount: 50,
      },
    ]);
  });

  test("Handles positive members without a name", async () => {
    const result = await computeSplit([
      { items: [{ id: "1", price: 100 }] },
      { name: "Mario", items: [] },
    ]);
    expect(result).toEqual([
      {
        from: "Mario",
        to: "Member 1",
        amount: 50,
      },
    ]);
  });

  test("Handles negative members without a name", async () => {
    const result = await computeSplit([
      { name: "Mario", items: [{ id: "1", price: 100 }] },
      { items: [] },
    ]);
    expect(result).toEqual([
      {
        from: "Member 2",
        to: "Mario",
        amount: 50,
      },
    ]);
  });
});
