// app/about-us/page.tsx
"use client";

import { motion, Variants } from "framer-motion";

// Icons (using Lucide React - install with: npm install lucide-react)
import {
  Users,
  Truck,
  MapPin,
  Clock,
  Shield,
  UserCheck,
  Award,
  ClipboardList,
  Calculator,
  Package,
  Home,
  Phone,
  Mail,
  CheckCircle2,
  ArrowRight,
  Play,
} from "lucide-react";

// ─── Animation Variants ─────────────────────────────────────────
const fadeInUp:Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInLeft:Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInRight:Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer:Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const scaleIn:Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

// ─── Color Tokens (matching the design) ─────────────────────────
const colors = {
  primary: "#1B3A5C",      // Deep navy blue
  accent: "#8BC34A",       // Lime green
  accentDark: "#7CB342",
  textDark: "#1F2937",
  textGray: "#6B7280",
  white: "#FFFFFF",
  lightBg: "#F8FAFC",
  borderGray: "#E5E7EB",
};

// ─── Data ───────────────────────────────────────────────────────
const stats = [
  { icon: Users, value: "10,000+", label: "Happy Customers" },
  { icon: Truck, value: "15,000+", label: "Successful Moves" },
  { icon: MapPin, value: "200+", label: "Cities Covered" },
  { icon: Clock, value: "99%", label: "On-Time Delivery" },
];

const values = [
  {
    icon: Shield,
    title: "Safety First",
    desc: "We use the best packing materials and secure processes to keep your belongings safe.",
  },
  {
    icon: UserCheck,
    title: "Customer Focused",
    desc: "Your satisfaction is our priority. We listen, we care and we deliver beyond expectations.",
  },
  {
    icon: Award,
    title: "Integrity",
    desc: "We believe in honest pricing, clear communication and complete transparency.",
  },
  {
    icon: Users,
    title: "Professional Team",
    desc: "Our trained and experienced team ensures a smooth and worry-free move.",
  },
];

const processSteps = [
  {
    num: "01",
    icon: ClipboardList,
    title: "Request a Quote",
    desc: "Share your moving details with us.",
  },
  {
    num: "02",
    icon: Calculator,
    title: "Get a Free Estimate",
    desc: "We provide a transparent and affordable quote.",
  },
  {
    num: "03",
    icon: Package,
    title: "Packing & Loading",
    desc: "Our team packs your items carefully and loads safely.",
  },
  {
    num: "04",
    icon: Truck,
    title: "Transport",
    desc: "We transport your belongings securely to your new location.",
  },
  {
    num: "05",
    icon: Home,
    title: "Unloading & Setup",
    desc: "We unload and place everything with care at your new home.",
  },
];

const whyChooseItems = [
  "Affordable pricing with no hidden charges",
  "High-quality packing materials",
  "Real-time tracking and regular updates",
  "Trained professionals and modern equipment",
  "24/7 customer support",
];

// ─── Reusable Components ────────────────────────────────────────

const SectionLabel = ({ text }: { text: string }) => (
  <span
    className="text-sm font-bold tracking-widest uppercase"
    style={{ color: colors.accent }}
  >
    {text}
  </span>
);

const SectionTitle = ({
  before,
  highlight,
  after,
  center = false,
}: {
  before: string;
  highlight: string;
  after: string;
  center?: boolean;
}) => (
  <h2
    className={`text-3xl md:text-4xl font-bold leading-tight ${center ? "text-center" : ""}`}
    style={{ color: colors.primary }}
  >
    {before}{" "}
    <span style={{ color: colors.accent }}>{highlight}</span>
    {after && ` ${after}`}
  </h2>
);

