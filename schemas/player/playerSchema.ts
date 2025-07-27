import { z } from "zod";

export const playerSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
});
