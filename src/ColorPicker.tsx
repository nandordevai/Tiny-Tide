import './ColorPicker.css'

interface ColorPickerProps {
  value: string
  setter: (val: string) => void
  label: string
}

export function ColorPicker({ value, setter, label }: ColorPickerProps) {
  return (
    <div className="color-picker">
      <label>{label}</label>
      <input
        className="color-input"
        type="color"
        value={value}
        onChange={(e) => setter(e.target.value)}
      />
    </div>
  )
}