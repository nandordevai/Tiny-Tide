import { ColorPicker } from './ColorPicker'
import { Slider } from './Slider'
import { ShareButton } from './ShareButton'
import { Randomizer } from './Randomizer'
import { useStore } from './store'
import './Sidebar.css'
import { Switch } from './Switch'

export function Sidebar() {
  const store = useStore()

  return (
    <aside className="sidebar">
      <h2>Settings</h2>
      <Slider
        min={1}
        max={1.5}
        step={0.01}
        label="Scale"
        value={store.lighthouseScale ?? 0}
        showValue={false}
        onChange={(val) => store.setLighthouseScale(val)}
      />

      <Slider
        min={0}
        max={1}
        step={0.01}
        label="Sun"
        value={store.sunPosition}
        showValue={false}
        onChange={(val) => store.setSunPosition(val)}
      />

      <Slider
        min={0}
        max={1}
        step={0.01}
        label="Sea"
        value={store.seaShade}
        showValue={false}
        onChange={(val) => store.setSeaShade(val)}
      />

      <div className="small-controls">
        <Switch
          label="Rain"
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