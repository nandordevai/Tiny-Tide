import './Slider.css'

interface SliderProps {
  min: number
  max: number
  label: string
  value: number
  onChange: (value: number) => void
}

export function Slider({ min, max, label, value, onChange }: SliderProps ) {
  const range = max - min
  const percentage = (value - min) / (range / 100)

  return (
    <div className="slider">
      <label className="slider-label">
        <span className="label-text">{label}</span>
        <span className="label-value">{value} mm</span>
      </label>
      <input
        className='slider-input'
        type="range" min={min} max={max} step="10"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ '--progress': `${percentage}%` } as any }
      />
    </div>
  )
}