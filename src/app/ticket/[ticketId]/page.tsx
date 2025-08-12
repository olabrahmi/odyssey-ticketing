import { notFound } from 'next/navigation';

import { prisma } from '@/lib/prisma';

export default async function TicketPage({ params }: { params: Promise<{ ticketId: string }> }) {
  const { ticketId } = await params;

  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  if (!ticket) notFound();

  return (
    <div>
      Hello, {ticket.name}. Your ticket number is {ticket.ticketNumber}.
    </div>
  );
}
