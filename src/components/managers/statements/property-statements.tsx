"use client";

import { useEffect, useState } from "react";

import { StatementCard } from "./statement-card";
import { Property, YearStatements } from "@/types/property";
import PropertyDetailsHeader from "@/app/home/managers/components/shared/property-details-header";

type StatementsProps = {
  properties: Property[];
};

export const PropertyStatements = ({ properties }: StatementsProps) => {
  const [id, setId] = useState(properties[0]?.id);
  const [state, setState] = useState<YearStatements>({});

  const onChange = (value: string) => {
    setId(value);
  };

  useEffect(() => {
    const fetchStatements = async () => {
      const res = await fetch(`/api/statements/${id}`);
      const data = await res.json();
      setState(data);
    };

    if (id) fetchStatements();
  }, [id]);

  const currentYear = new Date().getFullYear();
  const currentYearStatements = state[currentYear] || {};
  const statements = Object.values(currentYearStatements);

  return (
    <main>
      <PropertyDetailsHeader
        id={id}
        title="Statements Data"
        properties={properties}
        onChange={onChange}
        // actionModal={units && <AddUnitPaymentDialog units={units} />
      />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {Object.values(statements).map((monthStatements) =>
          monthStatements.map((statement) => (
            <StatementCard key={statement.id} statement={statement} />
          ))
        )}
      </section>
    </main>
  );
};
