"use client";

import { useEffect, useState } from "react";

import { Property, YearStatements } from "@/types/property";
import { StatementCard } from "@/components/managers/statements/statement-card";
import AddStatementDialog from "@/components/managers/statements/add-statement-modal";
import PropertyDetailsHeader from "@/components/managers/shared/property-details-header";

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

  const property = properties.find(
    (property) => property.id === id
  ) as Property;

  return (
    <main>
      <PropertyDetailsHeader
        id={id}
        title="Statements Data"
        properties={properties}
        onChange={onChange}
        actionModal={<AddStatementDialog property={property} />}
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
