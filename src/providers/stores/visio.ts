import { ASTNode, PublicodesExpression } from 'publicodes'
import { create } from 'zustand'
import { usageNumeriqueDefaultValues } from 'utils/usageNumerique'

interface VisioState {
  situation: Partial<Record<string, PublicodesExpression | ASTNode>>
  withConstruction: boolean
  setSituation: (situation: Partial<Record<string, PublicodesExpression | ASTNode>>) => void
  setWithConstruction: (withConstruction: boolean) => void
}

export const useVisioStore = create<VisioState>((set) => ({
  situation: { ...usageNumeriqueDefaultValues },
  withConstruction: false,
  setSituation: (situation) => set(() => ({ situation })),
  setWithConstruction: (withConstruction) => set(() => ({ withConstruction })),
}))
