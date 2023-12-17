"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"

import { Input } from "../ui/input"

interface Props {
  routeType: string
}

function Searchbar({ routeType }: Props) {
  const router = useRouter()
  const [search, setSearch] = useState("")

  // query after 0.3s of no input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        router.push(`/${routeType}?q=` + search)
      } else {
        router.push(`/${routeType}`)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [search, routeType])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <div className="searchbar">
      <Image
        src="/assets/search-gray.svg"
        alt="search"
        width={24}
        height={24}
        className="object-contain"
      />
      <Input
        id="text"
        value={search}
        onChange={handleChange}
        placeholder="Search Vehicles"
        className="no-focus searchbar_input"
      />
    </div>
  )
}

export default Searchbar
