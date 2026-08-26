
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, Calendar, MapPin, CreditCard } from "lucide-react";
import { auth } from "../../../../auth";
import { prisma } from "../../../../../lib/prisma";

export default async function UserBookingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const bookings = await prisma.booking.findMany({
    where: { customerId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      trackingUpdates: { orderBy: { timestamp: "desc" }, take: 1 },
    },
  });

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    CONFIRMED: "bg-blue-100 text-blue-700",
    PICKED_UP: "bg-purple-100 text-purple-700",
    IN_TRANSIT: "bg-lime-100 text-lime-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/user" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-(--gray-900)">My Bookings</h1>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-xl border border-(--gray-200) p-12 text-center">
          <Package className="w-12 h-12 mx-auto text-(--gray-300) mb-4" />
          <p className="text-(--gray-500)">No bookings yet</p>
          <Link
            href="/user/booking/new"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-(--blue-600) text-white rounded-lg text-sm font-medium"
          >
            Book Your First Move
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking:any) => (
            <div key={booking.id} className="bg-white rounded-xl border border-(--gray-200) p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-(--gray-900)">{booking.bookingNumber}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColors[booking.status]}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-(--gray-500)">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(booking.movingDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {booking.fromCity} → {booking.toCity}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-(--gray-900)">
                    ₹{booking.finalAmount?.toString() || booking.estimatedAmount?.toString() || "0"}
                  </p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    booking.paymentStatus === "PAID" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-orange-100 text-orange-700"
                  }`}>
                    {booking.paymentStatus}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}