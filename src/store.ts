import { create } from 'zustand'

interface ModelState {
  isLoaded: boolean
  lighthouseScale: number
  lighthouseColor: string
  lightOpacity: number
  roadColor: string
  sunPosition: number
  seaShade: number
  capturing: boolean
  isRaining: boolean
  setLighthouseColor: (value: string) => void
  setLighthouseScale: (value: number) => void
  setRoadColor: (value: string) => void
  setSunPosition: (value: number) => void
  setSeaShade: (value: number) => void
  setLoaded: () => void
  setCapturing: (value: boolean) => void
  setIsRaining: (value: boolean) => void
}

const smoothstep = (min: number, max: number, value: number) => {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)))
  return x * x * (3 - 2 * x)
}

export const useStore = create<ModelState>((set) => ({
  isLoaded: false,
  lighthouseScale: 1,
  lighthouseColor: '#E72E00',
  roadColor: '#AD8E6D',
  sunPosition: 0.35,
  seaShade: 0.5,
  capturing: false,
  lightOpacity: 0,
  isRaining: false,
  setLighthouseColor: (val) => set({ lighthouseColor: val }),
  setLighthouseScale: (val) => set({ lighthouseScale: val }),
  setRoadColor: (val) => set({ roadColor: val }),
  setSunPosition: (val) => {
    const nightFactor = Math.cos(val * Math.PI * 2) * 1 - 0.5
    // It only starts turning on when nightFactor > 0 (Dusk)
    // It hits full brightness when nightFactor > 0.5 (Deep Night)
    const opacity = smoothstep(0, 0.5, nightFactor)

    set({
      sunPosition: val,
      lightOpacity: opacity
    })
    // set({
    //   sunPosition: val,
    //   lightOpacity: Math.max(0, Math.cos(val * Math.PI * 2) * 1 - 0.5)
    // })
  },
  setSeaShade: (val) => set({ seaShade: val }),
  setLoaded: () => set({ isLoaded: true }),
  setCapturing: (val) => set({ capturing: val }),
  setIsRaining: (val) => set({ isRaining: val })
}))