import { Phone, ArrowRight } from "lucide-react";

interface Props {
  image: string;
  title1: string;
  title2: string;
  description: string;
  imageClassName?: string; // optional extra tweaks per page
}

export default function CtaBanner({
  title1,
  title2,
  description,
  image,
  imageClassName = "",
}: Props) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="relative overflow-visible bg-radial from-(--blue-900) to-(--blue-900) border border-(--gray-200) rounded-2xl p-6 pt-24 sm:pt-6 flex flex-col md:flex-row items-center md:items-center justify-between gap-6">
        
        {/* Image: sits above content on mobile, overlaps to the side on md+ */}
        <img
          src={image}
          alt=""
          className={`
            order-first md:order-none
            w-28 xs:w-32 sm:w-40 md:w-48 lg:w-56
            h-auto object-contain
            md:absolute md:-top-6 md:left-0
            ${imageClassName}
          `}
        />

        <div className="flex items-center gap-4 text-center md:text-left md:pl-40 lg:pl-52">
          <div>
            <h3 className="text-xl md:text-2xl font-black text-[var(--blue-100)]">
              {title1}{" "}
              <span className="text-[var(--lime-600)]">{title2}</span>
            </h3>
            <p className="text-sm text-[var(--gray-100)] mt-1">
              {description}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
          
           <a href="#"
            className="inline-flex items-center gap-2 bg-(--lime-500) hover:bg-(--lime-600) text-white font-semibold px-5 py-3 rounded-full text-sm transition-colors group"
          >
            Get a Free Quote
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          
           <a href="tel:18001234567"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium px-5 py-3 rounded-full text-sm transition-colors"
          >
            <Phone className="w-4 h-4" />
            1800 123 4567
          </a>
        </div>
      </div>
    </section>
  );
}