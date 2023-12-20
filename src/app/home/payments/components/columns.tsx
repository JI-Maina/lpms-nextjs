"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "payment_for",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Payment
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "payment_amount",
    header: "Amount",
    // cell: ({ row }) => {
    //   const tenant = row.original;

    //   return <div>{tenant.user.phone_no}</div>;
    // },
  },
  {
    accessorKey: "payment_method",
    header: "Method",
  },
  {
    accessorKey: "payment_date",
    header: "Date",
  },
  {
    accessorKey: "unit",
    header: "Unit",
    cell: ({ row }) => {
      const payment = row.original;

      return <div>{payment.unit.unit_name}</div>;
    },
  },
  {
    accessorKey: "tenant",
    header: "Tenant",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div>
          {payment.unit.tenant.user.first_name}{" "}
          {payment.unit.tenant.user.last_name}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "actions",
  //   cell: ({ row }) => {
  //     const tenant = row.original;

  //     return <DeleteTenantModal tenant={tenant} />;
  //   },
  // },
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
