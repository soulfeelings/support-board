import { useEffect, useState } from 'react'
import { fetchTickets } from '../api/tickets'
import type { StatusFilter, Ticket } from '../types'

export function useTickets(status: StatusFilter) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchTickets(status).then((data) => {
      setTickets(data)
      setLoading(false)
    })
  }, [status])

  return { tickets, loading }
}
