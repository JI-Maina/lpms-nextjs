"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";
import { Caretaker } from "@/types/property";
import { Button } from "@/components/ui/button";

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
      const tenant = row.original;

      return (
        <div className="flex gap-2">
          <div>Edit</div>
          <div>Delete</div>
        </div>
      );
      //   return <DeleteTenantModal tenant={tenant as Tenant} />;
    },
  },
];
