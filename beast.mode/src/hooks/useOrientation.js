// Returns 'none', 'landscape' or 'portrait'

const useOrientation = () => {
  const orientation = window.screen.msOrientation || window.screen.mozOrientation || (window.screen.orientation || {}).type

  if (orientation === 'landscape-primary' || orientation === 'landscape-secondary') return 'landscape'
  else if (orientation === 'portrait-primary' || orientation === 'portrait-secondary') return 'portrait'
  else return 'none'
}

export default useOrientation