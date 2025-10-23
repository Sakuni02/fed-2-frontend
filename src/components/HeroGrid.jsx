function HeroGrid() {
  return (
    <section className="grid grid-cols-1 mt-4">
      <div className="relative">
        <img
          src={"/assets/images/hero-banner.jpg"}
          className="w-full h-[600px] object-cover"
          alt="hero"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-500/30 via-gray-300/10 to-transparent flex items-center">
          <div className="flex-col space-y-8 ps-8">
            <h1 className="text-5xl font-bold text-white">
              Color of Summer
              <br /> Outfit
            </h1>

            <p className="text-lg sm:text-lg md:text-xl text-white">
              Discover our latest collection designed for the modern
              <br /> individual
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroGrid;
