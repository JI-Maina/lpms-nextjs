"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

type Props = {
  property: Property;
  path: string;
};

const PropertyCard = ({ property, path }: Props) => {
  const router = useRouter();

  return (
    <Card
      className="max-w-xs hover:cursor-pointer hover:bg-accent"
      onClick={() => router.push(`${path}/${property.id}`)}
    >
      <CardHeader>
        <CardTitle>{property.property_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between border p-2">
          <div className="flex border p-2">
            {property.number_of_units} <p className="ml-2">units</p>
          </div>

          <div className="flex border p-2">
            <p className="ml-2">{property.property_lrl}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
