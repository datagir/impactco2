import Card from 'components/base/Card'
import styles from 'components/misc/category/overScreens/Values.module.css'
import { CustomParamValue } from 'components/misc/shareable/overScreens/CustomParam'
import Integrate from 'components/misc/shareable/overScreens/Integrate'
import Share from 'components/misc/shareable/overScreens/Share'
import { OverScreenInfo } from 'components/misc/shareable/overScreens/Values'
import EquivalentsOverscreen from './EquivalentsOverscreen'
import { OverScreenComparateur, OverScreenEtiquette } from './Type'

export const overScreenEtiquetteValues: (params?: string) => Record<OverScreenEtiquette, OverScreenInfo> = (
  params
) => ({
  integrer: {
    title: 'integrate',
    children: (
      <>
        <Integrate path='comparateur/etiquette' extraParams={params} tracking='Comparateur' />
        <div className={styles.space} />
        <Card
          href='/guide-utilisation'
          title='Utiliser cette ressource'
          description='Vous souhaitez intégrer le simulateur à votre publication et découvrir des exemples concrets déjà créés par d’autres utilisateurs ?'
          link='Kit de diffusion'
          image='/images/laptop.png'
          trackingCategory='Comparateur'
          trackingAction='Blocs accompagnement'
        />
      </>
    ),
  },
})
export const overScreenComparateurValues: (
  onClose: () => void,
  params?: Record<string, CustomParamValue>
) => Record<OverScreenComparateur, OverScreenInfo> = (onClose) => ({
  partager: {
    title: 'share',
    children: <Share path='comparateur' />,
  },
  integrer: {
    title: 'integrate',
    children: (
      <>
        <Integrate path='comparateur' tracking='Comparateur' />
        <div className={styles.space} />
        <Card
          href='/guide-utilisation'
          title='Utiliser cette ressource'
          description='Vous souhaitez intégrer le simulateur à votre publication et découvrir des exemples concrets déjà créés par d’autres utilisateurs ?'
          link='Kit de diffusion'
          image='/images/laptop.png'
          trackingCategory='Comparateur'
          trackingAction='Blocs accompagnement'
        />
      </>
    ),
  },
  equivalents: {
    title: 'todo',
    children: <EquivalentsOverscreen onClose={onClose} />,
  },
})
