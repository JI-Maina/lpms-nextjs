type Property = {
  id: string;
  property_name: string;
  property_lrl: string;
  number_of_units: number;
  number_of_floors: number;
  owner: Owner;
  care_taker: User | null;
  unit_set: [];
  property_img: string;
  created_at: string;
  updated_at: string;
};

type Owner = {
  id: number;
  user: User;
};

type User = {
  id: number;
  first_name: string;
  last_name: string;
  phone_no: string;
  is_owner: boolean;
  is_caretaker: boolean;
  is_tenant: boolean;
};
