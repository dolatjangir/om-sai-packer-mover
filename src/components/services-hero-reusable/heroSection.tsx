import Link from "next/link";
import { ArrowRight, Phone, type LucideIcon } from "lucide-react";
import { type RefObject } from "react";

export interface HeroFeature {
  icon: LucideIcon;
  text: string;
  sub: string;
}

export interface HeroImage {
  src: string;
  alt: string;
}

export interface HeroCta {
  quoteHref: string;
  quoteLabel: string;
  phoneHref: string;
  phoneLabel: string;
}

export interface HeroSectionProps {
  title: string;
  highlightedTitle: string;
  description: string;
  features: HeroFeature[];
  image: HeroImage;
  cta?: HeroCta;
  heroRef?: RefObject<HTMLElement | null>;
}

const DEFAULT_CTA: HeroCta = {
  quoteHref: "/get-a-quote",
  quoteLabel: "Get a Free Quote",
  phoneHref: "tel:18001234567",
  phoneLabel: "Call 1800 123 4567",
};

export default function HeroSection({
  title,
  highlightedTitle,
  description,
  features,
  image,
  cta = DEFAULT_CTA,
  heroRef,
}: HeroSectionProps) {
  return (
    <section
      ref={heroRef}
      className="relative bg-gradient-to-br from-(--blue-900) to-(--blue-800) overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-10 pb-16 sm:pt-10 sm:pb-18 lg:pt-26 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center pt-20 lg:pt-0 ">
          {/* Left Content */}
          <div className="relative z-10">
            <h1 className="hero-title text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-1">
              {title}
            </h1>
            <h2 className="hero-title text-2xl sm:text-3xl lg:text-4xl font-bold text-(--lime-400) leading-tight mb-4">
              {highlightedTitle}
            </h2>

            <p className="hero-subtitle text-(--blue-200) text-sm lg:text-base leading-relaxed max-w-md mb-3">
              {description}
            </p>

            {/* Feature Pills */}
            <div className="hidden sm:grid grid-cols-1 xs:grid-cols-2 md:flex md:flex-wrap gap-3 lg:gap-4 mb-4">
              {features.map((pill, idx) => (
                <div
                  key={idx}
                  className="hero-feature-pill flex items-center gap-2.5 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2.5 border border-white/10 min-w-0"
                >
                  <div className="w-8 h-8 bg-(--lime-500) rounded-full flex items-center justify-center flex-shrink-0">
                    <pill.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-xs font-semibold whitespace-nowrap">
                      {pill.text}
                    </p>
                    <p className="text-(--blue-200) text-[10px] leading-tight whitespace-nowrap">
                      {pill.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="hero-cta flex flex-col sm:flex-row flex-wrap items-stretch xs:items-center gap-3 sm:gap-4">
              <Link
                href={cta.quoteHref}
                className="inline-flex items-center justify-center gap-2 bg-(--lime-500) hover:bg-(--lime-600) text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors group"
              >
                {cta.quoteLabel}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={cta.phoneHref}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium px-5 py-3 rounded-full text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-(--lime-400)" />
                {cta.phoneLabel}
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="hero-image relative hidden md:block pt-2 lg:pt-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <div className="w-full h-full bg-(--gray-200) flex items-center justify-center">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 80V40C240 80 480 0 720 0C960 0 1200 80 1440 40V80H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}