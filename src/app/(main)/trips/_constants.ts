import { z } from "zod";

export const schema = z.object({
  id: z.string(),
  start_address: z.string(),
  pickup_address: z.string(),
  drop_off_address: z.string(),
  created_at: z.string(),
});
