import { Property } from "@/types/property";
import SelectProperty from "../shared/select-property";
import { CreatePropertyDialog } from "./create-property-dialog";

type Props = {
  properties: Property[];
  onChange: (v: string) => void;
};

const PropertiesHeader = ({ properties, onChange }: Props) => {
  return (
    <div className="h-36 bg-property bg-no-repeat bg-cover bg-center bg-opacity-0">
      <div className="flex gap-4 flex-col md:flex-row h-full relative">
        {properties.length > 1 && (
          <SelectProperty properties={properties} onChange={onChange} />
        )}

        <div className="flex md:w-3/4 absolute md:justify-end right-0 bottom-0 p-1">
          <CreatePropertyDialog />
        </div>
      </div>
    </div>
  );
};

export default PropertiesHeader;
