import { features } from "./constants";

const Features = () => {
  return (
    <section
      id="features"
      className="border-y border-border py-20"
    >
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <h2 className="mb-2 text-center text-4xl font-bold tracking-tight text-foreground md:text-[2.6rem]">
          What <span className="text-primary">LPMS</span> does
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center text-lg text-muted-foreground">
          Everything you need to manage your properties efficiently — all in one
          place.
        </p>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-8 text-center transition hover:-translate-y-1.5 hover:border-primary hover:shadow-xl hover:shadow-black/40"
            >
              <span className="absolute inset-x-0 top-0 h-0.5 bg-primary opacity-0 transition group-hover:opacity-100" />
              <span className="mb-3 block text-5xl">{feature.icon}</span>
              <h3 className="mb-2 font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
