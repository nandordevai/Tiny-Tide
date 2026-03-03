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
      <h2>Lighthouse</h2>
      <Slider
        min={0}
        max={1}
        step={0.1}
        label="Scale"
        value={store.lighthouseScale ?? 0}
        showValue={false}
        onChange={(val) => store.setLighthouseScale(val)}
      />

      <ColorPicker
        label="Color"
        value={store.lighthouseColor}
        setter={store.setLighthouseColor}
      />

      <h2>Environment</h2>

      <Slider
        min={0}
        max={1}
        step={0.01}
        icon="moon.svg"
        value={store.sunPosition}
        showValue={false}
        onChange={(val) => store.setSunPosition(val)}
      />

      <Slider
        min={0}
        max={1}
        step={0.01}
        label="Sea Shade"
        value={store.seaShade}
        showValue={false}
        onChange={(val) => store.setSeaShade(val)}
      />

      <ColorPicker
        label="Road Color"
        value={store.roadColor}
        setter={store.setRoadColor}
      />

    </aside>
  )
}