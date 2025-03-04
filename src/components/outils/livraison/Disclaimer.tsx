import IframeableLink from 'components/base/IframeableLink'
import styles from './Disclaimer.module.css'

const Disclaimer = ({ animated, id }: { animated?: boolean; id: string }) => {
  return (
    <div className={styles.container} id={`etiquette-${id}-disclaimer`}>
      {animated ? (
        <div>
          <p>
            Scénarios moyens, basés sur la livraison d’un colis de 1 kg, commandé en 54 minutes et emballé dans un
            carton de 468 g.
          </p>
          <IframeableLink className={styles.link} href='/outils/livraison'>
            Accéder au simulateur Impact Livraison{' '}
          </IframeableLink>
        </div>
      ) : (
        <div>
          <p>
            Le calcul de l’impact de la logistique / livraison est ici basé sur des moyennes, mais il n’existe pas de
            colis standard en termes de poids ou de dimensions. Le poids, le volume, l’emballage utilisé, le mode de
            transport et la distance parcourue par le colis influencent son impact carbone.
          </p>
          <br />
          <p>
            Les résultats présentés sont basés sur la livraison d’un colis de <b>1kg</b>, commandé en <b>54 minutes</b>{' '}
            et emballé dans <b>un carton de 468g</b>.
          </p>
          <br />
          <p>
            Ce colis suit plusieurs étapes d’acheminement : le transport en poids lourd moyen entre les lieux de
            stockage et de transit, puis la livraison finale en véhicule utilitaire moyen. Ces étapes ainsi que le
            déplacement du consommateur pour récupérer le colis détermineront son impact final.
          </p>
          <br />
          <p>
            Afin d’ajuster les paramètres et explorer les données plus en détail, vous pouvez{' '}
            <IframeableLink className={styles.link} href='/outils/livraison'>
              utiliser le simulateur Impact Livraison
            </IframeableLink>
          </p>
        </div>
      )}
    </div>
  )
}

export default Disclaimer
