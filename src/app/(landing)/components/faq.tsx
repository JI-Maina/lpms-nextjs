import { faqs } from "./constants";

const Faq = () => {
  return (
    <section id="faq" className="mx-auto w-full max-w-screen-2xl px-6 py-20 sm:px-10 lg:px-16">
      <h2 className="mb-8 text-center text-4xl font-bold text-foreground">
        Frequently Asked <span className="text-primary">Questions</span>
      </h2>

      <div className="mx-auto max-w-2xl">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="mb-4 rounded-xl border border-border bg-card p-6"
          >
            <h4 className="mb-1 font-semibold text-primary">{faq.question}</h4>
            <p className="text-muted-foreground">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
