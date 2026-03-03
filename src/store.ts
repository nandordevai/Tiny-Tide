import { create } from 'zustand'

interface ModelState {
  isLoaded: boolean
  lighthouseScale: number
  lighthouseColor: string
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
  setLighthouseColor: (val) => set({ lighthouseColor: val }),
  setLighthouseScale: (val) => set({ lighthouseScale: val }),
  setRoadColor: (val) => set({ roadColor: val }),
  setSunPosition: (val) => set({ sunPosition: val }),
  setSeaShade: (val) => set({ seaShade: val }),
  setLoaded: () => set({ isLoaded: true }),
  setCapturing: (val) => set({ capturing: val })
}))