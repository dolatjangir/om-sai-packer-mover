import { redirect } from "next/navigation";


import { auth } from "../../../../auth";
import { prisma } from "../../../../../lib/prisma";
import AdminLeadsClient from "./ClientLead";

export default async function AdminLeadsPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/user");

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      assignedUser: { select: { name: true, email: true } },
    },
    take: 100,
  });

  const serializedLeads = leads.map((l) => ({
    ...l,
    movingDate: l.movingDate?.toISOString() || null,
    createdAt: l.createdAt.toISOString(),
    updatedAt: l.updatedAt.toISOString(),
    budget: l.budget ? Number(l.budget) : null,
  }));

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "NEW").length,
    contacted: leads.filter((l) => l.status === "CONTACTED").length,
    converted: leads.filter((l) => l.status === "CONVERTED").length,
    lost: leads.filter((l) => l.status === "LOST").length,
  };

  return <AdminLeadsClient initialLeads={serializedLeads} stats={stats} />;
}