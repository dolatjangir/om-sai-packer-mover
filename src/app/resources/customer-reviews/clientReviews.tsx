"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
  Shield,
  Star,
  CheckCircle2,
  Users,
  MapPin,
  Headphones,
  Play,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Package,
  Clock,
  ThumbsUp,
  Send,
  Banknote,
} from "lucide-react";
import StatsBar from "@/components/statsBar";
import HeroSection from "@/components/services-hero-reusable/heroSection";

const trustBadges = [
  { icon: Shield, title: "Trusted by", subtitle: "10,000+ Customers" },
  { icon: Star, title: "4.8/5", subtitle: "Average Rating" },
  { icon: MapPin, title: "200+ Cities", subtitle: "Successfully Served" },
];

const ratingSnapshot = [
  { stars: 5, percent: 85 },
  { stars: 4, percent: 10 },
  { stars: 3, percent: 3 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 1 },
];

const customerLove = [
  { label: "Safe & Secure Packing", percent: "98%", icon: Package },
  { label: "On-Time Delivery", percent: "96%", icon: Clock },
  { label: "Professional Team", percent: "97%", icon: Users },
  { label: "Value for Money", percent: "95%", icon: ThumbsUp },
];

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    location: "Jaipur, Rajasthan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    text: "MoveEasy made my home shifting so easy! The team was professional, on time and handled everything with great care.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Mehta",
    location: "Bengaluru, Karnataka",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    text: "I was worried about moving my fragile items, but the packing was excellent and everything arrived safely. Highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Amit Verma",
    location: "Pune, Maharashtra",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    text: "From booking to delivery, the whole process was smooth and hassle-free. Great service at a very reasonable price.",
    rating: 5,
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Lucknow, Uttar Pradesh",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    text: "The team was polite, efficient and completed the move ahead of time. Truly a trustworthy moving partner.",
    rating: 5,
  },
  {
    id: 5,
    name: "Neha Kapoor",
    location: "Delhi, Delhi",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    text: "Excellent service! They took care of every small detail. I will definitely choose MoveEasy again for my next move.",
    rating: 5,
  },
];

const videoReviews = [
  {
    id: 1,
    name: "Ankit & Neha",
    location: "Jaipur, Rajasthan",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    name: "Saurabh Tiwari",
    location: "Indore, Madhya Pradesh",
    thumbnail: "https://images.unsplash.com/photo-1600585154526-8d8c0b5c0b0c?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    name: "Megha Reddy",
    location: "Hyderabad, Telangana",
    thumbnail: "https://images.unsplash.com/photo-1600585154526-8d8c0b5c0b0c?w=400&h=250&fit=crop",
  },
];

const stats = [
  { value: "10,000+", label: "Happy Customers", icon: Users },
  { value: "200+", label: "Cities Covered", icon: MapPin },
  { value: "15,000+", label: "Successful Moves", icon: Package },
  { value: "99%", label: "On-Time Delivery", icon: CheckCircle2 },
  { value: "4.8/5", label: "Customer Rating", icon: Star },
  { value: "24/7", label: "Customer Support", icon: Headphones },
];

