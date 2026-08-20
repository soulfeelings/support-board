import { useEffect, useState } from 'react'
import { FiltersProvider, useFilters } from './context/FiltersContext'
import { useTickets } from './hooks/useTickets'
import { Toolbar, type SortKey } from './components/Toolbar'
import { TicketList } from './components/TicketList'
import { RenderStats } from './components/RenderStats'
import type { Ticket } from './types'

const PRIORITY_WEIGHT = { high: 0, medium: 1, low: 2 } as const

function sortTickets(tickets: Ticket[], sort: SortKey): Ticket[] {
  const copy = [...tickets]
  if (sort === 'priority') {
    copy.sort((a, b) => PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority])
  } else {
    copy.sort((a, b) => a.dueAt - b.dueAt)
  }
  return copy
}

function Board() {
  const { query, status } = useFilters()
  const { tickets, loading } = useTickets(status)
  const [sort, setSort] = useState<SortKey>('due')

  const needle = query.trim().toLowerCase()
  const filtered = tickets.filter((ticket) => ticket.title.toLowerCase().includes(needle))
  const visible = sortTickets(filtered, sort)

  const [foundCount, setFoundCount] = useState(0)
  useEffect(() => {
    setFoundCount(visible.length)
  }, [visible.length])

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Заявки поддержки</h1>
          <p className="subtitle">Найдено заявок: {foundCount}</p>
        </div>
        <RenderStats />
      </header>

      <Toolbar sort={sort} onSortChange={setSort} />

      <TicketList tickets={visible} loading={loading} />
    </div>
  )
}

export default function App() {
  return (
    <FiltersProvider>
      <Board />
    </FiltersProvider>
  )
}
