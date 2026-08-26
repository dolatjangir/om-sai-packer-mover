
import { redirect } from "next/navigation";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { auth } from "../../../../auth";
import { prisma } from "../../../../../lib/prisma";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      state: true,
      pincode: true,
      createdAt: true,
      role: true,
    },
  });

  if (!user) redirect("/login");

  const fields = [
    { label: "Full Name", value: user.name || "Not set", icon: User },
    { label: "Email", value: user.email, icon: Mail },
    { label: "Phone", value: user.phone || "Not set", icon: Phone },
    { label: "Address", value: user.address || "Not set", icon: MapPin },
    { label: "City", value: user.city || "Not set", icon: MapPin },
    { label: "State", value: user.state || "Not set", icon: MapPin },
    { label: "Pincode", value: user.pincode || "Not set", icon: MapPin },
    { label: "Member Since", value: new Date(user.createdAt).toLocaleDateString(), icon: Calendar },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-(--gray-900)">My Profile</h1>

      <div className="bg-white rounded-xl border border-(--gray-200) p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-(--blue-100) flex items-center justify-center text-(--blue-700)">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-(--gray-900)">{user.name || "User"}</h2>
            <p className="text-sm text-(--gray-500)">{user.email}</p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
              {user.role}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => {
            const Icon = field.icon;
            return (
              <div key={field.label} className="flex items-start gap-3 p-4 bg-(--gray-50) rounded-lg">
                <Icon className="w-5 h-5 text-(--gray-400) mt-0.5" />
                <div>
                  <p className="text-xs text-(--gray-500)">{field.label}</p>
                  <p className="text-sm font-medium text-(--gray-900)">{field.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}