import Image from "next/image";
import { ReactNode } from "react";

import { Property } from "@/types/property";
import SelectProperty from "./select-property";

type SelectProps = {
  id: string;
  title?: string;
  properties: Property[];
  actionModal?: ReactNode;
  onChange: (value: string) => void;
};

const PropertyDetailsHeader = ({
  id,
  properties,
  title,
  onChange,
  actionModal,
}: SelectProps) => {
  const property = properties.find((property) => property.id === id);

  return (
    <div className="flex gap-3 flex-col md:flex-row">
      {property && properties.length > 1 && (
        <SelectProperty properties={properties} onChange={onChange} />
      )}

      <div className="md:w-full">
        {property && (
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
                <h2 className="text-lg font-semibold">
                  {property.property_name}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {property.property_type}
                </p>
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
        )}
      </div>
    </div>
  );
};

export default PropertyDetailsHeader;
