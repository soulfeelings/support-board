import { memo, useState } from 'react'
import { useFilters } from '../context/FiltersContext'
import { formatSla, formatDate } from '../utils/sla'
import { countRowRender } from '../utils/renderStats'
import type { Ticket } from '../types'

const STATUS_LABEL: Record<Ticket['status'], string> = {
  open: 'открыт',
  in_progress: 'в работе',
  closed: 'закрыт',
}

const PRIORITY_LABEL: Record<Ticket['priority'], string> = {
  low: 'низкий',
  medium: 'средний',
  high: 'высокий',
}

export const TicketRow = memo(function TicketRow({ ticket }: { ticket: Ticket }) {
  countRowRender()

  // В режиме «Все» показываем колонку статуса; при фильтре по конкретному
  // статусу она не нужна — он и так один на весь список.
  const { status } = useFilters()
  const showStatusChip = status === 'all'

  const [expanded, setExpanded] = useState(false)
  const sla = formatSla(ticket)

  return (
    <li className={`row ${expanded ? 'row--expanded' : ''}`}>
      <button className="row__main" onClick={() => setExpanded((v) => !v)}>
        <span className="row__id">{ticket.id}</span>
        <span className="row__title">{ticket.title}</span>
        {showStatusChip && <span className={`chip chip--${ticket.status}`}>{STATUS_LABEL[ticket.status]}</span>}
        <span className={`row__sla ${sla.startsWith('просрочен') ? 'row__sla--late' : ''}`}>{sla}</span>
      </button>

      {expanded && (
        <dl className="row__details">
          <div>
            <dt>Исполнитель</dt>
            <dd>{ticket.assignee}</dd>
          </div>
          <div>
            <dt>Приоритет</dt>
            <dd>{PRIORITY_LABEL[ticket.priority]}</dd>
          </div>
          <div>
            <dt>Создан</dt>
            <dd>{formatDate(ticket.createdAt)}</dd>
          </div>
          <div>
            <dt>Срок</dt>
            <dd>{formatDate(ticket.dueAt)}</dd>
          </div>
        </dl>
      )}
    </li>
  )
})
