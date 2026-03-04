import { useStore } from './store'

export function ShareButton() {
  const store = useStore()

  const handleShare = () => {
    store.setCapturing(true)
  }

  return (
      <button
        className="button"
        onClick={handleShare}
      >
        Share
      </button>
  )
}