"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Shield, Award, Globe, Clock, Star } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/about-pic-1.jpg"
            alt="Luxehaven hospitality"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
            Welcome to Luxehaven
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Where luxury meets technology to create unforgettable hospitality
            experiences
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                  Our Story
                </h2>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                  Redefining Hospitality
                </h3>
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-base sm:text-lg">
                  Founded with a vision to revolutionize the hospitality
                  industry, Luxehaven combines cutting-edge AI technology with
                  timeless elegance to deliver personalized experiences that
                  exceed expectations.
                </p>
                <p className="text-base sm:text-lg">
                  Our journey began with a simple belief: every guest deserves
                  to feel special. Today, we operate premium properties across
                  the globe, each carefully curated to provide the perfect blend
                  of comfort, luxury, and innovation.
                </p>
                <p className="text-base sm:text-lg">
                  Through our proprietary AI-powered platform, we anticipate
                  guest needs, personalize every interaction, and create
                  memories that last a lifetime.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/about-video.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
              Our Values
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              What Drives Us
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Excellence */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Excellence
              </h4>
              <p className="text-gray-600 leading-relaxed">
                We pursue perfection in every detail, from the quality of our
                accommodations to the warmth of our service.
              </p>
            </div>

            {/* Innovation */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Innovation
              </h4>
              <p className="text-gray-600 leading-relaxed">
                We leverage AI and technology to create seamless, personalized
                experiences that anticipate your needs.
              </p>
            </div>

            {/* Care */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Care</h4>
              <p className="text-gray-600 leading-relaxed">
                Every guest is family. We go above and beyond to ensure your
                comfort, safety, and satisfaction.
              </p>
            </div>

            {/* Trust */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Trust</h4>
              <p className="text-gray-600 leading-relaxed">
                Your privacy and security are paramount. We protect your data
                with enterprise-grade security measures.
              </p>
            </div>

            {/* Reliability */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Reliability
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Count on us for consistent quality, 24/7 support, and seamless
                experiences across all our properties.
              </p>
            </div>

            {/* Quality */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Quality</h4>
              <p className="text-gray-600 leading-relaxed">
                From linens to amenities, we source only the finest materials to
                ensure your ultimate comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hospitality Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg md:order-first order-last">
              <Image
                src="/about-pic-2.jpg"
                alt="Luxehaven hospitality"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                  Our Hospitality
                </h2>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                  Personalized Experiences
                </h3>
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-base sm:text-lg">
                  At Luxehaven, hospitality is more than service—it&apos;s an
                  art form. Our AI-powered platform learns your preferences,
                  remembers your favorites, and tailors every stay to your
                  unique needs.
                </p>
                <p className="text-base sm:text-lg">
                  Whether you&apos;re traveling for business or pleasure, solo
                  or with family, our dedicated team and intelligent systems
                  work in harmony to create seamless experiences from booking to
                  checkout.
                </p>
                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700">
                      AI-powered room recommendations based on your preferences
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700">
                      24/7 concierge service with instant response
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700">
                      Seamless mobile check-in and keyless entry
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700">
                      Curated local experiences and dining recommendations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="relative py-16 sm:py-20 md:py-24 bg-blue-600 text-white overflow-hidden"
        style={{
          backgroundImage: "url(/pin-card.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
                50+
              </div>
              <div className="text-sm sm:text-base opacity-90">
                Premium Properties
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
                100K+
              </div>
              <div className="text-sm sm:text-base opacity-90">
                Happy Guests
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
                25
              </div>
              <div className="text-sm sm:text-base opacity-90">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
                4.9
              </div>
              <div className="text-sm sm:text-base opacity-90">
                Average Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Ready to Experience Luxury?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied guests who have discovered the perfect
            blend of comfort, technology, and personalized service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-base transition-colors shadow-md hover:shadow-lg">
              Book Your Stay
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-full font-semibold text-base border-2 border-gray-200 transition-colors">
              Explore Properties
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
