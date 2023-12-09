import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";

const getProperty = async () => {
  const session = await getServerSession(authOptions);

  const res = await fetch("http://127.0.0.1:8000/property/properties/", {
    headers: { Authorization: `Bearer ${session?.access_token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch property data");

  return res.json();
};

const PropertyPage = async () => {
  const propertyData = getProperty();
  const properties = await propertyData;

  console.log(properties);

  // {
  //   id: '9e10d374-4294-4eac-86f2-be571b9b3bb6',
  //   property_name: 'Django Apartments',
  //   property_lrl: 'D6310',
  //   number_of_units: 30,
  //   number_of_floors: 5,
  //   owner: { id: 4, user: [Object] },
  //   care_taker: null,
  //   unit_set: [],
  //   property_img: '/media/images/properties/9e10d374-4294-4eac-86f2-be571b9b3bb6/property-1.jpg',
  //   created_at: '2023-12-09T05:43:02.330241Z',
  //   updated_at: '2023-12-09T05:43:35.124925Z'
  // }

  return (
    <main className="flex flex-col gap-2">
      <header className="flex items-center justify-between py-4 px-2 rounded-lg border bg-card text-card-foreground shadow-sm">
        <h2 className="text-lg font-semibold">Properties</h2>

        <Button size="sm">
          <Plus className="h-5 w-5 mr-2" />
          Add
        </Button>
      </header>

      {properties.map((property) => (
        <Card
          key={property.id}
          className="w-full md:w-3/4 h-full md:mx-auto mt-4"
        >
          <CardContent className="flex flex-col md:flex-row justify-between gap-4 p-4">
            <Image
              src="/property-1.jpg"
              alt=""
              width={400}
              height={400}
              className="flex-1 rounded-md"
            />
            <div className="flex-1 justify-end">
              <h2 className="text-lg font-semibold mb-3">
                {property.property_name}
              </h2>
              <div className="grid gap-4 mb-3 grid-cols-2 lg:grid-cols-1">
                <h2>lrl: {property.property_lrl}</h2>
                <h2>type: residential</h2>

                <h2>floors: {property.number_of_floors}</h2>
                <h2>units: {property.number_of_units}</h2>

                <h2>caretaker: {property.care_taker}</h2>
              </div>

              <div className="flex items-center justify-between">
                <Button size="sm">Edit</Button>
                <Button variant="outline" size="sm">
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </main>
  );
};

export default PropertyPage;
