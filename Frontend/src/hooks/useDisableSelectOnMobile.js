function useDisableSelectOnMobile() {
  window.matchMedia('(max-width: 640px)').matches &&
    document.body.classList.add('select-none')
}
export default useDisableSelectOnMobile
