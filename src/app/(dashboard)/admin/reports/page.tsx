import { auth } from "../../../../auth";
import { prisma } from "../../../../../lib/prisma";

import { redirect } from "next/navigation";
import { BarChart3, TrendingUp, Users, Truck, CreditCard } from "lucide-react";

export default async function ReportsPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/user");

  const today = new Date();
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

  const [
    totalRevenue,
    thisMonthRevenue,
    lastMonthRevenue,
    totalBookings,
    thisMonthBookings,
    totalCustomers,
    topCities,
  ] = await Promise.all([
    prisma.payment.aggregate({ where: { status: "PAID" }, _sum: { amount: true } }),
    prisma.payment.aggregate({
      where: { status: "PAID", paidAt: { gte: thisMonth } },
      _sum: { amount: true },
    }),
    prisma.payment.aggregate({
      where: { status: "PAID", paidAt: { gte: lastMonth, lt: thisMonth } },
      _sum: { amount: true },
    }),
    prisma.booking.count(),
    prisma.booking.count({ where: { createdAt: { gte: thisMonth } } }),
    prisma.user.count({ where: { role: "USER" } }),
    prisma.booking.groupBy({
      by: ["toCity"],
      _count: { toCity: true },
      orderBy: { _count: { toCity: "desc" } },
      take: 5,
    }),
  ]);

  const revenueGrowth = lastMonthRevenue._sum.amount && thisMonthRevenue._sum.amount
    ? ((Number(thisMonthRevenue._sum.amount) - Number(lastMonthRevenue._sum.amount)) / Number(lastMonthRevenue._sum.amount) * 100).toFixed(1)
    : "0";

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-(--gray-900)">Reports & Analytics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: `₹${totalRevenue._sum.amount?.toString() || "0"}`, icon: CreditCard },
          { label: "This Month", value: `₹${thisMonthRevenue._sum.amount?.toString() || "0"}`, icon: TrendingUp },
          { label: "Growth", value: `${revenueGrowth}%`, icon: BarChart3 },
          { label: "Total Customers", value: totalCustomers.toString(), icon: Users },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl border border-(--gray-200) p-5">
              <div className="w-10 h-10 rounded-lg bg-(--blue-100) text-(--blue-700) flex items-center justify-center mb-3">
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-(--gray-900)">{stat.value}</p>
              <p className="text-sm text-(--gray-500) mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-(--gray-200) p-6">
        <h2 className="font-bold text-(--gray-900) mb-4">Top Destinations</h2>
        <div className="space-y-3">
          {topCities.map((city:any) => (
            <div key={city.toCity} className="flex items-center justify-between p-3 bg-(--gray-50) rounded-lg">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-(--gray-400)" />
                <span className="font-medium text-(--gray-900)">{city.toCity}</span>
              </div>
              <span className="text-sm text-(--gray-500)">{city._count.toCity} bookings</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}