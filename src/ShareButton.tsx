import { useStore } from './store'
import './ShareButton.css'

export function ShareButton() {
  const store = useStore()

  const handleShare = () => {
    store.setCapturing(true)
  }

  return (
      <button
        className="share-button"
        onClick={handleShare}
      >
        Share Scene
      </button>
  )
}