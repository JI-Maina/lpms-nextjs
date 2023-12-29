const Hero = () => {
  return (
    <section className="h-screen bg-hero bg-no-repeat bg-cover bg-center relative">
      <div className="bg-black bg-opacity-70 absolute inset-0"></div>

      <div className="absolute bottom-8 px-2 md:px-24 max-w-[990px]">
        <h1 className="md:text-5xl text-3xl mb-8 md:mb-16">
          Take your property management to the next level
        </h1>

        <button className="border p-2 border-[#A020F0] rounded-sm hover:bg-[#A020F0] ">
          Learn about LPMS
        </button>
      </div>
    </section>
  );
};

export default Hero;
