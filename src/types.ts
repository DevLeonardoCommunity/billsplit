export type RecentBill = {
  id: string;
  name: string;
  createdAt: Date;
  members: Member[];
};

export type Member = {
  name?: string;
  items: BillItem[];
};

export type BillItem = {
  id: string;
  name?: string;
  price?: number;
};
