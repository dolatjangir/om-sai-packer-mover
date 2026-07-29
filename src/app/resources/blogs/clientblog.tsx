"use client";

import React, { useState } from "react";
import {
  Search,
  ArrowRight,
  Calendar,
  Clock,
  ChevronRight,
  Phone,
  Mail,
  MessageCircle,
  Shield,
  DollarSign,
  Bell,
  CheckCircle2,
  Send,
  Menu,
  X,
  Home,
  Truck,
  Package,
  Banknote,
} from "lucide-react";
import StatsBar from "@/components/statsBar";
import HeroSection from "@/components/services-hero-reusable/heroSection";

const categories = [
  "All Articles",
  "Moving Tips",
  "Packing Guide",
  "Relocation",
  "Storage Solutions",
  "Home Organization",
  "Company Updates",
];

const blogPosts = [
  {
    id: 1,
    category: "MOVING TIPS",
    title: "10 Essential Tips for a Stress-Free Move",
    description:
      "Expert tips to help you plan, pack and move without any last-minute stress.",
    date: "May 20, 2024",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    category: "PACKING GUIDE",
    title: "How to Pack Fragile Items Like a Pro",
    description:
      "Learn the best packing techniques to keep your valuables safe during transit.",
    date: "May 18, 2024",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    category: "RELOCATION",
    title: "Complete Relocation Checklist for Your Move",
    description:
      "A comprehensive checklist to ensure you don't miss anything during your move.",
    date: "May 15, 2024",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    category: "STORAGE",
    title: "When Should You Consider a Storage Solution?",
    description:
      "Not sure if you need storage? Here's when a storage unit can be helpful.",
    date: "May 12, 2024",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    category: "MOVING TIPS",
    title: "Local vs. Interstate Moving: What's the Difference?",
    description:
      "Understand the key differences and choose the right moving service for your needs.",
    date: "May 10, 2024",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    category: "HOME ORGANIZATION",
    title: "How to Settle Into Your New Home Quickly",
    description:
      "Simple tips to help you unpack, organize and feel at home in no time.",
    date: "May 08, 2024",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
  },
];

const recentPosts = [
  {
    id: 1,
    title: "10 Essential Tips for a Stress-Free Move",
    date: "May 20, 2024",
    image:
      "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    title: "How to Pack Fragile Items Like a Pro",
    date: "May 18, 2024",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    title: "Complete Relocation Checklist for Your Move",
    date: "May 15, 2024",
    image:
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    title: "When Should You Consider a Storage Solution?",
    date: "May 12, 2024",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&h=100&fit=crop",
  },
  {
    id: 5,
    title: "Local vs. Interstate Moving: What's the Difference?",
    date: "May 10, 2024",
    image:
      "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=100&h=100&fit=crop",
  },
];

const popularTags = [
  "Moving Tips",
  "Packing",
  "Relocation",
  "Storage",
  "Checklists",
  "Home Organization",
  "Moving Process",
  "Interstate Move",
];

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About Us", href: "#" },
  { name: "Services", href: "#" },
  { name: "Who Choose Us", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Blogs", href: "#", active: true },
  { name: "Conta'cts", href: "#" },
  { name: "FAQs", href: "#" },
];

const categoryColors: Record<string, string> = {
  "MOVING TIPS": "bg-[var(--blue-600)]",
  "PACKING GUIDE": "bg-[var(--lime-500)]",
  RELOCATION: "bg-[var(--blue-600)]",
  STORAGE: "bg-[var(--lime-500)]",
  "HOME ORGANIZATION": "bg-[var(--lime-500)]",
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts =
    activeCategory === "All Articles"
      ? blogPosts
      : blogPosts.filter(
          (post) =>
            post.category.toLowerCase() === activeCategory.toLowerCase() ||
            (activeCategory === "Storage Solutions" &&
              post.category === "STORAGE")
        );

  return (
    <div className="min-h-screen bg-white">
      

      {/* Hero Section */}
      <HeroSection
           title="Our Blog "
           highlightedTitle=""
           description="Tips, guides and expert advice to make your moving experience easy and stress-free."
    
           features={[
             { icon: Shield, text: "Pan India Service", sub: "We move you anywhere in India" },
             { icon: Clock, text: "Safe & Secure", sub: "Your goods are packed and transported safely" },
             { icon: Package, text: "On-Time Delivery", sub: "Timely delivery, every time" },
             { icon: Banknote, text: "24/7 Support", sub: "We're here to help you, always" },
           ]}
           image={{ src: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=700&h=500&fit=crop", alt: "blog hero image" }}
         />

      {/* Category Tabs */}
      <section className="bg-white border-b border-[var(--gray-200)] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all border ${
                  activeCategory === category
                    ? "bg-[var(--lime-500)] text-white border-[var(--lime-500)]"
                    : "bg-white text-[var(--gray-700)] border-[var(--gray-300)] hover:border-[var(--blue-600)] hover:text-[var(--blue-600)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Blog Grid - 3 columns on large screens */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-xl border border-[var(--gray-200)] overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      <span
                        className={`absolute top-4 left-4 ${
                          categoryColors[post.category] ||
                          "bg-[var(--blue-600)]"
                        } text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full`}
                      >
                        {post.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-[var(--gray-900)] font-bold text-base mb-2 leading-snug group-hover:text-[var(--blue-600)] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-[var(--gray-500)] text-sm mb-4 line-clamp-2">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-[var(--gray-400)] text-xs">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[var(--blue-600)] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 border border-[var(--gray-300)] rounded-lg text-sm focus:outline-none focus:border-[var(--blue-600)] focus:ring-1 focus:ring-[var(--blue-600)]"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--blue-600)] p-2 rounded-md">
                  <Search className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="bg-white rounded-xl border border-[var(--gray-200)] p-5">
                <h3 className="text-[var(--gray-900)] font-bold text-lg mb-4">
                  Recent Posts
                </h3>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <a
                      key={post.id}
                      href="#"
                      className="flex items-start gap-3 group"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                      />
                      <div>
                        <h4 className="text-[var(--gray-900)] text-sm font-medium leading-snug group-hover:text-[var(--blue-600)] transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <span className="text-[var(--gray-400)] text-xs mt-1 block">
                          {post.date}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[var(--gray-200)] p-5">
                <h3 className="text-[var(--gray-900)] font-bold text-lg mb-4">
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-[var(--gray-100)] text-[var(--gray-600)] text-xs font-medium rounded-full hover:bg-[var(--blue-600)] hover:text-white transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto bg-[var(--blue-900)] rounded-lg relative overflow-hidden py-4">
        <div className="  px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[var(--lime-500)] rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">
                  Stay Updated With{" "}
                  <span className="text-[var(--lime-400)]">Om Sai</span>
                </h3>
                <p className="text-[var(--blue-200)] text-sm mt-1">
                  Subscribe to our newsletter and get the latest tips, offers
                  and updates straight to your inbox.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 md:w-72 px-4 py-3 rounded-lg text-sm bg-white border border-(--stone-600) placeholder:text-(--stone-600) focus:outline-none focus:ring-2 focus:ring-[var(--lime-500)]"
              />
              <button className="bg-[var(--lime-500)] hover:bg-[var(--lime-600)] text-white px-5 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors whitespace-nowrap">
                Subscribe Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block">
          <Send className="w-32 h-32 text-[var(--lime-400)]" />
        </div>
      </section>

      {/* Features Section */}
    <StatsBar/>

     
    </div>
  );
}