import ScrollAnimation from "@/components/ScrollAnimation";

export default function BookStay() {
  return (
    <section
      className="relative w-full h-[280px] md:h-[320px] bg-white overflow-hidden"
      style={{
        backgroundImage: "url(/book-stay.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6 md:gap-8 px-4">
        <ScrollAnimation animation="fade-up">
          <div className="text-center max-w-[600px]">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight leading-tight mb-3 md:mb-4">
              Ready to book your stay?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Experience AI-powered hospitality that adapts to your preferences.
              Your perfect stay awaits.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="scale" delay={200}>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold shadow-lg shadow-blue-600/20 transition-all hover:shadow-xl hover:shadow-blue-600/30 hover:scale-105">
            Reserve Your Stay
          </button>
        </ScrollAnimation>
      </div>
    </section>
  );
}