export default function ReviewsPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = Math.ceil(testimonials.length / 3);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
     <HeroSection
          title="Real Stories. Trusted by"
          highlightedTitle="Thousands."
          description="We take pride in delivering safe, reliable and hassle-free moving experiences. But don't just take our word for it – here's what our happy customers have to say!"
   
          features={[
            { icon: Shield, text: "Trusted by", sub: "10,000+ Customers" },
            { icon: Clock, text: "4.8/5", sub: "Average Rating" },
            { icon: Package, text: "200+ Cities", sub: "Successfully Served" },
          
          ]}
          image={{ src: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=700&h=500&fit=crop", alt: "customer review image" }}
        />

      {/* Rating Stats Section */}
      <section className="bg-white  py-4">
        <div className="max-w-7xl shadow-[0_0_30px_rgba(15,23,42,0.12)] rounded-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Overall Rating */}
            <div className="flex flex-col items-center justify-center text-center  m-2 border-r border-(--gray-200)">
              <p className="text-(--gray-900) text-sm font-semibold mb-2">Overall Customer Rating</p>
              <p className="text-(--blue-600) text-5xl font-bold mb-2">
                4.8<span className="text-2xl text-(--gray-400)">/5</span>
              </p>
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-6 h-6 fill-(--lime-500) text-(--lime-500)" />
                ))}
              </div>
              <p className="text-(--gray-500) text-sm mb-4">Based on 1,248+ Reviews</p>
              <button className="flex items-center gap-2 border border-(--lime-500) text-(--lime-600) px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-(--lime-50) transition-colors">
                <Pencil className="w-4 h-4" />
                Write a Review
              </button>
            </div>

            {/* Rating Snapshot */}
            <div className="p-4 m-2 border-r border-(--gray-200)">
              <p className="text-(--gray-900) text-sm font-semibold mb-4">Rating Snapshot</p>
              <div className="space-y-6">
                {ratingSnapshot.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <span className="text-(--gray-600) text-sm w-12">{item.stars} Star</span>
                    <div className="flex-1 h-2 bg-(--gray-100) rounded-full overflow-hidden">
                      <div className="h-full bg-(--lime-500) rounded-full" style={{ width: `${item.percent}%` }}></div>
                    </div>
                    <span className="text-(--gray-600) text-sm w-10 text-right">{item.percent}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What Customers Love */}
            <div className="p-6">
              <p className="text-(--gray-900) text-sm font-semibold mb-4">What Our Customers Love</p>
              <div className="space-y-4">
                {customerLove.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-(--blue-50) rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-(--blue-600)" />
                      </div>
                      <span className="text-(--gray-700) text-sm flex-1">{item.label}</span>
                      <span className="text-(--gray-900) text-sm font-bold">{item.percent}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-(--gray-900) text-2xl font-bold text-center mb-8">
            What Our <span className="text-(--lime-600)">Customers</span> Say
          </h2>

          <div className="relative">
            <div className="flex gap-6 overflow-hidden">
              {testimonials.map((review) => (
                <div
                  key={review.id}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/5 bg-white rounded-xl border border-(--gray-200) p-5 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-(--lime-500) text-(--lime-500)" />
                      ))}
                    </div>
                  </div>
                  <p className="text-(--gray-600) text-sm leading-relaxed mb-4">{review.text}</p>
                  <p className="text-(--gray-900) text-sm font-semibold">{review.name}</p>
                  <p className="text-(--gray-400) text-xs mb-2">{review.location}</p>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-(--blue-600)" />
                    <span className="text-(--blue-600) text-xs font-medium">Verified Customer</span>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white border border-(--gray-200) rounded-full flex items-center justify-center shadow-md hover:bg-(--gray-50) transition-colors hidden lg:flex">
              <ChevronLeft className="w-5 h-5 text-(--gray-600)" />
            </button>
            <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white border border-(--gray-200) rounded-full flex items-center justify-center shadow-md hover:bg-(--gray-50) transition-colors hidden lg:flex">
              <ChevronRight className="w-5 h-5 text-(--gray-600)" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2, 3, 4].map((dot) => (
              <button
                key={dot}
                onClick={() => setActiveSlide(dot)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${dot === activeSlide ? "bg-(--lime-500)" : "bg-(--gray-300)"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Video Reviews Section */}
      <section className="bg-(--gray-50) py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-(--gray-900) text-2xl font-bold mb-1">
                Video <span className="text-(--lime-600)">Reviews</span>
              </h2>
              <p className="text-(--gray-500) text-sm">Hear it directly from our happy customers</p>
            </div>
            <button className="flex items-center gap-2 bg-(--lime-500) hover:bg-(--lime-600) text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors group">
              View All Videos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {videoReviews.map((video) => (
              <div key={video.id} className="relative rounded-xl overflow-hidden group cursor-pointer">
                <img src={video.thumbnail} alt={video.name} className="w-full h-56 object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-(--blue-600) ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                  <div className="w-6 h-6 bg-(--blue-600) rounded-full flex items-center justify-center">
                    <Users className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <p className="text-(--gray-900) text-xs font-semibold">{video.name}</p>
                    <p className="text-(--gray-500) text-[10px]">{video.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-(--blue-900) rounded-2xl p-6 md:p-8 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-(--blue-800) rounded-xl flex items-center justify-center flex-shrink-0 relative">
                  <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&h=100&fit=crop" alt="Moving box" className="w-12 h-12 object-cover rounded-lg" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-(--lime-500) rounded-full flex items-center justify-center">
                    <Shield className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold mb-1">
                    Join <span className="text-(--lime-400)">Thousands</span> of Happy Customers
                  </h3>
                  <p className="text-(--blue-200) text-sm max-w-md">
                    Experience a smooth and stress-free move with MoveEasy Packers & Movers.
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 bg-(--lime-500) hover:bg-(--lime-600) text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors group whitespace-nowrap">
                Get a Free Quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block">
              <Send className="w-32 h-32 text-(--lime-400)" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
     <StatsBar/>

     
    </div>
  );
}