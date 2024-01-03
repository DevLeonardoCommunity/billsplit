import { supabaseClient } from "~/providers/supabase-client";
import { $ } from "@builder.io/qwik";
import { type Bill } from "~/types";

export type SavedBill = {
  id: string;
  name: string;
  members: Bill["members"];
  createdAt: Date;
};

const BILL_TABLE = "bill";

const get = $(async (id: string) => {
  const { data, error } = await supabaseClient
    .from(BILL_TABLE)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data as SavedBill;
});

const save = $(
  async (bill: Omit<Bill, "createdAt" | "id"> & Partial<Pick<Bill, "id">>) => {
    const { data, error } = await supabaseClient
      .from(BILL_TABLE)
      .upsert(bill)
      .select();

    if (error) {
      throw error;
    }

    return data[0] as SavedBill;
  },
);

export const billsStore = {
  get,
  save,
};
