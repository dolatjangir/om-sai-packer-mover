
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, Filter, Search } from "lucide-react";
import { auth } from "../../../../../auth";
import { prisma } from "../../../../../lib/prisma";

export default async function AdminBookingsPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/user");

  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      customer: { select: { name: true, email: true, phone: true } },
      driver: { select: { name: true, phone: true } },
    },
    take: 50,
  });

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    CONFIRMED: "bg-blue-100 text-blue-700",
    PICKED_UP: "bg-purple-100 text-purple-700",
    IN_TRANSIT: "bg-lime-100 text-lime-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
    COMPLETED: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-(--gray-900)">All Bookings</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--gray-400)" />
            <input
              type="text"
              placeholder="Search bookings..."
              className="pl-10 pr-4 py-2 border border-(--gray-200) rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-(--blue-500)/20"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-(--gray-200) rounded-lg text-sm hover:bg-(--gray-50)">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-(--gray-200) overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-(--gray-50) border-b border-(--gray-200)">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-(--gray-500) uppercase">Booking #</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-(--gray-500) uppercase">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-(--gray-500) uppercase">Route</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-(--gray-500) uppercase">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-(--gray-500) uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-(--gray-500) uppercase">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-(--gray-500) uppercase">Driver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--gray-100)">
              {bookings.map((booking:any) => (
                <tr key={booking.id} className="hover:bg-(--gray-50)">
                  <td className="px-4 py-3 text-sm font-medium text-(--blue-600)">{booking.bookingNumber}</td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-(--gray-900)">{booking.customer.name || "N/A"}</p>
                    <p className="text-xs text-(--gray-500)">{booking.customer.email}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-(--gray-700)">
                    {booking.fromCity} → {booking.toCity}
                  </td>
                  <td className="px-4 py-3 text-sm text-(--gray-700)">
                    {new Date(booking.movingDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColors[booking.status]}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-(--gray-900)">
                    ₹{booking.finalAmount?.toString() || booking.estimatedAmount?.toString() || "0"}
                  </td>
                  <td className="px-4 py-3 text-sm text-(--gray-700)">
                    {booking.driver?.name || "Unassigned"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}