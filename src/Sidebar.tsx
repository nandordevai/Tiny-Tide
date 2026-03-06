import { ColorPicker } from './ColorPicker'
import { Slider } from './Slider'
import { ShareButton } from './ShareButton'
import { Randomizer } from './Randomizer'
import { useStore } from './store'
import './Sidebar.css'
import { Switch } from './Switch'

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
      <h2>Settings</h2>
      <Slider
        min={1}
        max={1.5}
        step={0.01}
        icon="scale.svg"
        value={store.lighthouseScale ?? 0}
        showValue={false}
        onChange={(val) => store.setLighthouseScale(val)}
      />

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
        icon="sea.svg"
        value={store.seaShade}
        showValue={false}
        onChange={(val) => store.setSeaShade(val)}
      />

      <div className="small-controls">
        <Switch
          icon="rain.svg"
          checked={store.isRaining}
          onChange={(val) => store.setIsRaining(val)}
        />

        <h2>Colors</h2>

        <ColorPicker
          label="Lighthouse"
          value={store.lighthouseColor}
          setter={store.setLighthouseColor}
        />

        <ColorPicker
          label="Road"
          value={store.roadColor}
          setter={store.setRoadColor}
        />
      </div>

      <div className="spacer"></div>

      <div className="buttons">
        <Randomizer />
        <ShareButton />
      </div>

    </aside>
  )
}