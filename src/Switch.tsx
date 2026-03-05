import './Switch.css'

export function Switch({ label, icon, checked, onChange }: { label?: string, icon?: string, checked: boolean, onChange: (val: boolean) => void }) {
  return (
    <label className="switch">
      {icon && <img width="20" height="20" src={icon} alt={label} />}
      {label && <span>{label}</span>}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="slider"></span>
    </label>
  )
}