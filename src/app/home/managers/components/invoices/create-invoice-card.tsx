"use client";

import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
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
import { Property, Unit } from "@/types/property";
import InvoiceBills from "./invoice-bills";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
  properties: Property[];
};

const CreateInvoiceCard = ({ properties }: Props) => {
  const [id, setId] = useState(properties?.[0]?.id);
  const [unitId, setUnitId] = useState("");
  const form = useForm();

  const property = properties.find((property) => property.id === id);
  const units = property?.unit_set;

  const onPropertyChange = (value: string) => {
    setId(value);
  };

  const onUnitChange = (value: string) => {
    setUnitId(value);
  };

  const unit = units?.find((unit) => unit.id === parseInt(unitId));
  //   console.log(unit);
  //   console.log(unitId);
  return (
    <Card className="md:max-w-[900px] md:mx-auto">
      <CardHeader>
        <CardDescription>Create an invoice</CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-4">
          {properties.length > 1 && (
            <Select onValueChange={onPropertyChange}>
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

        <InvoiceBills unit={unit as Unit} />
        <Form {...form}>
          <form className="space-y-6">
            <Button>Create</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateInvoiceCard;
