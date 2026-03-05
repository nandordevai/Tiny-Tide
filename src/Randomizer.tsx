import { useStore } from './store'

function randomHexColor() {
  return Array.from({ length: 6 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
}

export function Randomizer() {
  const store = useStore()

  const randomize = () => {
    store.setLighthouseColor(`#${randomHexColor()}`)
    store.setRoadColor(`#${randomHexColor()}`)
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