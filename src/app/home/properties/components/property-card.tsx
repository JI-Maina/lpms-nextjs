import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NavigateButton from "./navigate-button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const PropertyCard = ({ property }: { property: Property }) => {
  return (
    <Card className="max-w-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{property.property_name}</CardTitle>
        <NavigateButton propertyId={property.id} />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
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
          <div className="grid gap-4 mb-3 grid-cols-2">
            <DetailsCard event="lrl" detail={property.property_lrl} />
            <DetailsCard event="type" detail="residential" />
            <DetailsCard event="floors" detail={property.number_of_floors} />
            <DetailsCard event="units" detail={property.number_of_units} />
          </div>
          <DetailsCard
            event="caretaker"
            detail={
              property.care_taker
                ? `${property.care_taker?.user.first_name} ${property.care_taker?.user.last_name}`
                : "None"
            }
          />

          <Separator />

          <footer className="h-[40px] px-4 p-[2px] text-sm text-muted-foreground flex items-center justify-between mt-1">
            <p>Created at {property.created_at}</p>
          </footer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;

const DetailsCard = ({ event, detail }: { event: any; detail: any }) => {
  return (
    <div className="flex items-center justify-between border mb-1 px-1">
      <h1 className="font-semibold text-muted-foreground capitalize">
        {event}:
      </h1>
      <h1 className="">{detail}</h1>
    </div>
  );
};
