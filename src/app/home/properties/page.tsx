import Image from "next/image";
import { getServerSession } from "next-auth";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import CreatePropertyButton from "./create-property-button";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import PropertyDeleteDialog from "@/components/home/property/property-delete-dialog";
import PropertyEditDialog from "@/components/home/property/property-edit-dialog";

const getProperty = async () => {
  const session = await getServerSession(authOptions);

  const res = await fetch("http://127.0.0.1:8000/property/properties/", {
    headers: { Authorization: `Bearer ${session?.access_token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch property data");

  return res.json();
};

const PropertyPage = async () => {
  const propertyData: Promise<Property[]> = getProperty();
  const properties = await propertyData;

  console.log(properties[0]);

  return (
    <main className="flex flex-col gap-2">
      <header className="flex items-center justify-between py-4 px-2 rounded-lg border bg-card text-card-foreground shadow-sm">
        <h2 className="text-lg font-semibold">
          Properties {properties.length}
        </h2>

        {/* <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-5 w-5 mr-2" />
              Add
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a new property</DialogTitle>
            </DialogHeader>

            <CreatePropertyForm />
          </DialogContent>
        </Dialog> */}
        <CreatePropertyButton />
      </header>

      {properties.map((property) => (
        <Card
          key={property.id}
          className="w-full md:w-3/4 h-full md:mx-auto mt-4"
        >
          <CardContent className="flex flex-col md:flex-row justify-between gap-4 p-4">
            <Image
              src={
                property.property_img
                  ? `http://127.0.0.1:8000${property.property_img}`
                  : "/no-propertyfound.png"
              }
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

                <h2>caretaker: {property.care_taker?.user.first_name}</h2>
              </div>

              <Separator />

              <footer className="h-[40px] px-4 p-[2px] text-sm text-muted-foreground flex items-center justify-between mt-1">
                <p>Created at {property.created_at}</p>

                <div className="flex">
                  <PropertyEditDialog property={property} />

                  <PropertyDeleteDialog id={property.id} />
                </div>
              </footer>
            </div>
          </CardContent>
        </Card>
      ))}
    </main>
  );
};

export default PropertyPage;
