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
        step={0.1}
        label="Scale"
        value={store.lighthouseScale ?? 0}
        onChange={(val) => store.setLighthouseScale(val)}
      />

      <ColorPicker
        label="Road Color"
        value={store.roadColor}
        setter={store.setRoadColor}
      />

      <ColorPicker
        label="Lighthouse Color"
        value={store.lighthouseColor}
        setter={store.setLighthouseColor}
      />

    </aside>
  )
}