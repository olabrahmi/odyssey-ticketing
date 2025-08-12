'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TicketType } from '@prisma/client';

import { submitTicket } from './action';

export default function Form() {
  const router = useRouter();

  const [state, action, pending] = useActionState(submitTicket, { error: null, data: null });

  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    if (!state.data || state.error) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      if (!state.data) return;

      router.push(`/ticket/${state.data.id}`);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [state.data, state.error, router]);

  return (
    <div className="flex flex-col gap-4 py-4">
      {state.error && <p className="text-red-500">An error occurred: {state.error}</p>}
      {state.data && (
        <p className="text-green-500">
          Ticket submitted successfully. Redirecting to ticket page in {seconds} seconds...
        </p>
      )}
      <form action={action} className="flex flex-col gap-2">
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <select name="type">
          {Object.values(TicketType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button type="submit" disabled={pending}>
          {pending ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
