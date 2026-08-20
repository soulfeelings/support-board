/**
 * Счётчик рендеров строк списка. Нужен только для наглядности:
 * показывает, сколько раз строки перерисовались с момента сброса.
 */

let rowRenders = 0
let scheduled = false
const listeners = new Set<() => void>()

function notify() {
  for (const listener of listeners) listener()
}

export function countRowRender() {
  rowRenders++
  if (scheduled) return
  scheduled = true
  queueMicrotask(() => {
    scheduled = false
    notify()
  })
}

export function resetRowRenders() {
  rowRenders = 0
  notify()
}

export function getRowRenders() {
  return rowRenders
}

export function subscribeRowRenders(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
