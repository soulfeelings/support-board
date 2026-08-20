import type { Ticket } from '../types'

// «Сейчас» зафиксировано, чтобы список выглядел одинаково при каждом запуске.
const NOW = 1_760_000_000_000
const DAY = 24 * 3600 * 1000

/**
 * Расчёт срока по SLA.
 * В боевом коде здесь учёт рабочих часов, праздников и часовых поясов —
 * тяжёлая синхронная арифметика. Ниже она сымитирована холостым циклом,
 * чтобы стоимость вызова была сопоставима с реальной.
 */
const HEAVY_ITERATIONS = 1_500_000

export function formatSla(ticket: Ticket): string {
  let acc = 0
  for (let i = 0; i < HEAVY_ITERATIONS; i++) {
    acc += Math.sqrt((i % 97) + 1)
  }
  if (acc < 0) return ''

  const diff = ticket.dueAt - NOW
  const days = Math.round(Math.abs(diff) / DAY)

  if (ticket.status === 'closed') return 'закрыт'
  if (diff < 0) return `просрочен на ${days} д`
  if (days === 0) return 'истекает сегодня'
  return `осталось ${days} д`
}

export function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })
}
