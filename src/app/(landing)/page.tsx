import Beta from "./components/beta";
import Contact from "./components/contact";
import Faq from "./components/faq";
import Features from "./components/features";
import Footer from "./components/footer";
import Header from "./components/header";
import Hero from "./components/hero";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <Beta />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
