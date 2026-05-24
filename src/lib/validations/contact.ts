import { z } from "zod";

export const ContactSchema = z.object({
  nombre:   z.string().min(1).max(100),
  email:    z.string().email().max(200),
  empresa:  z.string().min(1).max(200),
  servicio: z.enum(["automatizacion", "vibe", "agentes", "consultoria", "otra"]),
  mensaje:  z.string().min(10).max(2000),
  consent:  z.literal(true),
});

export type ContactInput = z.infer<typeof ContactSchema>;
