import { TicketRow } from './TicketRow'
import type { Ticket } from '../types'

export function TicketList({ tickets, loading }: { tickets: Ticket[]; loading: boolean }) {
  if (loading) {
    return <p className="hint">Загружаем заявки…</p>
  }

  if (tickets.length === 0) {
    return <p className="hint">Ничего не нашлось. Попробуйте изменить запрос.</p>
  }

  return (
    <ul className="list">
      {tickets.map((ticket) => (
        <TicketRow key={ticket.id} ticket={ticket} />
      ))}
    </ul>
  )
}
