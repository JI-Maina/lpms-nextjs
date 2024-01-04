import { getAllProperties } from "@/lib/data-fetching/fetch-property";
import SelectProperty from "../components/select-property";
import UnitsNavigation from "./components/units-navigation";
import { Property } from "@/types/property";

const SinglePropertyPage = async () => {
  const propertyData: Promise<Property[]> = getAllProperties();
  const properties = await propertyData;

  const propertyId = properties.length === 1 && properties[0].id;

  if (properties.length === 0) {
    return <div>No payments to view, create a property first.</div>;
  }

  return (
    <>
      {properties.length === 1 ? (
        <UnitsNavigation property={propertyId as string} />
      ) : (
        <SelectProperty path={"/home/property"} />
      )}
    </>
  );
};

export default SinglePropertyPage;
