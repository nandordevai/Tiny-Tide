import { useStore } from './store'
// import './ShareButton.css'

function randomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
}

export function Randomizer() {
  const store = useStore()

  const randomize = () => {
    store.setLighthouseColor(randomHexColor())
    store.setRoadColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
    store.setSunPosition(Math.random())
    store.setSeaShade(Math.random())
    store.setLighthouseScale(Math.random() * 0.5 + 1)
    store.setIsRaining(Math.random() < 0.2)
  }

  return (
      <button
        className="button"
        onClick={randomize}
      >
        Randomize
      </button>
  )
}