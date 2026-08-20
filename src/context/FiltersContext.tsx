import { createContext, useContext, useState, type ReactNode } from 'react'
import type { StatusFilter } from '../types'

interface FiltersValue {
  query: string
  status: StatusFilter
  setQuery: (value: string) => void
  setStatus: (value: StatusFilter) => void
}

const FiltersContext = createContext<FiltersValue | null>(null)

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')

  return (
    <FiltersContext.Provider value={{ query, status, setQuery, setStatus }}>
      {children}
    </FiltersContext.Provider>
  )
}

export function useFilters(): FiltersValue {
  const value = useContext(FiltersContext)
  if (!value) throw new Error('useFilters должен вызываться внутри <FiltersProvider>')
  return value
}
