import type { RequestHandler } from "@builder.io/qwik-city";
import { generateUUID } from "~/utils/uuid";

export const onGet: RequestHandler = async ({ redirect }) => {
  throw redirect(308, `/start/${generateUUID()}`);
};
