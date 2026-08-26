import { auth } from "../../../../auth";
import { prisma } from "../../../../../lib/prisma";

import { redirect } from "next/navigation";
import { Users, Mail, Phone, Calendar, Package } from "lucide-react";

export default async function CustomersPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/user");

  const customers = await prisma.user.findMany({
    where: { role: "USER" },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { bookingsAsCustomer: true } },
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-(--gray-900)">Customers</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map((customer:any) => (
          <div key={customer.id} className="bg-white rounded-xl border border-(--gray-200) p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-(--blue-100) flex items-center justify-center text-(--blue-700)">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-(--gray-900)">{customer.name || "Unnamed"}</h3>
                <p className="text-xs text-(--gray-500)">{customer.email}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-(--gray-600)">
                <Phone className="w-4 h-4" />
                {customer.phone || "No phone"}
              </div>
              <div className="flex items-center gap-2 text-(--gray-600)">
                <Calendar className="w-4 h-4" />
                Joined {new Date(customer.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 text-(--gray-600)">
                <Package className="w-4 h-4" />
                {customer._count.bookingsAsCustomer} bookings
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}