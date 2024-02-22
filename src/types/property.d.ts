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

type Person = {
  id: number;
  first_name: string;
  last_name: string;
  phone_no: string;
  is_owner: boolean;
  is_caretaker: boolean;
  is_tenant: boolean;
};

type User = {
  id: number;
  user: Person;
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
  tenant: Tenant | null;
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
  user: Person;
  creator: Person;
};

type Caretaker = {
  id: number;
  user: Person;
  creator: number;
}

type Payment = {
  id: number;
  payment_date: string;
  payment_method: string;
  payment_amount: string;
  payment_for: string;
  unit: Unit;
  tenant: Tenant | null;
};

type YearlyPayments = {
  [year: string]: {
    [month: string]: Payment[];
  }
}

type Maintenance = {
  id: number;
  maintenance_type: string;
  maintenance_fee: string;
  maintenance_date: string;
  unit: Unit;
};
