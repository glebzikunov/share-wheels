import Link from "next/link"
import Image from "next/image"
import { formatDateString, formatAmount } from "@/lib/utils"

interface Props {
  content: string | ""
  author: {
    name: string
    image: string
    id: string
  }
  createdAt: string
}

const CommentCard = ({ content, author, createdAt }: Props) => {
  return (
    <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center ">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col">
              <Link href={`/profile/${author.id}`} className="w-fit">
                <h4 className="cursor-pointer text-base-semibold text-light-1">
                  {author.name}
                </h4>
              </Link>

              <p className="mt-2 text-small-regular text-light-2">{content}</p>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-5 text-subtle-medium text-gray-1">
        {formatDateString(createdAt)}
      </p>
    </article>
  )
}

export default CommentCard
