import { ColorPicker } from './ColorPicker'
import { Slider } from './Slider'
import { useStore } from './store'
import './Sidebar.css'

export function Sidebar() {
  const store = useStore()

  if (!store.isLoaded) {
    return (
      <aside className="sidebar">
        <p>loading model…</p>
      </aside>
    )
  }

  return (
    <aside className="sidebar">
      <Slider
        min={0}
        max={1}
        label="Scale"
        value={store.lighthouseScale ?? 0}
        onChange={(val) => store.setLighthouseScale(val)}
      />

      <ColorPicker />

    </aside>
  )
}