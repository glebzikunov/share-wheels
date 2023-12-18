"use client"

import { z } from "zod"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { usePathname } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

import { Input } from "../ui/input"
import { Button } from "../ui/button"

import { CommentValidation } from "@/lib/validations/comment"
import { addCommentToVehicle } from "@/lib/actions/comment.actions"

interface Params {
  vehicleId: string
  currentUserImage: string
  currentUserId: string
}

function Comment({ vehicleId, currentUserImage, currentUserId }: Params) {
  const pathname = usePathname()

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      comment: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    const confirmComment = confirm("Add comment?")

    if (confirmComment) {
      const result = await addCommentToVehicle(
        vehicleId,
        values.comment,
        JSON.parse(currentUserId),
        pathname
      )

      if (result?.error) {
        alert(result.error)
      } else {
        form.reset()
      }
    }
  }

  return (
    <Form {...form}>
      <form className="comment-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3">
              <FormLabel>
                <Image
                  src={currentUserImage}
                  alt="current_user"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  {...field}
                  placeholder="Comment..."
                  className="no-focus text-light-1 outline-none"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn">
          Add
        </Button>
      </form>
    </Form>
  )
}

export default Comment
