function CasualInspirations() {
  return (
    <section className="lg:px-16 px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="relative group transform transition-all duration-300 hover:scale-105">
        <img
          src="/assets/images/outdoor-active.jpg"
          alt="Casual inspirations outfit"
          className="rounded-2xl w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-300/10 to-transparent flex items-end rounded-2xl">
          <div className="ps-8 pb-5">
            <h1 className="text-2xl font-bold text-white">Outdoor Active</h1>
          </div>
        </div>
      </div>

      <div className="relative group transform transition-all duration-300 hover:scale-105">
        <img
          src="/assets/images/casual-inspiration.jpg"
          alt="Casual inspirations outfit"
          className="rounded-2xl w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-300/10 to-transparent flex items-end rounded-2xl">
          <div className="ps-8 pb-5">
            <h1 className="text-2xl font-bold text-white">
              Casual Inspirations
            </h1>
          </div>
        </div>
      </div>

      <div className="relative group transform transition-all duration-300 hover:scale-105">
        <img
          src="/assets/images/casual-comfort.jpg"
          alt="Casual inspirations outfit"
          className="rounded-2xl w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-300/10 to-transparent flex items-end rounded-2xl">
          <div className="ps-8 pb-5">
            <h1 className="text-2xl font-bold text-white">Casual Comfort</h1>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CasualInspirations;
