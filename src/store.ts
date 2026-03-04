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
  setLighthouseColor: (value: string) => void
  setLighthouseScale: (value: number) => void
  setRoadColor: (value: string) => void
  setSunPosition: (value: number) => void
  setSeaShade: (value: number) => void
  setLoaded: () => void
  setCapturing: (value: boolean) => void
}

export const useStore = create<ModelState>((set) => ({
  isLoaded: false,
  lighthouseScale: 0,
  lighthouseColor: '#E72E00',
  roadColor: '#AD8E6D',
  sunPosition: 0.35,
  seaShade: 0.5,
  capturing: false,
  lightOpacity: 0.4,
  setLighthouseColor: (val) => set({ lighthouseColor: val }),
  setLighthouseScale: (val) => set({ lighthouseScale: val }),
  setRoadColor: (val) => set({ roadColor: val }),
  // lightOpacity: 0.4 -> 0 -> 0.4
  // sunPosition: 0 -> 0.5 -> 1
  setSunPosition: (val) => set({
    sunPosition: val,
    lightOpacity: Math.max(0, Math.cos(val * Math.PI * 2) * 1 - 0.5)
  }),
  setSeaShade: (val) => set({ seaShade: val }),
  setLoaded: () => set({ isLoaded: true }),
  setCapturing: (val) => set({ capturing: val })
}))