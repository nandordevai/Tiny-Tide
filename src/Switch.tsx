import './Switch.css'

export function Switch({ label, checked, onChange }: { label: string, checked: boolean, onChange: (val: boolean) => void }) {
  return (
    <label className="switch control">
      {label && <span className="switch-label control-label">{label}</span>}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="control-input"
      />
      <span className="toggle"></span>
    </label>
  )
}