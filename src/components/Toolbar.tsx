import { useFilters } from '../context/FiltersContext'
import type { StatusFilter } from '../types'

const TABS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'open', label: 'Открытые' },
  { value: 'in_progress', label: 'В работе' },
  { value: 'closed', label: 'Закрытые' },
]

export type SortKey = 'due' | 'priority'

interface ToolbarProps {
  sort: SortKey
  onSortChange: (value: SortKey) => void
}

export function Toolbar({ sort, onSortChange }: ToolbarProps) {
  const { query, setQuery, status, setStatus } = useFilters()

  return (
    <div className="toolbar">
      <input
        className="search"
        type="search"
        placeholder="Поиск по теме заявки…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <div className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            className={`tab ${status === tab.value ? 'tab--active' : ''}`}
            onClick={() => setStatus(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <label className="sort">
        Сортировка
        <select value={sort} onChange={(event) => onSortChange(event.target.value as SortKey)}>
          <option value="due">по сроку</option>
          <option value="priority">по приоритету</option>
        </select>
      </label>
    </div>
  )
}
