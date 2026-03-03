import './Slider.css'

interface SliderProps {
  min: number
  max: number
  step: number
  label?: string
  icon?: string
  dim?: string
  value: number
  showValue?: boolean
  onChange: (value: number) => void
}

export function Slider({ min, max, step, label = '', icon = '', dim = '', value, showValue = true, onChange }: SliderProps ) {
  const range = max - min
  // percentage values should be the following:
  // 14, 23, 32, 41, 50, 61, 72, 83, 94
  // (possible CSS bug?)
  const percentage = (value - min) / (range / 100) -
      ((value - min) / (range / 100) - 50) / 10

  return (
    <div className={`slider ${icon && 'slider--icon'}`}>
      <label className="slider-label">
        {icon &&
          <span className="label-icon">
            <img height="16" width="16" src={icon} alt={label} />
          </span>
        }
        {label && <span className="label-text">{label}</span>}
        {showValue && <span className="label-value">{value} {dim}</span>}
      </label>
      <input
        className='slider-input'
        type="range" min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ '--progress': `${percentage}%` } as any }
      />
    </div>
  )
}