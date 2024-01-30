import Image from "next/image";

import { Property } from "@/types/property";
import { ReactNode } from "react";

type HeaderProps = {
  property: Property;
  title: string;
  actionModal?: ReactNode;
};

const PropertyHeader = ({ property, title, actionModal }: HeaderProps) => {
  // console.log(title);
  return (
    <header className="border text-card-foreground p-4 pb-2 flex flex-col md:flex-row gap-2 ">
      <div className="flex-1 flex items-center gap-3 ">
        <Image
          src="/property-1.jpg"
          alt={property.property_name}
          width={120}
          height={120}
          priority
          className="rounded-sm"
        />

        <div>
          <h2 className="text-lg font-semibold">{property.property_name}</h2>
          <p className="text-muted-foreground text-sm">residential</p>
          <p className="text-muted-foreground text-sm">
            {property.property_lrl}
          </p>
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col justify-end">
        <div className="flex items-center justify-between w-full">
          <div className="">
            <h1>{title}</h1>
          </div>

          <div className="">{actionModal && actionModal}</div>
        </div>
      </div>
    </header>
  );
};

export default PropertyHeader;

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
