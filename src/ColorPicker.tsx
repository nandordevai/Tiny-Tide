import { useStore } from './store'
import './ColorPicker.css'

export function ColorPicker() {
  const { color, setColor } = useStore()

  return (
    <div className="color-picker">
      <label>Color</label>
      <input
        className="color-input"
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  )
}