import { create } from 'zustand'

interface ModelState {
  isLoaded: boolean
  lighthouseScale: number
  lighthouseColor: string
  roadColor: string
  sunPosition: number
  seaShade: number
  setLighthouseColor: (value: string) => void
  setLighthouseScale: (value: number) => void
  setRoadColor: (value: string) => void
  setSunPosition: (value: number) => void
  setSeaShade: (value: number) => void
  setLoaded: () => void
}

export const useStore = create<ModelState>((set) => ({
  isLoaded: false,
  lighthouseScale: 0,
  lighthouseColor: '#E72E00',
  roadColor: '#AD8E6D',
  sunPosition: 0.15,
  seaShade: 0.5,
  setLighthouseColor: (val) => set({ lighthouseColor: val }),
  setLighthouseScale: (val) => set({ lighthouseScale: val }),
  setRoadColor: (val) => set({ roadColor: val }),
  setSunPosition: (val) => set({ sunPosition: val }),
  setSeaShade: (val) => set({ seaShade: val }),
  setLoaded: () => set({ isLoaded: true })
}))