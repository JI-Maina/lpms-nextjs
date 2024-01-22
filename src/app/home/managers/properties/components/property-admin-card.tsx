import Image from "next/image";
import { format } from "date-fns";

import PropertyDeleteDialog from "./property-delete-dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Property } from "@/types/property";
import { Separator } from "@/components/ui/separator";
import PropertyEditDialog from "./property-edit-dialog";

const PropertyAdminCard = ({ property }: { property: Property }) => {
  return (
    <Card className="max-w-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {property.property_name} - {property.property_lrl}
        </CardTitle>
        {/* <NavigateButton propertyId={property.id} /> */}
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pb-3">
        <Image
          src={
            property.property_img
              ? `http://127.0.0.1:8000${property.property_img}`
              : "/no-propertyfound.png"
          }
          alt=""
          width={400}
          height={400}
          priority
          className="flex-1 rounded-md"
        />

        <div className="flex-1 justify-end">
          <div className="grid gap-4 mb-2 grid-cols-2">
            <DetailsCard event="floors" detail={property.number_of_floors} />
            <DetailsCard event="units" detail={property.number_of_units} />
          </div>
          <DetailsCard event="type" detail="residential" />
          <DetailsCard
            event="caretaker"
            detail={
              property.care_taker
                ? `${property.care_taker?.user.first_name} ${property.care_taker?.user.last_name}`
                : "None"
            }
          />
          <DetailsCard
            event="Created at"
            detail={format(new Date(property.created_at), "yyyy-MM-dd")}
          />

          <CardFooter className="flex gap-1 mt-2 p-0">
            <PropertyEditDialog property={property} />
            <PropertyDeleteDialog id={property.id} />
          </CardFooter>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyAdminCard;

const DetailsCard = ({ event, detail }: { event: any; detail: any }) => {
  return (
    <div className="flex items-center justify-between border mb-1 px-1">
      <h1 className="font-semibold text-muted-foreground capitalize">
        {event}:
      </h1>
      <h1 className="ml-2">{detail}</h1>
    </div>
  );
};
