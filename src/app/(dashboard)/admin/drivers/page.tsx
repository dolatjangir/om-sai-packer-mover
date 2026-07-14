import { auth } from "../../../../../auth";
import { prisma } from "../../../../../lib/prisma";

import { redirect } from "next/navigation";
import { Truck, Phone, Mail, Package, Star } from "lucide-react";

export default async function DriversPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/user");

  const drivers = await prisma.user.findMany({
    where: { role: "DRIVER" },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { bookingsAsDriver: true } },
      reviews: { select: { rating: true } },
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-(--gray-900)">Drivers</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drivers.map((driver:any) => {
          const avgRating = driver.reviews.length > 0
            ? (driver.reviews.reduce((a:any, b:any) => a + b.rating, 0) / driver.reviews.length).toFixed(1)
            : "N/A";
          
          return (
            <div key={driver.id} className="bg-white rounded-xl border border-(--gray-200) p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-(--gray-900)">{driver.name || "Unnamed"}</h3>
                  <p className="text-xs text-(--gray-500)">{driver.email}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-(--gray-600)">
                  <Phone className="w-4 h-4" />
                  {driver.phone || "No phone"}
                </div>
                <div className="flex items-center gap-2 text-(--gray-600)">
                  <Package className="w-4 h-4" />
                  {driver._count.bookingsAsDriver} deliveries
                </div>
                <div className="flex items-center gap-2 text-(--gray-600)">
                  <Star className="w-4 h-4" />
                  Rating: {avgRating}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}