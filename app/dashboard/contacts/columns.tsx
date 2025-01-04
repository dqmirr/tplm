"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Contacts = {
  id: string
    whatsapp: string
    facebook: string
    youtube: string
    }


export const columns: ColumnDef<Contacts>[] = [
  {
    accessorKey: "whatsapp",
    header: "Nomor Whatsapp",
  },
  {
    accessorKey: "facebook",
    header: "Link Facebook",
  },
  {
    accessorKey: "youtube",
    header: "Link Youtube",
  },
  {
    header:"Actions",
    id: "actions",
    cell: ({ row }) => {
      const penjual = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Penjual</DropdownMenuItem>
            <DropdownMenuItem>Hapus Penjual</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
