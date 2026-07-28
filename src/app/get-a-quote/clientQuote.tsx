"use client";

import React, { useState } from "react";
import { 
  Phone, 
  MapPin, 
  Calendar, 
  User, 
  FileText, 
  CheckCircle, 
  Check, 
  ArrowRight, 
  Truck, 
  Users, 
  ShieldCheck, 
  Clock, 
  Award,
  CheckCircle2,
  AlertCircle,
  Loader2, 
 
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function GetAQuotePage() {
  const [formData, setFormData] = useState({
    moveType: "",
    movingDate: "",
    pickupLocation: "",
    deliveryLocation: "",
    propertyFrom: "",
    propertyTo: "",
    rooms: "",
    approxGoods: "",
    fullName: "",
    mobileNumber: "",
    emailAddress: "",
    additionalRequirements: "",
    agreeToTerms: false,
  });

 const [isSubmitting, setIsSubmitting] = useState(false);
const [submitError, setSubmitError] = useState("");
const [submitSuccess, setSubmitSuccess] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitError("");

  try {
    const res = await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        moveType: formData.moveType,
        movingDate: formData.movingDate,
        pickupLocation: formData.pickupLocation,
        deliveryLocation: formData.deliveryLocation,
        propertyFrom: formData.propertyFrom,
        propertyTo: formData.propertyTo,
        rooms: formData.rooms,
        approxGoods: formData.approxGoods,
        fullName: formData.fullName,
        mobileNumber: formData.mobileNumber,
        emailAddress: formData.emailAddress,
        additionalRequirements: formData.additionalRequirements,
        agreeToTerms: formData.agreeToTerms,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      if (data.errors) {
        const errorMessages = Object.values(data.errors).flat().join(", ");
        throw new Error(errorMessages);
      }
      throw new Error(data.message || "Failed to submit");
    }

    setSubmitSuccess(true);
    // Reset form
    setFormData({
      moveType: "",
      movingDate: "",
      pickupLocation: "",
      deliveryLocation: "",
      propertyFrom: "",
      propertyTo: "",
      rooms: "",
      approxGoods: "",
      fullName: "",
      mobileNumber: "",
      emailAddress: "",
      additionalRequirements: "",
      agreeToTerms: false,
    });
  } catch (err) {
    setSubmitError(err instanceof Error ? err.message : "Something went wrong");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-white text-[var(--gray-900)] font-sans antialiased">
      
    

      {/* HERO BANNER SECTION */}
      <section className="relative overflow-hidden h-[100vh] md:h-[90vh]   md:pb-16 pt-38 ">
         <img
    src="/get-a-quote-hero-bg-img.png"
    className="hidden md:block absolute inset-0 w-full h-full "
    alt=""
  />
      <img
    src="/get-a-quote-hero-bg-img-phn.png"
    className="block md:hidden absolute inset-0 w-full h-full z-0"
    alt=""
  />
  {/* <div className="block md:hidden absolute inset-0 bg-white/20 z-10" /> */}


        <div className="relative  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              {/* <div className="text-sm font-medium text-[var(--gray-500)] flex items-center gap-2">
                Home <span className="text-xs">›</span> <span className="text-[var(--gray-900)] font-semibold">Get a Quote</span>
              </div> */}
              <h1 className="text-4xl md:text-5xl font-black text-[var(--blue-950)] italic leading-tight">
                Get a Quote <br />
                <span className="text-[var(--lime-600)]">Fast. Free. No Obligation.</span>
              </h1>
              <p className="text-[var(--gray-600)] text-base max-w-xl leading-relaxed">
                Tell us about your moving requirement and we'll provide you with the best possible quote tailored to your needs.
              </p>

              {/* USP Checklist grid */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-[var(--lime-50)] rounded-lg text-[var(--lime-600)] shrink-0">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[var(--blue-950)]">100% Free</h4>
                    <p className="text-xs text-[var(--gray-500)]">No hidden charges</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-[var(--lime-50)] rounded-lg text-[var(--lime-600)] shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[var(--blue-950)]">Quick Response</h4>
                    <p className="text-xs text-[var(--gray-500)]">We'll get back in minutes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-[var(--lime-50)] rounded-lg text-[var(--lime-600)] shrink-0">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[var(--blue-950)]">Best Prices</h4>
                    <p className="text-xs text-[var(--gray-500)]">Competitive pricing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-[var(--lime-50)] rounded-lg text-[var(--lime-600)] shrink-0">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[var(--blue-950)]">Secure & Reliable</h4>
                    <p className="text-xs text-[var(--gray-500)]">Your info is safe</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Asset Representation */}
            {/* <div className="lg:col-span-5 hidden lg:block relative">
              <div className="w-full h-72 bg-gradient-to-tr from-[var(--blue-100)] to-emerald-50 rounded-2xl relative shadow-inner p-6 flex items-center justify-center border border-dashed border-[var(--gray-300)]">
                <div className="text-center space-y-2">
                  <FileText className="h-16 w-16 text-[var(--blue-600)] mx-auto opacity-80" />
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--gray-400)]">Visual Asset Container</p>
                  <p className="text-sm text-[var(--gray-500)] font-medium">Clipboard & Moving Boxes Illustration</p>
                </div>
              </div>
            </div> */}

          </div>
        </div>
      </section>

      {/* CORE FORM & CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: MAIN REQUEST FORM */}
          <div className="lg:col-span-8 bg-white border border-[var(--gray-200)] rounded-xl p-6 md:p-8 shadow-xs">
            <h2 className="text-2xl font-extrabold text-[var(--blue-950)] mb-1">
              Request Your <span className="text-[var(--lime-600)]">Free Quote</span>
            </h2>
            <p className="text-sm text-[var(--gray-500)] mb-8">
              Fill in the details below and our moving expert will contact you.
            </p>
{submitError && (
  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium mb-4 flex items-center gap-2">
    <AlertCircle className="w-4 h-4" /> {submitError}
  </div>
)}

{submitSuccess && (
  <div className="p-4 bg-[var(--lime-50)] border border-[var(--lime-200)] rounded-xl text-[var(--lime-700)] text-sm font-medium mb-4 flex items-center gap-2">
    <CheckCircle2 className="w-4 h-4" /> 
    Quote request submitted! Our team will contact you shortly.
  </div>
)}
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* STEP 1: Moving Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-[var(--gray-100)] pb-2">
                  <div className="p-1 text-[var(--lime-600)]"><Truck className="h-4 w-4" /></div>
                  <h3 className="font-bold text-sm text-[var(--blue-950)] uppercase tracking-wide">1. Moving Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--gray-700)] mb-1.5">Move Type *</label>
                    <select 
                      required 
                      className="w-full border border-[var(--gray-300)] rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-[var(--blue-500)] text-[var(--gray-600)]"
                      value={formData.moveType}
                      onChange={(e) => setFormData({...formData, moveType: e.target.value})}
                    >
                      <option value="">Select Move Type</option>
                      <option value="residential">Residential Moving</option>
                      <option value="office">Office Relocation</option>
                      <option value="vehicle">Vehicle Shipping</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--gray-700)] mb-1.5">Moving Date *</label>
                    <div className="relative">
                      <input 
                        type="date" 
                        required 
                        className="w-full border border-[var(--gray-300)] rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-[var(--blue-500)] text-[var(--gray-600)]"
                        value={formData.movingDate}
                        onChange={(e) => setFormData({...formData, movingDate: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--gray-700)] mb-1.5">From (Pickup Location) *</label>
                    <div className="relative">
                      <MapPin className="absolute right-3 top-3.5 h-4 w-4 text-[var(--gray-400)]" />
                      <input 
                        type="text" 
                        required 
                        placeholder="Enter Pickup City" 
                        className="w-full border border-[var(--gray-300)] rounded-lg p-2.5 pr-10 text-sm bg-white focus:outline-none focus:border-[var(--blue-500)] text-[var(--gray-700)]"
                        value={formData.pickupLocation}
                        onChange={(e) => setFormData({...formData, pickupLocation: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--gray-700)] mb-1.5">To (Delivery Location) *</label>
                    <div className="relative">
                      <MapPin className="absolute right-3 top-3.5 h-4 w-4 text-[var(--gray-400)]" />
                      <input 
                        type="text" 
                        required 
                        placeholder="Enter Delivery City" 
                        className="w-full border border-[var(--gray-300)] rounded-lg p-2.5 pr-10 text-sm bg-white focus:outline-none focus:border-[var(--blue-500)] text-[var(--gray-700)]"
                        value={formData.deliveryLocation}
                        onChange={(e) => setFormData({...formData, deliveryLocation: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--gray-700)] mb-1.5">Property Type (From) *</label>
                    <select 
                      className="w-full border border-[var(--gray-300)] rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-[var(--blue-500)] text-[var(--gray-600)]"
                      value={formData.propertyFrom}
                      onChange={(e) => setFormData({...formData, propertyFrom: e.target.value})}
                    >
                      <option value="">Select Property Type</option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa / Independent House</option>
                      <option value="office">Commercial Office</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--gray-700)] mb-1.5">Property Type (To)</label>
                    <select 
                      className="w-full border border-[var(--gray-300)] rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-[var(--blue-500)] text-[var(--gray-600)]"
                      value={formData.propertyTo}
                      onChange={(e) => setFormData({...formData, propertyTo: e.target.value})}
                    >
                      <option value="">Select Property Type</option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa / Independent House</option>
                      <option value="office">Commercial Office</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* STEP 2: Shipment Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-[var(--gray-100)] pb-2">
                  <div className="p-1 text-[var(--lime-600)]"><FileText className="h-4 w-4" /></div>
                  <h3 className="font-bold text-sm text-[var(--blue-950)] uppercase tracking-wide">2. Shipment Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--gray-700)] mb-1.5">No. of Bedrooms / Rooms *</label>
                    <select 
                      required 
                      className="w-full border border-[var(--gray-300)] rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-[var(--blue-500)] text-[var(--gray-600)]"
                      value={formData.rooms}
                      onChange={(e) => setFormData({...formData, rooms: e.target.value})}
                    >
                      <option value="">Select</option>
                      <option value="1bhk">1 BHK</option>
                      <option value="2bhk">2 BHK</option>
                      <option value="3bhk">3 BHK</option>
                      <option value="4bhk+">4+ BHK / Villa</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--gray-700)] mb-1.5">Approx. Goods to Move *</label>
                    <select 
                      required 
                      className="w-full border border-[var(--gray-300)] rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-[var(--blue-500)] text-[var(--gray-600)]"
                      value={formData.approxGoods}
                      onChange={(e) => setFormData({...formData, approxGoods: e.target.value})}
                    >
                      <option value="">Select</option>
                      <option value="few">Few Items Only</option>
                      <option value="full">Complete Household Goods</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* STEP 3: Your Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-[var(--gray-100)] pb-2">
                  <div className="p-1 text-[var(--lime-600)]"><User className="h-4 w-4" /></div>
                  <h3 className="font-bold text-sm text-[var(--blue-950)] uppercase tracking-wide">3. Your Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--gray-700)] mb-1.5">Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Enter Your Name" 
                      className="w-full border border-[var(--gray-300)] rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-[var(--blue-500)] text-[var(--gray-700)]"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--gray-700)] mb-1.5">Mobile Number *</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="Enter 10 Digit Mobile No." 
                      className="w-full border border-[var(--gray-300)] rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-[var(--blue-500)] text-[var(--gray-700)]"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[var(--gray-700)] mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="Enter Email Address" 
                      className="w-full border border-[var(--gray-300)] rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-[var(--blue-500)] text-[var(--gray-700)]"
                      value={formData.emailAddress}
                      onChange={(e) => setFormData({...formData, emailAddress: e.target.value})}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-[var(--gray-700)] mb-1.5">Additional Requirements</label>
                    <textarea 
                      rows={3} 
                      placeholder="Write anything you want us to know..." 
                      className="w-full border border-[var(--gray-300)] rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:border-[var(--blue-500)] text-[var(--gray-700)] resize-none"
                      value={formData.additionalRequirements}
                      onChange={(e) => setFormData({...formData, additionalRequirements: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* T&C Agreement */}
              <div className="flex items-start gap-2.5 pt-2">
                <input 
                  type="checkbox" 
                  id="agree" 
                  required
                  className="mt-1 h-4 w-4 rounded-sm border-[var(--gray-300)] accent-[var(--lime-600)]" 
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
                />
                <label htmlFor="agree" className="text-xs text-[var(--gray-500)] leading-tight">
                  I agree to the <a href="#" className="text-[var(--lime-600)] underline font-medium">Terms & Conditions</a> and <a href="#" className="text-[var(--lime-600)] underline font-medium">Privacy Policy</a>
                </label>
              </div>

              {/* Action Trigger Button */}
            <button 
  type="submit" 
  disabled={isSubmitting}
  className="w-full bg-[var(--lime-600)] hover:bg-[var(--lime-700)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-extrabold text-base py-3.5 px-6 rounded-lg shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
>
  {isSubmitting ? (
    <>
      <Loader2 className="h-5 w-5 animate-spin" /> Submitting...
    </>
  ) : (
    <>
      Submit Request <ArrowRight className="h-5 w-5 bg-white/20 rounded-full p-0.5" />
    </>
  )}
</button>

              <div className="text-center pt-2">
                <p className="text-xs text-[var(--gray-500)] flex items-center justify-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[var(--lime-600)]" /> We respect your privacy. Your details are safe with us and will never be shared.
                </p>
              </div>
            </form>
          </div>

          {/* RIGHT SIDEBAR BANNER WRAPPERS */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Step Guides Widget */}
            <div className="bg-(--blue-50) border border-[var(--gray-200)] rounded-xl p-6 shadow-xs space-y-6">
              <h3 className="font-extrabold text-lg text-[var(--blue-950)] border-b border-[var(--gray-100)] pb-2">
                Get Your Quote in <span className="text-[var(--lime-600)]">3 Easy Steps</span>
              </h3>
              
              <div className="space-y-6 relative before:absolute before:bottom-2 before:top-2 before:left-5 before:w-0.5 before:bg-[var(--gray-100)]">
                <div className="flex items-start gap-4 relative">
                  <div className="h-10 w-10 bg-[var(--lime-50)] text-[var(--lime-600)] rounded-full flex items-center justify-center shrink-0 font-bold border border-[var(--lime-200)] z-10">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[var(--blue-950)]">1. Fill the Form</h4>
                    <p className="text-xs text-[var(--gray-500)] mt-0.5">Provide your moving details in our quick form.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 relative">
                  <div className="h-10 w-10 bg-[var(--blue-50)] text-[var(--blue-600)] rounded-full flex items-center justify-center shrink-0 font-bold border border-[var(--blue-200)] z-10">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[var(--blue-950)]">2. Get a Call</h4>
                    <p className="text-xs text-[var(--gray-500)] mt-0.5">Our expert will call you to understand your needs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 relative">
                  <div className="h-10 w-10 bg-[var(--lime-50)] text-[var(--lime-600)] rounded-full flex items-center justify-center shrink-0 font-bold border border-[var(--lime-200)] z-10">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[var(--blue-950)]">3. Receive Quote</h4>
                    <p className="text-xs text-[var(--gray-500)] mt-0.5">Get the best price quote with complete details.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us Widget */}
            <div className="bg-(--blue-50) border border-[var(--gray-200)] rounded-xl p-6 shadow-xs">
              <h3 className="font-extrabold text-lg text-[var(--blue-950)] border-b border-[var(--gray-100)] pb-3 mb-4">
                Why Get a Quote from Us?
              </h3>
              <ul className="space-y-3">
                {[
                  "Customized quote based on your needs",
                  "No hidden charges – 100% transparent",
                  "Expert advice for a smooth move",
                  "On-time delivery and door-to-door service",
                  "Safe handling of your belongings",
                  "24/7 customer support"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-[var(--gray-700)]">
                    <Check className="h-4 w-4 text-[var(--lime-600)] shrink-0 font-bold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Emergency Hotline Assistance Widget */}
            <div className="bg-(--blue-50) border border-[var(--gray-200)] rounded-xl p-6 shadow-xs text-center space-y-4">
              <h3 className="font-extrabold text-base text-[var(--blue-950)]">Need Immediate Assistance?</h3>
              <p className="text-xs text-[var(--gray-500)] leading-snug">
                Call us now for instant support and quick booking.
              </p>
              <a 
                href="tel:18001234567" 
                className="flex items-center justify-center gap-2 border-2 border-[var(--lime-500)] text-[var(--blue-950)] font-black text-xl py-2.5 rounded-lg hover:bg-[var(--lime-50)] transition"
              >
                <Phone className="h-5 w-5 text-[var(--lime-600)] fill-[var(--lime-600)]" />
                1800 123 4567
              </a>
              <div className="text-[11px] text-[var(--gray-500)] font-medium flex items-center justify-center gap-1">
                <Clock className="h-3.5 w-3.5" /> Mon - Sun (8:00 AM - 8:00 PM)
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* LOWER CALL TO ACTION BANNER SECTION */}
      <section className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="relative overflow-visible bg-radial from-[var(--blue-50)] to-white border border-[var(--gray-200)] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <img src="/get-a-quote-page-botom-img.png" className=" absolute -top-0  sm:-top-7 sm:-left-2 h-40 w-auto" />
          <div className=" flex items-center gap-4">
           
            <div className=" pt-30 sm:pl-50 sm:pt-0">
              <h3 className="text-xl md:text-2xl font-black text-[var(--blue-950)]">
                Moving Soon? <span className="text-[var(--lime-600)]">Let Us Take Care of Everything!</span>
              </h3>
              <p className="text-sm text-[var(--gray-500)] mt-1">
                From packing to transportation and unpacking – we make your move easy, safe and stress-free.
              </p>
            </div>
          </div>
          <button className="bg-white border border-[var(--gray-300)] text-[var(--gray-700)] hover:text-[var(--blue-900)] font-extrabold text-sm py-3 px-6 rounded-lg transition shadow-xs flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer">
            Explore Our Services <ArrowRight className="h-4 w-4 text-[var(--lime-600)] bg-[var(--lime-50)] rounded-full p-0.5" />
          </button>
        </div>
      </section>

      {/* REAL-TIME HIGHLIGHT STATS SECTION */}
      <section className="bg-[var(--gray-50)] border-y border-[var(--gray-200)] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="space-y-1">
              <Users className="h-5 w-5 text-[var(--blue-700)] mx-auto" />
              <div className="text-lg font-black text-[var(--blue-950)]">10,000+</div>
              <div className="text-[11px] font-bold text-[var(--gray-500)] tracking-wide uppercase">Happy Customers</div>
            </div>
            <div className="space-y-1">
              <MapPin className="h-5 w-5 text-[var(--blue-700)] mx-auto" />
              <div className="text-lg font-black text-[var(--blue-950)]">200+</div>
              <div className="text-[11px] font-bold text-[var(--gray-500)] tracking-wide uppercase">Cities Covered</div>
            </div>
            <div className="space-y-1">
              <Truck className="h-5 w-5 text-[var(--blue-700)] mx-auto" />
              <div className="text-lg font-black text-[var(--blue-950)]">99%</div>
              <div className="text-[11px] font-bold text-[var(--gray-500)] tracking-wide uppercase">On-Time Delivery</div>
            </div>
            <div className="space-y-1">
              <Award className="h-5 w-5 text-[var(--blue-700)] mx-auto" />
              <div className="text-lg font-black text-[var(--blue-950)]">4.8/5</div>
              <div className="text-[11px] font-bold text-[var(--gray-500)] tracking-wide uppercase">Customer Rating</div>
            </div>
            <div className="col-span-2 md:col-span-1 space-y-1">
              <Clock className="h-5 w-5 text-[var(--blue-700)] mx-auto" />
              <div className="text-lg font-black text-[var(--blue-950)]">24/7</div>
              <div className="text-[11px] font-bold text-[var(--gray-500)] tracking-wide uppercase">Support Available</div>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
}