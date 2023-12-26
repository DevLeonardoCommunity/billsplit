import { expect, test } from "vitest";
import { computeSplit } from "./split";

test("testing test", async () => {
  const result = await computeSplit([
    {
      name: "Mario",
      items: [
        {
          id: "1",
          name: "Pizza",
          price: 10,
        },
      ],
    },
    {
      name: "Luigi",
      items: [],
    },
    {
      name: "Wario",
      items: [],
    },
  ]);

  expect(result).toEqual([
    {
      from: "Luigi",
      to: "Mario",
      amount: 3.33,
    },
    {
      from: "Wario",
      to: "Mario",
      amount: 3.33,
    },
  ]);
});
