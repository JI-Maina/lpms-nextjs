import { features } from "./constants";

const Features = () => {
  return (
    <section id="about" className="mx-auto w-full max-w-screen-2xl px-6 py-20 sm:px-10 lg:px-16">
      <h2 className="mb-8 text-center text-4xl font-bold text-foreground">
        What <span className="text-primary">LPMS</span> does
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-border bg-card p-8 text-center transition-all hover:-translate-y-1 hover:border-primary"
          >
            <div className="mb-4 text-5xl">{feature.icon}</div>
            <h3 className="mb-2 font-semibold text-foreground">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
