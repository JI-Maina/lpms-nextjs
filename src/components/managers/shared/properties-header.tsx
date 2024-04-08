import { ReactNode } from "react";

import { Property } from "@/types/property";
import SelectProperty from "./select-property";

type Props = {
  properties: Property[];
  onChange: (v: string) => void;
  dialog: ReactNode;
};

const PropertiesHeader = ({ properties, onChange, dialog }: Props) => {
  return (
    <div className="h-36 bg-property bg-no-repeat bg-cover bg-center bg-opacity-0">
      <div className="flex gap-4 flex-col md:flex-row h-full relative">
        {properties.length > 1 && (
          <SelectProperty properties={properties} onChange={onChange} />
        )}

        <div className="flex md:w-3/4 absolute md:justify-end right-0 bottom-0 p-1">
          {dialog}
        </div>
      </div>
    </div>
  );
};

export default PropertiesHeader;
