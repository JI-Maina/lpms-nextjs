import { number } from "zod";

type Property = {
  id: string;
  property_name: string;
  property_lrl: string;
  number_of_units: number;
  number_of_floors: number;
  owner: User;
  care_taker: User | null;
  unit_set: Unit[];
  property_img: string | null;
  created_at: string;
  updated_at: string;
};

type User = {
  id: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    phone_no: string;
    is_owner: boolean;
    is_caretaker: boolean;
    is_tenant: boolean;
  };
};

type Unit = {
  id: number;
  unit_name: string;
  unit_type: string;
  property: string;
  unit_deposit: string;
  unit_size: string;
  unit_rent: string;
  unit_img: string | null;
  is_rent_paid: boolean;
  balance: number;
  tenant: User | null;
};

type UnitInput = {
  id: number;
  unit_name: string;
  unit_type: string;
  property: string;
  unit_deposit: string;
  unit_size: string;
  unit_rent: string;
  unit_img: string | null;
  is_rent_paid: boolean;
  balance: number;
  tenant: number | null;
};

type Room = {
  unit_name: string;
  unit_type: string;
  unit_deposit: string;
  unit_size: string;
  unit_rent: string;
  unit_img: File | null;
};

type Tenant = {
  id: number;
  id_number: string;
  nok_first_name: string;
  nok_last_name: string;
  nok_phone_no: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    phone_no: string;
    is_owner: boolean;
    is_caretaker: boolean;
    is_tenant: boolean;
  };
  creator: {
    id: number;
    first_name: string;
    last_name: string;
    phone_no: string;
    is_owner: boolean;
    is_caretaker: boolean;
    is_tenant: boolean;
  };
};

type Payment = {
  id: 16;
  payment_date: "2023-12-20";
  payment_method: "cash";
  payment_amount: "2500.00";
  payment_for: "rent";
  unit: Unit;
  tenant: Tenant;
};

type Maintenance = {
  id: number;
  maintenance_type: string;
  maintenance_fee: string;
  maintenance_date: string;
  unit: Unit;
};