// ─── Main Page Component ────────────────────────────────────────
export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <SectionLabel text="About Us" />
              <h1
                className="text-4xl md:text-5xl lg:text-[3.2rem] font-bold leading-tight mt-4 mb-6"
                style={{ color: colors.primary }}
              >
                We Make Moving{" "}
                <span style={{ color: colors.accent }}>
                  Simple, Safe & Stress-Free
                </span>
              </h1>
              <div
                className="w-16 h-1 mb-6 rounded-full"
                style={{ backgroundColor: colors.accent }}
              />
              <p
                className="text-base md:text-lg leading-relaxed mb-8 max-w-lg"
                style={{ color: colors.textGray }}
              >
                MoveEasy Packers & Movers is a trusted moving company committed
                to providing hassle-free relocation services across the country.
                With a strong network, experienced team and customer-first
                approach, we ensure your belongings reach safely, on time—every
                time.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-lg text-white font-semibold text-sm md:text-base shadow-lg transition-all"
                style={{ backgroundColor: colors.primary }}
              >
                Know More About Us
                <span
                  className="flex items-center justify-center w-6 h-6 rounded-full"
                  style={{ backgroundColor: colors.accent }}
                >
                  <ArrowRight size={14} className="text-white" />
                </span>
              </motion.button>
            </motion.div>

            {/* Right Image */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="relative aspect-[4/3] w-full bg-gray-100">
                  <img
                    src="/images/movers-hero.jpg"
                    alt="Professional movers carrying boxes"
                    className="object-cover"
                    
                  />
                  {/* Fallback gradient if image not available */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                    <div className="text-center">
                      <Truck size={64} className="mx-auto mb-4 text-slate-400" />
                      <span className="text-slate-500 text-sm">Movers Image</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 10+ Years Badge */}
              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="absolute -bottom-6 left-8 md:left-12 bg-white rounded-2xl shadow-xl px-6 py-4 flex items-center gap-4 border border-gray-100"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${colors.accent}20` }}
                >
                  <Users size={24} style={{ color: colors.accent }} />
                </div>
                <div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: colors.primary }}
                  >
                    10+
                  </div>
                  <div
                    className="text-xs font-medium"
                    style={{ color: colors.textGray }}
                  >
                    Years of Moving Trust
                  </div>
                </div>
              </motion.div>

              {/* Decorative Green Curve */}
              <div
                className="absolute -bottom-10 -right-10 w-40 h-40 md:w-56 md:h-56 rounded-full opacity-20 -z-10"
                style={{
                  background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)`,
                }}
              />
              <div
                className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-30 -z-10"
                style={{
                  background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)`,
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          STATS BAR
          ═══════════════════════════════════════════════════════ */}
      <section
        className="py-12 md:py-16 relative overflow-hidden"
        style={{ backgroundColor: colors.primary }}
      >
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className={`text-center ${idx < stats.length - 1 ? "md:border-r md:border-white/20" : ""}`}
              >
                <div className="flex justify-center mb-3">
                  <stat.icon
                    size={40}
                    strokeWidth={1.5}
                    style={{ color: colors.accent }}
                  />
                </div>
                <div
                  className="text-3xl md:text-4xl font-bold mb-1"
                  style={{ color: colors.white }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm font-medium"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          OUR VALUES SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Title */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <SectionLabel text="Our Values" />
              <h2
                className="text-3xl md:text-4xl font-bold leading-tight mt-4"
                style={{ color: colors.primary }}
              >
                The Principles That Drive{" "}
                <span style={{ color: colors.accent }}>Everything We Do</span>
              </h2>
              <div
                className="w-12 h-1 mt-6 rounded-full"
                style={{ backgroundColor: colors.accent }}
              />
            </motion.div>

            {/* Right Cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-9 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {values.map((val, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="text-center group"
                >
                  <div className="flex justify-center mb-5">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor:
                          idx % 2 === 0 ? colors.primary : colors.accent,
                      }}
                    >
                      <val.icon
                        size={28}
                        className="text-white"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ color: colors.primary }}
                  >
                    {val.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: colors.textGray }}
                  >
                    {val.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          HOW WE WORK / PROCESS SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: colors.lightBg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <SectionLabel text="How We Work" />
            <h2
              className="text-3xl md:text-4xl font-bold mt-4"
              style={{ color: colors.primary }}
            >
              Our Simple <span style={{ color: colors.accent }}>Moving</span>{" "}
              Process
            </h2>
          </motion.div>

          {/* Process Steps */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5">
              <div
                className="w-full h-full border-t-2 border-dashed"
                style={{ borderColor: `${colors.accent}60` }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
              {processSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="relative text-center"
                >
                  {/* Step Circle */}
                  <div className="flex justify-center mb-6 relative z-10">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg relative"
                      style={{
                        backgroundColor:
                          idx % 2 === 0 ? colors.primary : colors.accent,
                      }}
                    >
                      <step.icon
                        size={28}
                        className="text-white"
                        strokeWidth={1.5}
                      />
                      {/* Number Badge */}
                      <div
                        className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md"
                        style={{
                          backgroundColor:
                            idx % 2 === 0 ? colors.accent : colors.primary,
                        }}
                      >
                        {step.num}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: colors.primary }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed max-w-xs mx-auto"
                    style={{ color: colors.textGray }}
                  >
                    {step.desc}
                  </p>

                  {/* Mobile Arrow */}
                  {idx < processSteps.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-4">
                      <ArrowRight
                        size={20}
                        style={{ color: colors.accent }}
                        className="rotate-90"
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          WHY CHOOSE US SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Image */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="relative aspect-[4/3] w-full bg-gray-100">
                  <img
                    src="/images/mover-truck.jpg"
                    alt="Professional mover with company truck"

                    className="object-cover"
                  />
                  {/* Fallback */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                    <div className="text-center">
                      <Truck size={64} className="mx-auto mb-4 text-slate-400" />
                      <span className="text-slate-500 text-sm">Mover with Truck</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative dots */}
              <div className="absolute -left-4 top-1/4 flex flex-col gap-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: colors.accent }}
                  />
                ))}
              </div>
              <div className="absolute -left-4 top-1/4 mt-10 flex flex-col gap-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: colors.accent }}
                  />
                ))}
              </div>
              <div className="absolute -left-4 top-1/4 mt-20 flex flex-col gap-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: colors.accent }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <SectionLabel text="Why Choose Us" />
              <h2
                className="text-3xl md:text-4xl font-bold mt-4 mb-8"
                style={{ color: colors.primary }}
              >
                Moving Made Easy With{" "}
                <span style={{ color: colors.accent }}>MoveEasy</span>
              </h2>

              <div className="space-y-5">
                {whyChooseItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: colors.accent }}
                    >
                      <CheckCircle2 size={14} className="text-white" />
                    </div>
                    <span
                      className="text-base font-medium"
                      style={{ color: colors.textDark }}
                    >
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA BANNER
          ═══════════════════════════════════════════════════════ */}
      <section
        className="py-12 md:py-16 relative overflow-hidden"
        style={{ backgroundColor: colors.primary }}
      >
        {/* Decorative circles */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 -translate-y-1/2 translate-x-1/2"
          style={{ backgroundColor: colors.accent }}
        />
        <div
          className="absolute bottom-0 right-20 w-32 h-32 rounded-full opacity-5 translate-y-1/2"
          style={{ backgroundColor: colors.accent }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-5"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: colors.accent }}
              >
                <Phone size={24} className="text-white" />
              </div>
              <div>
                <h3
                  className="text-xl md:text-2xl font-bold text-white"
                >
                  Need Help with Your Move?
                </h3>
                <p
                  className="text-sm md:text-base mt-1"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  Our team is ready to assist you!
                </p>
              </div>
            </motion.div>

            {/* Center Button */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-lg font-semibold text-sm md:text-base shadow-lg transition-all"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.white,
                }}
              >
                Get a Free Quote
                <span
                  className="flex items-center justify-center w-6 h-6 rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                >
                  <ArrowRight size={14} className="text-white" />
                </span>
              </motion.button>
            </motion.div>

            {/* Right Contact */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center md:text-right"
            >
              <div className="flex items-center justify-center md:justify-end gap-2 mb-2">
                <Phone size={18} style={{ color: colors.accent }} />
                <span className="text-xl font-bold text-white">
                  1800 123 4567
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-end gap-2">
                <Mail size={16} style={{ color: colors.accent }} />
                <span
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  support@moveeasy.com
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}