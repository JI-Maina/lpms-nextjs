"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";
import { Caretaker } from "@/types/property";
import { Button } from "@/components/ui/button";
import DeleteCaretakersDialog from "./delete-caretakers-dialog";
import EditCaretakersDialog from "./edit-caretakers-dialog";

export const columns: ColumnDef<Caretaker>[] = [
  {
    accessorKey: "caretaker",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Caretaker
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const caretaker = row.original;

      return (
        <div className="font-medium">
          {caretaker.user.first_name} {caretaker.user.last_name}
        </div>
      );
    },
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => {
      const caretaker = row.original;

      return <div className="font-medium">{caretaker.user.username}</div>;
    },
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => {
      const caretaker = row.original;

      return <div className="font-medium">{caretaker.user.phone_no}</div>;
    },
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => {
      const caretaker = row.original;

      return (
        <div className="flex gap-2">
          <EditCaretakersDialog caretaker={caretaker} />
          <DeleteCaretakersDialog caretaker={caretaker} />
        </div>
      );
    },
  },
];
