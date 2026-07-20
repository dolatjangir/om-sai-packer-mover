import { redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import { prisma } from "../../../../../lib/prisma";
import DriverProfileClient from "./DriverProfileClient";


export default async function DriverProfilePage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "DRIVER") redirect("/user");

  const driver = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      _count: {
        select: {
          bookingsAsDriver: true,
        },
      },
    },
  });

  if (!driver) redirect("/user");

  const stats = await prisma.booking.aggregate({
    where: { driverId: session.user.id, status: "COMPLETED" },
    _sum: { finalAmount: true },
    _count: true,
  });

  return (
    <DriverProfileClient
      driver={{
        id: driver.id,
        name: driver.name,
        email: driver.email,
        phone: driver.phone,
        image: driver.image,
         imagePublicId: driver.imagePublicId,
        createdAt: driver.createdAt.toISOString(),
        totalDeliveries: driver._count.bookingsAsDriver,
        completedDeliveries: stats._count,
        totalEarnings: Number(stats._sum.finalAmount || 0),
      }}
    />
  );
}