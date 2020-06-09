import { useRef, useCallback, useMemo } from 'react'

export default function useLongPress({
  onClick = () => {},
  onLongPress = () => {},
  ms = 300,
} = {}) {
  const timerRef = useRef(false)
  const eventRef = useRef({})

  const callback = useCallback(() => {
    onLongPress(eventRef.current)
    eventRef.current = {}
    timerRef.current = false
  }, [onLongPress])

  const start = useCallback(
    (ev) => {
      document.body.classList.add('select-none')
      ev.persist()
      eventRef.current = ev
      timerRef.current = setTimeout(callback, ms)
    },
    [callback, ms]
  )

  const stop = useCallback(
    (ev) => {
      ev.persist()
      eventRef.current = ev
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        onClick(eventRef.current)
        timerRef.current = false
        eventRef.current = {}
        document.body.classList.remove('select-none')
      }
    },
    [onClick]
  )

  return useMemo(
    () => ({
      onMouseDown: start,
      onMouseUp: stop,
      onMouseLeave: stop,
      onTouchStart: start,
      onTouchEnd: stop,
      onTouchMove: stop,
    }),
    [start, stop]
  )
}
