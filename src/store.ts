import { create } from 'zustand'

interface ModelState {
  isLoaded: boolean
  lighthouseScale: number
  lighthouseColor: string
  roadColor: string
  setLighthouseColor: (value: string) => void
  setLighthouseScale: (value: number) => void
  setRoadColor: (value: string) => void
  setLoaded: () => void
}

export const useStore = create<ModelState>((set) => ({
  isLoaded: false,
  lighthouseScale: 0,
  lighthouseColor: '#E72E00',
  roadColor: '#AD8E6D',
  setLighthouseColor: (val) => set({ lighthouseColor: val }),
  setLighthouseScale: (val) => set({ lighthouseScale: val }),
  setRoadColor: (val) => set({ roadColor: val }),
  setLoaded: () => set({ isLoaded: true })
}))