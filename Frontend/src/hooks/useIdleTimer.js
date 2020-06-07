function useIdleTimer() {
  const idleTimeLength = 1000 * 60 * 10
  let idleTime = Date.now()
  let timer = false

  const triggerReload = () => {
    window.location.reload()
  }

  const callback = () => {}

  document.addEventListener('visibilitychange', function () {
    resetTimer()
  })
  window.onload = resetTimer
  window.onmousemove = resetTimer
  window.onmousedown = resetTimer
  window.ontouchstart = resetTimer
  window.onclick = resetTimer
  window.onkeypress = resetTimer
  window.onkeypress = resetTimer
  window.ontouchmove = resetTimer

  function resetTimer() {
    clearTimeout(timer)
    timer = setTimeout(callback, idleTimeLength)

    let currentTime = Date.now()
    if (currentTime - idleTime > idleTimeLength) triggerReload()
    idleTime = Date.now()
  }
}
export default useIdleTimer
