
import { redirect } from "next/navigation";
import { MapPin, Truck, Clock, CheckCircle2 } from "lucide-react";
import { auth } from "../../../../../auth";
import { prisma } from "../../../../../lib/prisma";

export default async function TrackingPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const activeBookings = await prisma.booking.findMany({
    where: {
      customerId: session.user.id,
      status: { in: ["CONFIRMED", "PICKED_UP", "IN_TRANSIT"] },
    },
    include: {
      trackingUpdates: { orderBy: { timestamp: "desc" } },
      driver: { select: { name: true, phone: true } },
    },
    orderBy: { movingDate: "desc" },
  });

  const statusSteps = [
    { key: "CONFIRMED", label: "Confirmed", icon: CheckCircle2 },
    { key: "PICKED_UP", label: "Picked Up", icon: Truck },
    { key: "IN_TRANSIT", label: "In Transit", icon: MapPin },
    { key: "DELIVERED", label: "Delivered", icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-(--gray-900)">Track Your Shipment</h1>

      {activeBookings.length === 0 ? (
        <div className="bg-white rounded-xl border border-(--gray-200) p-12 text-center">
          <MapPin className="w-12 h-12 mx-auto text-(--gray-300) mb-4" />
          <p className="text-(--gray-500)">No active shipments to track</p>
        </div>
      ) : (
        activeBookings.map((booking:any) => (
          <div key={booking.id} className="bg-white rounded-xl border border-(--gray-200) p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-(--gray-900)">{booking.bookingNumber}</h3>
                <p className="text-sm text-(--gray-500)">{booking.fromCity} → {booking.toCity}</p>
              </div>
              {booking.driver && (
                <div className="text-right">
                  <p className="text-sm font-medium text-(--gray-700)">Driver: {booking.driver.name}</p>
                  <p className="text-xs text-(--gray-500)">{booking.driver.phone}</p>
                </div>
              )}
            </div>

            {/* Progress Steps */}
            <div className="relative">
              <div className="flex items-center justify-between">
                {statusSteps.map((step, index) => {
                  const isCompleted = statusSteps.findIndex(s => s.key === booking.status) >= index;
                  const isCurrent = step.key === booking.status;
                  const Icon = step.icon;
                  return (
                    <div key={step.key} className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted ? "bg-(--lime-500) text-(--blue-900)" : "bg-(--gray-100) text-(--gray-400)"
                      } ${isCurrent ? "ring-4 ring-(--lime-500)/30" : ""}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-xs mt-2 font-medium ${isCompleted ? "text-(--gray-900)" : "text-(--gray-400)"}`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tracking Updates */}
            <div className="mt-6 space-y-3">
              {booking.trackingUpdates.map((update:any) => (
                <div key={update.id} className="flex items-start gap-3 p-3 bg-(--gray-50) rounded-lg">
                  <Clock className="w-4 h-4 text-(--gray-400) mt-0.5" />
                  <div>
                    <p className="text-sm text-(--gray-800)">{update.description}</p>
                    <p className="text-xs text-(--gray-400)">
                      {update.location} • {new Date(update.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}