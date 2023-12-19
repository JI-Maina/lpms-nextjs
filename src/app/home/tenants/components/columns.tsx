"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Trash2 } from "lucide-react";
import DeleteTenantModal from "./delete-tenant-modal";

export const columns: ColumnDef<Tenant>[] = [
  {
    accessorKey: "first_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tenant
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const tenant = row.original;

      return (
        <div>
          {tenant.user.first_name} {tenant.user.last_name}
        </div>
      );
    },
  },
  {
    accessorKey: "userPhone",
    header: "Phone",
    cell: ({ row }) => {
      const tenant = row.original;

      return <div>{tenant.user.phone_no}</div>;
    },
  },
  {
    accessorKey: "id_number",
    header: "ID Number",
  },
  {
    accessorKey: "nextOfKin",
    header: "Next of Kin",
    cell: ({ row }) => {
      const tenant = row.original;

      return (
        <div>
          {tenant.nok_first_name} {tenant.nok_last_name}
        </div>
      );
    },
  },
  {
    accessorKey: "nok_phone_no",
    header: "Contact",
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => {
      const tenant = row.original;

      return <DeleteTenantModal tenant={tenant} />;
    },
  },
];

// {
//     id: 5,
//     id_number: '32327754',
//     nok_first_name: 'Michael',
//     nok_last_name: 'Joseph',
//     nok_phone_no: '0770416102',
//     user: {
//       id: 11,
//       first_name: 'George',
//       last_name: 'Saitoti',
//       phone_no: '0717416111',
//       is_owner: false,
//       is_caretaker: false,
//       is_tenant: true
//     },
//     creator: {
//       id: 9,
//       first_name: 'Daniel',
//       last_name: 'Moi',
//       phone_no: '0770416103',
//       is_owner: true,
//       is_caretaker: false,
//       is_tenant: false
//     }
//   }
