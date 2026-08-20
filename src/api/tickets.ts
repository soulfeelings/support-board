import type { StatusFilter, Ticket, TicketStatus, Priority } from '../types'

/**
 * Заглушка бэкенда. Никакой сети — данные генерируются локально,
 * задержка имитирует реальные времена ответа наших ручек.
 */

const STATUSES: TicketStatus[] = ['open', 'in_progress', 'closed']
const PRIORITIES: Priority[] = ['low', 'medium', 'high']
const ASSIGNEES = [
  'Смирнова А.', 'Ковалёв Д.', 'Ионова М.', 'Петров С.',
  'Гареев Р.', 'Литвинова О.', 'Черных И.', 'не назначен',
]
const TOPICS = [
  'Не приходит СМС-код', 'Ошибка при переводе по СБП', 'Карта заблокирована после отпуска',
  'Не открывается выписка в PDF', 'Дубль платежа по подписке', 'Кэшбэк не начислен за март',
  'Приложение падает на splash-экране', 'Не проходит вход по Face ID', 'Неверный баланс накопительного счёта',
  'Не приходит push о зачислении', 'Повторный запрос документов при онбординге', 'Долгая загрузка истории операций',
]

const START_OF_TIME = 1_760_000_000_000

// Детерминированный генератор: у всех одинаковые данные между перезапусками.
function makeRng(seed: number) {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

function generateTickets(count: number): Ticket[] {
  const rnd = makeRng(20260821)
  const list: Ticket[] = []
  for (let i = 0; i < count; i++) {
    const topic = TOPICS[Math.floor(rnd() * TOPICS.length)]
    const createdAt = START_OF_TIME - Math.floor(rnd() * 30 * 24 * 3600 * 1000)
    list.push({
      id: `SUP-${1000 + i}`,
      title: `${topic} (${1000 + i})`,
      status: STATUSES[Math.floor(rnd() * STATUSES.length)],
      priority: PRIORITIES[Math.floor(rnd() * PRIORITIES.length)],
      assignee: ASSIGNEES[Math.floor(rnd() * ASSIGNEES.length)],
      createdAt,
      dueAt: createdAt + Math.floor(rnd() * 10 + 1) * 24 * 3600 * 1000,
    })
  }
  return list
}

const ALL_TICKETS = generateTickets(300)

// Разные ручки отвечают с разной скоростью — так же, как в проде.
const LATENCY: Record<StatusFilter, number> = {
  all: 120,
  open: 900,
  in_progress: 400,
  closed: 220,
}

export function fetchTickets(status: StatusFilter): Promise<Ticket[]> {
  const data = status === 'all' ? ALL_TICKETS : ALL_TICKETS.filter((t) => t.status === status)
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), LATENCY[status])
  })
}
