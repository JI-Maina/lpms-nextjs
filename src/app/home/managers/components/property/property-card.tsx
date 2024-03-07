import Image from "next/image";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

import { Caretaker, Property } from "@/types/property";
import AddCaretakerDialog from "./add-caretaker-dialog";
import EditPropertyDialog from "./edit-property-dialog";
import DeletePropertyDialog from "./delete-property-dialog";
import CreateCaretakerDialog from "../caretakers/create-caretaker-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = { property: Property; caretakers: Caretaker[] };

const URL = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

const PropertyCard = ({ property, caretakers }: Props) => {
  const { data: session } = useSession();

  return (
    <Card className="">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-3xl">{property?.property_name}</CardTitle>
        <div className="space-x-2">
          <EditPropertyDialog property={property} />
          {session?.user.userRole === "owner" && (
            <DeletePropertyDialog id={property?.id} />
          )}
        </div>
      </CardHeader>

      <CardContent className="flex md:flex-row flex-col gap-4 pb-3">
        <Image
          src={
            property?.property_img !== null
              ? `${URL}/${property?.property_img}`
              : "/no-propertyfound.png"
          }
          alt=""
          width={350}
          height={350}
          priority
          className="flex-1 rounded-md"
        />

        <div className="flex-1 justify-end space-y-5">
          <div className="grid gap-4 mb-3 grid-cols-2 md:grid-cols-1">
            <DetailsCard event="lrl" detail={property?.property_lrl} />
            <DetailsCard event="type" detail={property?.property_type} />

            <DetailsCard
              event="floors"
              detail={
                property?.number_of_floors === null
                  ? "none"
                  : property?.number_of_floors
              }
            />
            <DetailsCard event="units" detail={property?.number_of_units} />
          </div>
          <DetailsCard
            event="Water Rate per unit"
            detail={`KSh ${property?.water_rate_per_unit}`}
          />
          <DetailsCard
            event="caretaker"
            detail={
              property?.caretaker !== null ? (
                `${property?.caretaker?.user.first_name} ${property?.caretaker?.user.last_name}`
              ) : caretakers.length === 0 ? (
                <CreateCaretakerDialog />
              ) : (
                <AddCaretakerDialog
                  caretakers={caretakers}
                  property={property}
                />
              )
            }
          />

          <DetailsCard
            event="Created at"
            detail={format(new Date(property?.created_at), "yyyy-MM-dd")}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;

const DetailsCard = ({ event, detail }: { event: any; detail: any }) => {
  return (
    <div className="flex items-center justify-between border mb-1 p-3 md:p-4">
      <h1 className="font-semibold text-muted-foreground capitalize">
        {event}:
      </h1>
      <h1 className="ml-2">{detail}</h1>
    </div>
  );
};
