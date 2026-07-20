"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Navigation,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Truck,
  Phone,
  Clock,
  Radio,
  Crosshair,
  LocateFixed,
  Share2,
  Route,
  Pause,
  Play,
  StopCircle,
  ChevronRight,
  Signal,
  Battery,
  Wifi,
} from "lucide-react";

interface Booking {
  id: string;
  bookingNumber: string;
  status: string;
  fromCity: string;
  toCity: string;
  fromAddress: string;
  toAddress: string;
  trackingCode: string | null;
  customer: { name: string | null; phone: string | null };
  trackingUpdates: { latitude: number | null; longitude: number | null; timestamp: string; location: string | null }[];
}

interface DriverTrackingClientProps {
  activeBookings: Booking[];
  driverId: string;
}

interface LocationUpdate {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: string;
  speed: number | null;
}

export default function DriverTrackingClient({ activeBookings, driverId }: DriverTrackingClientProps) {
  const router = useRefresh();
  const [selectedBooking, setSelectedBooking] = useState<string>(activeBookings[0]?.id || "");
  const [currentLocation, setCurrentLocation] = useState<LocationUpdate | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [locationText, setLocationText] = useState("");
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [updateCount, setUpdateCount] = useState(0);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [networkStatus, setNetworkStatus] = useState<"online" | "offline">("online");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const selectedBookingData = activeBookings.find((b) => b.id === selectedBooking);

  // Get geolocation
  const getLocation = useCallback(() => {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
        return;
      }
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });
    });
  }, []);

  // Send location update to API
  const sendLocationUpdate = useCallback(
    async (position?: GeolocationPosition, manualLocation?: string) => {
      if (!selectedBooking) {
        setError("Please select a delivery first");
        return;
      }

      setLoading(true);
      setError("");

      try {
        let lat: number, lng: number, accuracy: number;

        if (position) {
          lat = position.coords.latitude;
          lng = position.coords.longitude;
          accuracy = position.coords.accuracy;
        } else {
          // Manual location - use default or geocode later
          lat = currentLocation?.latitude || 0;
          lng = currentLocation?.longitude || 0;
          accuracy = 0;
        }

        const res = await fetch(`/api/driver/tracking`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookingId: selectedBooking,
            latitude: lat,
            longitude: lng,
            accuracy,
            location: manualLocation || locationText || undefined,
            speed: position?.coords.speed,
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message);

        setCurrentLocation({
          latitude: lat,
          longitude: lng,
          accuracy,
          timestamp: new Date().toISOString(),
          speed: position?.coords.speed || null,
        });
        setLastUpdate(new Date().toLocaleTimeString("en-IN"));
        setUpdateCount((prev) => prev + 1);
        setSuccess("Location shared with customer");
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update location");
      } finally {
        setLoading(false);
      }
    },
    [selectedBooking, currentLocation, locationText]
  );

  // Start auto-tracking
  const startAutoTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported in your browser");
      return;
    }

    setIsAutoMode(true);
    setIsTracking(true);

    // Watch position
    const id = navigator.geolocation.watchPosition(
      (position) => {
        sendLocationUpdate(position);
      },
      (err) => {
        setError(`Location error: ${err.message}`);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 }
    );

    setWatchId(id);

    // Also send every 30 seconds as backup
    intervalRef.current = setInterval(() => {
      getLocation().then(sendLocationUpdate).catch(() => {});
    }, 30000);
  }, [getLocation, sendLocationUpdate]);

  // Stop auto-tracking
  const stopAutoTracking = useCallback(() => {
    setIsAutoMode(false);
    setIsTracking(false);
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [watchId]);

  // Manual update
  const handleManualUpdate = async () => {
    try {
      const position = await getLocation();
      await sendLocationUpdate(position, locationText);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not get location");
    }
  };

  // Get single location on mount
  useEffect(() => {
    getLocation()
      .then((pos) => {
        setCurrentLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          timestamp: new Date().toISOString(),
          speed: pos.coords.speed,
        });
      })
      .catch(() => {
        setError("Please enable location access for tracking");
      });

    // Battery status
    if ("getBattery" in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setBatteryLevel(Math.round(battery.level * 100));
        battery.addEventListener("levelchange", () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
      });
    }

    // Network status
    const handleOnline = () => setNetworkStatus("online");
    const handleOffline = () => setNetworkStatus("offline");
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      stopAutoTracking();
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [getLocation, stopAutoTracking]);

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      {/* Header */}
      <div className="bg-[var(--blue-600)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/driver" className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors">
                <ArrowLeft className="w-5 h-5 text-white" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-white">Live Tracking</h1>
                <p className="text-sm text-[var(--blue-100)]">Share your real-time location</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${networkStatus === "online" ? "bg-[var(--lime-400)]" : "bg-red-400"} animate-pulse`} />
              <Wifi className="w-4 h-4 text-white/80" />
              <span className="text-xs text-white/80">{batteryLevel}%</span>
              <Battery className="w-4 h-4 text-white/80" />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Alerts */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> {error}
            </motion.div>
          )}
          {success && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 bg-[var(--lime-50)] border border-[var(--lime-200)] rounded-xl text-[var(--lime-700)] text-sm font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> {success}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Select Delivery */}
        <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
          <h3 className="text-sm font-bold text-[var(--gray-700)] uppercase tracking-wider mb-3">Select Delivery</h3>
          {activeBookings.length === 0 ? (
            <div className="text-center py-6">
              <Truck className="w-10 h-10 text-[var(--gray-300)] mx-auto mb-2" />
              <p className="text-sm text-[var(--gray-500)]">No active deliveries to track</p>
              <Link href="/driver/deliveries" className="text-sm font-semibold text-[var(--blue-600)] mt-2 inline-block">View Deliveries</Link>
            </div>
          ) : (
            <div className="space-y-2">
              {activeBookings.map((booking) => (
                <button
                  key={booking.id}
                  onClick={() => setSelectedBooking(booking.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    selectedBooking === booking.id
                      ? "border-[var(--blue-600)] bg-[var(--blue-50)]"
                      : "border-[var(--gray-200)] hover:border-[var(--blue-300)]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[var(--gray-900)]">{booking.bookingNumber}</p>
                      <p className="text-xs text-[var(--gray-500)] mt-0.5">
                        {booking.fromCity} → {booking.toCity} • {booking.trackingCode}
                      </p>
                    </div>
                    {selectedBooking === booking.id && (
                      <div className="w-6 h-6 rounded-full bg-[var(--blue-600)] flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Current Location Display */}
        {currentLocation && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[var(--gray-700)] uppercase tracking-wider">Current Location</h3>
              <div className="flex items-center gap-1 text-xs text-[var(--gray-400)]">
                <Signal className="w-3 h-3" />
                {currentLocation.accuracy < 20 ? "High Accuracy" : currentLocation.accuracy < 100 ? "Good" : "Low Accuracy"}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-[var(--gray-50)] rounded-xl">
                <p className="text-xs text-[var(--gray-400)]">Latitude</p>
                <p className="font-mono text-sm font-bold text-[var(--gray-900)]">{currentLocation.latitude.toFixed(6)}</p>
              </div>
              <div className="p-3 bg-[var(--gray-50)] rounded-xl">
                <p className="text-xs text-[var(--gray-400)]">Longitude</p>
                <p className="font-mono text-sm font-bold text-[var(--gray-900)]">{currentLocation.longitude.toFixed(6)}</p>
              </div>
            </div>

            {lastUpdate && (
              <div className="flex items-center gap-2 text-xs text-[var(--gray-500)] mb-4">
                <Clock className="w-3 h-3" />
                Last updated: {lastUpdate} • {updateCount} updates sent
              </div>
            )}

            {/* Map Link */}
            <a
              href={`https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--blue-50)] text-[var(--blue-700)] rounded-xl font-semibold hover:bg-[var(--blue-100)] transition-colors border border-[var(--blue-200)]"
            >
              <MapPin className="w-4 h-4" /> Open in Google Maps
            </a>
          </motion.div>
        )}

        {/* Manual Location Input */}
        <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
          <h3 className="text-sm font-bold text-[var(--gray-700)] uppercase tracking-wider mb-3">Location Note (Optional)</h3>
          <input
            type="text"
            value={locationText}
            onChange={(e) => setLocationText(e.target.value)}
            placeholder="e.g. Near Mumbai Highway Toll, Sector 12"
            className="w-full px-4 py-3 rounded-xl border-2 border-[var(--gray-200)] bg-white text-[var(--gray-900)] focus:outline-none focus:border-[var(--blue-500)] transition-colors mb-3"
          />
          <p className="text-xs text-[var(--gray-400)]">Add a landmark to help customer locate you</p>
        </div>

        {/* Tracking Controls */}
        <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
          <h3 className="text-sm font-bold text-[var(--gray-700)] uppercase tracking-wider mb-4">Tracking Controls</h3>

          {/* Auto Mode Toggle */}
          <div className="flex items-center justify-between p-4 bg-[var(--gray-50)] rounded-xl mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isAutoMode ? "bg-[var(--lime-100)]" : "bg-[var(--gray-200)]"}`}>
                <Radio className={`w-5 h-5 ${isAutoMode ? "text-[var(--lime-600)]" : "text-[var(--gray-500)]"}`} />
              </div>
              <div>
                <p className="font-semibold text-[var(--gray-900)]">Auto Tracking</p>
                <p className="text-xs text-[var(--gray-500)]">Sends location every 30 seconds</p>
              </div>
            </div>
            <button
              onClick={isAutoMode ? stopAutoTracking : startAutoTracking}
              disabled={!selectedBooking || activeBookings.length === 0}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                isAutoMode
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-[var(--lime-500)] text-white hover:bg-[var(--lime-600)]"
              } disabled:opacity-50`}
            >
              {isAutoMode ? (
                <span className="flex items-center gap-2"><Pause className="w-4 h-4" /> Stop</span>
              ) : (
                <span className="flex items-center gap-2"><Play className="w-4 h-4" /> Start</span>
              )}
            </button>
          </div>

          {/* Manual Update Button */}
          <button
            onClick={handleManualUpdate}
            disabled={loading || !selectedBooking}
            className="w-full py-4 bg-[var(--blue-600)] text-white rounded-2xl font-bold text-lg hover:bg-[var(--blue-700)] transition-colors disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-[var(--blue-200)] active:scale-[0.98]"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <LocateFixed className="w-6 h-6" />
                Share Location Now
              </>
            )}
          </button>

          {isTracking && (
            <div className="mt-4 p-3 bg-[var(--lime-50)] rounded-xl border border-[var(--lime-200)] flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--lime-500)] animate-pulse" />
              <p className="text-sm text-[var(--lime-700)] font-medium">Live tracking active — customer can see your location</p>
            </div>
          )}
        </div>

        {/* Selected Booking Info */}
        {selectedBookingData && (
          <div className="bg-white rounded-2xl border border-[var(--gray-200)] shadow-sm p-6">
            <h3 className="text-sm font-bold text-[var(--gray-700)] uppercase tracking-wider mb-4">Delivery Info</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[var(--blue-100)] flex items-center justify-center">
                <Truck className="w-6 h-6 text-[var(--blue-600)]" />
              </div>
              <div>
                <p className="font-bold text-[var(--gray-900)]">{selectedBookingData.bookingNumber}</p>
                <p className="text-sm text-[var(--gray-500)]">{selectedBookingData.fromCity} → {selectedBookingData.toCity}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <a href={`tel:${selectedBookingData.customer.phone}`} className="flex-1 py-2.5 bg-[var(--blue-600)] text-white rounded-xl font-semibold text-sm text-center hover:bg-[var(--blue-700)] transition-colors flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> Call Customer
              </a>
              <Link href={`/driver/deliveries/${selectedBookingData.id}`} className="flex-1 py-2.5 bg-[var(--gray-100)] text-[var(--gray-700)] rounded-xl font-semibold text-sm text-center hover:bg-[var(--gray-200)] transition-colors flex items-center justify-center gap-2">
                <Route className="w-4 h-4" /> View Details
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Helper hook
function useRefresh() {
  const router = require("next/navigation").useRouter();
  return router;
}