"use server";

import { prisma } from "@/lib/prisma";

export async function createUser() {
  await prisma.user.create({
    data: {
      name: "John Doe",
    },
  });
}
