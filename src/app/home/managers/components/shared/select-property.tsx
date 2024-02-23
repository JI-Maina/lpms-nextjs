import { Property } from "@/types/property";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectProps = {
  properties: Property[];
  onChange: (value: string) => void;
};

const SelectProperty = ({ properties, onChange }: SelectProps) => {
  return (
    <div className="md:w-1/4 flex justify-center items-center border rounded-sm p-2">
      <div className="w-full space-y-4">
        <p>Filter property</p>
        <Select onValueChange={onChange} defaultValue={properties[0]?.id}>
          <SelectTrigger>
            <SelectValue placeholder="Select a property" />
          </SelectTrigger>

          <SelectContent>
            {properties.map((property) => (
              <SelectItem key={property.id} value={property.id}>
                {property.property_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SelectProperty;
