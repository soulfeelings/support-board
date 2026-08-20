import { useSyncExternalStore } from 'react'
import { getRowRenders, resetRowRenders, subscribeRowRenders } from '../utils/renderStats'

export function RenderStats() {
  const renders = useSyncExternalStore(subscribeRowRenders, getRowRenders)

  return (
    <div className="stats">
      <span>
        Рендеров строк: <b>{renders}</b>
      </span>
      <button className="stats__reset" onClick={resetRowRenders}>
        сбросить
      </button>
    </div>
  )
}
