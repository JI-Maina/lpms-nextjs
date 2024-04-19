"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import InvoiceBills from "./invoice-bills";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/hooks/use-axios-auth";
import { Bill, Property, Unit } from "../../../../types/property";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

type Props = {
  properties: Property[];
};

const CreateInvoiceCard = ({ properties }: Props) => {
  const [id, setId] = useState(properties?.[0]?.id);
  const [unitId, setUnitId] = useState("");
  const [newBills, setNewBills] = useState<Bill[]>([]);
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const router = useRouter();

  const property = properties.find((property) => property.id === id);
  const units = property?.unit_set;

  const onPropertyChange = (value: string) => {
    setId(value);
  };

  const onUnitChange = (value: string) => {
    setUnitId(value);
  };

  const unit = units?.find((unit) => unit.id === parseInt(unitId));

  const bills = newBills.map((bill) => bill.id);

  const handleClick = async () => {
    const invoice = {
      invoice_date: format(new Date(), "yyyy-MM-dd"),
      unit: unit?.id,
      bills: bills,
    };
    // console.log(invoice);
    try {
      const res = await axiosAuth.post(
        `/property/properties/${unit?.property}/units/${unit?.id}/invoices/`,
        invoice
      );

      console.log(res);
      if (res.status === 201) {
        setNewBills([]);
        router.refresh();
        toast({ description: "Invoice Created", title: "Success" });
      }
    } catch (error: any) {
      console.log(error);
      if (!error.response) {
        toast({
          description: "Invoice creation failed!",
          variant: "destructive",
        });
      } else {
        toast({
          description: `Error ${error.response.status} ${error.response.statusText}`,
          variant: "destructive",
        });
      }
    }
  };
  //   console.log(unitId);
  return (
    <Card className="md:max-w-[900px] md:mx-auto">
      <CardHeader>
        <CardDescription>Create an invoice</CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-4">
          {properties.length > 1 && (
            <Select onValueChange={onPropertyChange} defaultValue={id}>
              <SelectTrigger>
                <SelectValue placeholder="Select property" />
              </SelectTrigger>

              <SelectContent>
                {properties.map((property) => (
                  <SelectItem value={property.id} key={property.id}>
                    {property.property_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Select onValueChange={onUnitChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>

            <SelectContent>
              {units?.map((unit) => (
                <SelectItem value={unit.id.toString()} key={unit.id}>
                  {unit.unit_name} - {unit.tenant?.user.first_name}{" "}
                  {unit.tenant?.user.last_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <InvoiceBills
          unit={unit as Unit}
          newBills={newBills}
          setNewBills={setNewBills}
        />

        <Button disabled={unit === undefined} onClick={handleClick}>
          Create
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreateInvoiceCard;
