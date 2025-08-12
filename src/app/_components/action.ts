'use server';

import { z } from 'zod';
import type { Ticket } from '@prisma/client';
import { TicketType } from '@prisma/client';

import { prisma } from '@/lib/prisma';

const ticketSchema = z.object({
  name: z.string().max(32, { message: 'Name is too long' }),
  email: z.email({ message: 'Invalid email' }),
  type: z.enum(Object.values(TicketType)),
});

export async function submitTicket(
  _previousState: { error: string | null; data: Ticket | null },
  formData: FormData,
): Promise<{ error: string | null; data: Ticket | null }> {
  try {
    const validation = ticketSchema.safeParse(Object.fromEntries(formData));

    if (!validation.success) return { error: validation.error.issues[0].message || 'Invalid form data', data: null };

    const { name, email, type } = validation.data;

    const existingTicket = await prisma.ticket.findUnique({
      where: { email },
    });

    if (existingTicket) return { error: null, data: existingTicket };

    const ticket = await prisma.ticket.create({
      data: { name, email, type },
    });

    return { error: null, data: ticket };
  } catch (error) {
    console.error('Error submitting ticket:', error);
    return { error: 'Failed to submit ticket', data: null };
  }
}
