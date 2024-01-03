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

const save = $(async (bill: Omit<Bill, "createdAt">) => {
  const { data, error } = await supabaseClient
    .from(BILL_TABLE)
    .upsert(bill)
    .single();

  if (error) {
    throw error;
  }

  return data;
});

export const billsStore = {
  get,
  save,
};
