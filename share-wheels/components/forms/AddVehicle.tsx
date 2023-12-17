"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ChangeEvent, useState } from "react"
import { isBase64Image } from "@/lib/utils"
import { useUploadThing } from "@/lib/uploadthing"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { usePathname, useRouter } from "next/navigation"
import { VehicleValidation } from "@/lib/validations/vehicle"
import Image from "next/image"
import { addVehicle } from "@/lib/actions/vehicle.actions"
import useGeolocation from "@/hooks/useGeolocation"

interface Params {
  userId: string
}

function AddVehicle({ userId }: Params) {
  const [files, setFiles] = useState<File[]>([])
  const { startUpload } = useUploadThing("media")
  const location = useGeolocation()

  const router = useRouter()
  const pathname = usePathname()

  const form = useForm({
    resolver: zodResolver(VehicleValidation),
    defaultValues: {
      vehicle_photo: "",
      mark: "",
      model: "",
      vehicleNumber: "",
      rentalAmount: 0.5,
      isAvailable: "false",
      description: "",
      ownerId: userId,
    },
  })

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault()

    const fileReader = new FileReader()

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      setFiles(Array.from(e.target.files))

      if (!file.type.includes("image")) return

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || ""

        fieldChange(imageDataUrl)
      }

      fileReader.readAsDataURL(file)
    }
  }

  const onSubmit = async (values: z.infer<typeof VehicleValidation>) => {
    const addingComfirmed = confirm("Are you sure to add vehicle?")

    if (addingComfirmed) {
      if (location.error === "true") {
        alert("Enable Navigation and reload the page to add your vehicle!")
      } else {
        const blob = values.vehicle_photo

        const hasImagedChanged = isBase64Image(blob)
        if (hasImagedChanged) {
          const imgRes = await startUpload(files)

          if (imgRes && imgRes[0].fileUrl) {
            values.vehicle_photo = imgRes[0].fileUrl
          }
        }

        const result = await addVehicle({
          mark: values.mark,
          model: values.model,
          vehicleNumber: values.vehicleNumber,
          rentalAmount: values.rentalAmount,
          image: values.vehicle_photo,
          isAvailable: values.isAvailable,
          description: values.description,
          latitude: location.coordinates.lat,
          longitude: location.coordinates.lng,
          ownerId: userId,
          path: pathname,
        })

        if (result?.error) {
          alert(result.error)
        } else {
          router.push("/")
        }
      }
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 flex flex-col justify-start gap-10"
        >
          <FormField
            control={form.control}
            name="vehicle_photo"
            render={({ field }) => (
              <FormItem className="flex max-sm:flex-col max-sm:items-start items-center gap-4">
                <FormLabel className="flex items-center justify-center rounded-xl bg-dark-4 !important">
                  {field.value ? (
                    <Image
                      src={field.value}
                      alt="Vehicle Photo"
                      width={250}
                      height={50}
                      priority
                      className="rounded-xl object-contain"
                    />
                  ) : (
                    <Image
                      src="/assets/profile.svg"
                      alt="Vehicle photo"
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  )}
                </FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Upload a photo"
                    className="account-form_image-input p-0"
                    onChange={(e) => {
                      handleImage(e, field.onChange)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mark"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Vehicle Mark
                </FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Vehicle Model
                </FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vehicleNumber"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Vehicle Number
                </FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Input type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rentalAmount"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Rental Amount
                </FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isAvailable"
            render={({ field }) => (
              <FormItem className="flex flex-col max-w-fit gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Available for Renting?
                </FormLabel>
                <FormControl className="no-focus rounded-md border border-dark-4 bg-dark-3 px-3 h-10 text-light-1">
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-5"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" className="" />
                      </FormControl>
                      <FormLabel className="text-base-semibold text-light-2">
                        Yes
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="text-base-semibold text-light-2">
                        No
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Description (Optional)
                </FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Textarea rows={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-primary-500">
            Add
          </Button>
        </form>
      </Form>
    </>
  )
}

export default AddVehicle
