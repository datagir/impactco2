import { SiteLanguage } from 'types/languages'
import { create } from 'zustand'

interface States {
  language: SiteLanguage
  setLanguage: (language: SiteLanguage) => void
  overscreen: Record<string, string>
  setOverscreen: (slug: string, value: string) => void
  showButtons: boolean
  setShowButtons: (showButtons: boolean) => void
  hideActions: boolean
  setHideActions: (hideActions: boolean) => void
}

export const useGlobalStore = create<States>((set) => {
  let overscreenTrigger: HTMLElement | null = null
  return {
    language: 'fr',
    setLanguage: (language) => set((state) => (state.language === language ? state : { language })),
    overscreen: {},
    setOverscreen: (slug, value) =>
      set((state) => {
        if (value) {
          overscreenTrigger = document.activeElement as HTMLElement
          return { overscreen: { ...state.overscreen, [slug]: value } }
        } else {
          if (overscreenTrigger) {
            overscreenTrigger.focus()
          }
          return { overscreen: { ...state.overscreen, [slug]: value } }
        }
      }),
    showButtons: true,
    setShowButtons: (showButtons) => set(() => ({ showButtons })),
    hideActions: false,
    setHideActions: (hideActions) => set(() => ({ hideActions })),
  }
})
