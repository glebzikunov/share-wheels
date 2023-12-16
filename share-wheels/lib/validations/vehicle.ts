import * as z from "zod"

export const VehicleValidation = z.object({
  vehicle_photo: z.string().url(),
  mark: z.string().min(3),
  model: z.string().min(1),
  vehicleNumber: z.string().min(4).max(10),
  rentalAmount: z.coerce
    .number()
    .positive()
    .min(0.1)
    .max(5)
    .refine((data) => data % 1 === 0 || data % 1 !== 0, {
      message: "Enter integer or float value between 0.1 and 5",
    }),
  isAvailable: z.string(),
  description: z.string().min(0).max(1000),
  ownerId: z.string(),
})
