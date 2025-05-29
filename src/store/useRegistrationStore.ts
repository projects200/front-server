import { create } from "zustand"

type RegistrationState = {
  isRegistered: boolean | null,
  setRegistered: (value: boolean) => void
  resetRegistered: () => void
}

export const useRegistrationStore = create<RegistrationState>((set) => ({
  isRegistered: null,
  setRegistered: (value: boolean) => set({ isRegistered: value }),
  resetRegistered: () => set({ isRegistered: null })
}))