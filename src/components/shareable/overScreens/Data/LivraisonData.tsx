import useParamContext from 'src/providers/ParamProvider'
import { LivraisonType } from 'components/outils/livraison/Type'
import Dropdown from 'components/base/Dropdown'
import Link from 'components/base/buttons/Link'
import styles from './Data.module.css'
import LivraisonEquivalents from './LivraisonEquivalents'

const FRLivraisonData = () => {
  return (
    <>
      <div className={styles.content}>
        <p>
          Nos calculs et hypothèses s’appuient sur les données{' '}
          <Link href='https://infos.ademe.fr/article-magazine/limpact-environnemental-du-commerce-en-ligne'>
            de l’étude de l’ADEME sur les impacts environnementaux du commerce en ligne
          </Link>
          . Nous utilisons les facteurs d’émission issus de la{' '}
          <Link href='https://base-empreinte.ademe.fr/donnees/jeu-donnees'>Base Empreinte</Link> dans nos analyses.
        </p>
      </div>
      <h2 className={styles.title}>Détail des scénarios par objet</h2>
      <div className={styles.content}>
        <p>
          Voici le détail des données utilisées dans le calcul des scénarios d’achat, pour chacun des objets proposés
          dans le simulateur :
        </p>
        <ul>
          <Dropdown title='Courses alimentaires' className={styles.dropdown}>
            <p>
              Les courses alimentaires incluent une sélection d’aliments secs non-frais comme des pâtes, du riz, des
              lentilles, de la farine, des huiles, du sucre, de la pâte à tartiner, du café, des cookies, des
              madeleines, ainsi que des boissons comme du soda et de l’eau minérale.
            </p>
            <LivraisonEquivalents slug={LivraisonType.Courses} />
          </Dropdown>
          <Dropdown title='Paires de chaussure' className={styles.dropdown}>
            <LivraisonEquivalents slug={LivraisonType.Chaussure} />
          </Dropdown>
          <Dropdown title='Livre' className={styles.dropdown}>
            <LivraisonEquivalents slug={LivraisonType.Livre} />
          </Dropdown>
          <Dropdown title='Micro-ondes' className={styles.dropdown}>
            <LivraisonEquivalents slug={LivraisonType.MicroOndes} />
          </Dropdown>
          <Dropdown title='Commande de vêtements' className={styles.dropdown}>
            <p>La commande de vêtements comprend quatre t-shirts, un jean et un manteau.</p>
            <LivraisonEquivalents slug={LivraisonType.Vetements} />
          </Dropdown>
          <Dropdown title='Lave-linge' className={styles.dropdown}>
            <LivraisonEquivalents slug={LivraisonType.LaveLinge} />
          </Dropdown>
          <Dropdown title='Lit complet' className={styles.dropdown}>
            <LivraisonEquivalents slug={LivraisonType.Lit} />
          </Dropdown>
          <Dropdown title='Smartphone' className={styles.dropdown}>
            <LivraisonEquivalents slug={LivraisonType.Smartphone} />
          </Dropdown>
          <Dropdown title='Caisse de vin' className={styles.dropdown}>
            <LivraisonEquivalents slug={LivraisonType.Vin} />
          </Dropdown>
          <Dropdown title='Cafetière Expresso' className={styles.dropdown}>
            <LivraisonEquivalents slug={LivraisonType.Cafetiere} />
          </Dropdown>
        </ul>
      </div>
      <h2 className={styles.title}>Parcours d’un colis</h2>
      <div className={styles.content}>
        <p>
          L'impact carbone d'un colis est déterminé par l'ensemble des étapes de son parcours logistique, depuis la
          commande jusqu'à la récupération par le consommateur.
        </p>
        <p>
          Dans le simulateur, ces étapes logistiques (1,2 et 3) sont prises en compte dans le calcul de l'impact de
          chaque scénario, dans la partie <b>Logistique / Livraison</b>.
        </p>
        <ul>
          <Dropdown title='1. Commande & Préparation' className={styles.dropdown}>
            <p>
              L’achat en magasin commence par le déplacement tandis que tout achat en ligne commence par la navigation.
            </p>
            <ul className={styles.list}>
              <li>
                <b>Processus de commande</b>: qu’il s’agisse d’un achat courant ou réfléchi, la navigation en ligne
                ainsi que la fabrication des équipements numériques impliquent une consommation d’énergie et de
                ressources.
              </li>
              <li>
                <b>Emballage</b>: La typologie et la taille de l'emballage utilisé (carton, papier bulle, plastique)
                contribuent à l’impact carbone global du colis.
              </li>
            </ul>
          </Dropdown>
          <Dropdown title='2. Stockage & Transit' className={styles.dropdown}>
            <ul className={styles.list}>
              <li>
                <b>Infrastructure</b> : une part de la construction des infrastructures et des énergies utilisées
                (électricité, gaz) est attribuée au colis stocké/en transit.
              </li>
              <li>
                Cette part est calculée en fonction de la surface occupée (m²) qu’il y occupe et de la durée de stockage
                ou de transit (en jours).
              </li>
            </ul>
          </Dropdown>
          <Dropdown title='3. Transport' className={styles.dropdown}>
            <ul className={styles.list}>
              <li>
                <b>Acheminement</b> : - le colis est d’abord transporté en *poids lourd moyen* ****entre l’entrepôt et
                le centre de distribution, puis en *véhicule utilitaire léger* jusqu’au magasin ou au point de relais.
              </li>
              <li>
                L’impact carbone du transport intègre également la construction des infrastructures routières, la
                fabrication des véhicules et la consommation de carburant, répartie selon le poids (kg) et le volume
                (m³) des colis.
              </li>
            </ul>
          </Dropdown>
          <Dropdown title='4. Mon déplacement' className={styles.dropdown}>
            <ul className={styles.list}>
              <li>
                <b>Achat en magasin - Click & Collect</b> : La distance moyenne par défaut entre le domicile et le
                magasin est fixée à 1,5 km à pied et 15 km en voiture. Le calcul prend en compte l’aller-retour, soit
                une distance multipliée par deux. Il vous est possible d’ajuster cette distance pour chaque scénario.
              </li>
              <li>
                <b>Livraison en point relais</b> : La distance moyenne par défaut entre le domicile et le point relais
                est de 1,5 km à pied et 3,5 km en voiture. L’aller-retour est également pris en compte, doublant ainsi
                la distance. Vous pouvez modifier cette valeur selon le scénario.
              </li>
            </ul>
          </Dropdown>
          <Dropdown title='5. Fabrication' className={styles.dropdown}>
            <ul className={styles.list}>
              <li>
                La phase de fabrication inclut l’extraction des matières premières, leur transformation et l’assemblage
                des différents composants. Pour obtenir une estimation complète de l’impact de votre colis, vous pouvez
                ajouter cette option.
              </li>
            </ul>
          </Dropdown>
        </ul>
      </div>
      <h2 className={styles.title}>Modes de livraison : les spécificités</h2>
      <div className={styles.content}>
        <p>
          L’impact de chaque mode de livraison repose sur le schéma logistique en amont et le moyen de déplacement
          utilisé pour récupérer le colis.
        </p>
        <ul>
          <Dropdown title='Achat en magasin' className={styles.dropdown}>
            <p>
              Les articles stockés initialement en entrepôt transitent vers une <b>plateforme de groupage</b>, puis un{' '}
              <b>centre de distribution</b> avant d’être expédiés et mis en rayon <b>en magasin</b>.
            </p>
          </Dropdown>
          <Dropdown title='Livraison à domicile' className={styles.dropdown}>
            <p>
              Une fois la commande reçue, le colis est préparé et emballé dans <b>l’entrepôt</b>. Il suit ensuite le
              même itinéraire logistique <b>plateforme de groupage, centre de distribution)</b> avant d’être acheminé au
              domicile du consommateur. La livraison à domicile implique des trajets plus longs pour le véhicule
              utilitaire lors de <b>la tournée de livraison</b>.
            </p>
          </Dropdown>
          <Dropdown title='Livraison en point relais' className={styles.dropdown}>
            <p>
              Le colis suit le même circuit que pour la livraison à domicile, mais son trajet s’arrête au point relais.
            </p>
          </Dropdown>
          <Dropdown title='Livraison en Click & Collect' className={styles.dropdown}>
            <p>
              Les articles, stockés en entrepôt, suivent le même parcours que pour un achat en magasin (plateforme de
              groupage, centre de distribution, magasin). Après réception de la commande, le colis est préparé et
              emballé dans <b>le magasin</b>.
            </p>
          </Dropdown>
        </ul>
      </div>
    </>
  )
}

const ESLivraisonData = () => {
  return (
    <>
      <div className={styles.content}>
        <p>
          Nuestros cálculos y suposiciones se basan en los datos de{' '}
          <Link href='https://infos.ademe.fr/article-magazine/limpact-environnemental-du-commerce-en-ligne'>
            el estudio de ADEME sobre los impactos ambientales del comercio en línea
          </Link>
          . Utilizamos los factores de emisión de la{' '}
          <Link href='https://base-empreinte.ademe.fr/donnees/jeu-donnees'>Base Empreinte</Link> en nuestros análisis.
        </p>
      </div>
      <h2 className={styles.title}>Detalle de los escenarios por objeto</h2>
      <div className={styles.content}>
        <p>
          Aquí están los detalles de los datos utilizados en el cálculo de los escenarios de compra, para cada uno de
          los objetos propuestos en el simulador:
        </p>
        <ul>
          <Dropdown title='Compras de alimentos' className={styles.dropdown}>
            <p>
              Las compras de alimentos incluyen una selección de alimentos secos no frescos como pasta, arroz, lentejas,
              harina, aceites, azúcar, crema de cacao, café, galletas, magdalenas, así como bebidas como refrescos y
              agua mineral.
            </p>
            <LivraisonEquivalents slug={LivraisonType.Courses} />
          </Dropdown>
          <Dropdown title='Pares de zapatos' className={styles.dropdown}>
            <LivraisonEquivalents slug={LivraisonType.Chaussure} />
          </Dropdown>
          <Dropdown title='Libro' className={styles.dropdown}>
            <LivraisonEquivalents slug={LivraisonType.Livre} />
          </Dropdown>
          <Dropdown title='Microondas' className={styles.dropdown}>
            <LivraisonEquivalents slug={LivraisonType.MicroOndes} />
          </Dropdown>
          <Dropdown title='Pedido de ropa' className={styles.dropdown}>
            <p>El pedido de ropa incluye cuatro camisetas, un jean y un abrigo.</p>
            <LivraisonEquivalents slug={LivraisonType.Vetements} />
          </Dropdown>
          <Dropdown title='Lavadora' className={styles.dropdown}>
            <LivraisonEquivalents slug={LivraisonType.LaveLinge} />
          </Dropdown>
          <Dropdown title='Cama completa' className={styles.dropdown}>
            <LivraisonEquivalents slug={LivraisonType.Lit} />
          </Dropdown>
          <Dropdown title='Smartphone' className={styles.dropdown}>
            <LivraisonEquivalents slug={LivraisonType.Smartphone} />
          </Dropdown>
          <Dropdown title='Caja de vino' className={styles.dropdown}>
            <LivraisonEquivalents slug={LivraisonType.Vin} />
          </Dropdown>
          <Dropdown title='Cafetera Expresso' className={styles.dropdown}>
            <LivraisonEquivalents slug={LivraisonType.Cafetiere} />
          </Dropdown>
        </ul>
      </div>
      <h2 className={styles.title}>Recorrido de un paquete</h2>
      <div className={styles.content}>
        <p>
          El impacto de carbono de un paquete está determinado por todas las etapas de su recorrido logístico, desde el
          pedido hasta la recogida por parte del consumidor.
        </p>
        <p>
          En el simulador, estas etapas logísticas (1, 2 y 3) se tienen en cuenta en el cálculo del impacto de cada
          escenario, en la parte <b>Logística / Entrega</b>.
        </p>
        <ul>
          <Dropdown title='1. Pedido y Preparación' className={styles.dropdown}>
            <p>
              La compra en tienda comienza con el desplazamiento, mientras que toda compra en línea comienza con la
              navegación.
            </p>
            <ul className={styles.list}>
              <li>
                <b>Proceso de pedido</b>: ya sea una compra habitual o reflexiva, la navegación en línea y la
                fabricación de equipos digitales implican un consumo de energía y recursos.
              </li>
              <li>
                <b>Embalaje</b>: La tipología y el tamaño del embalaje utilizado (cartón, papel burbuja, plástico)
                contribuyen al impacto de carbono global del paquete.
              </li>
            </ul>
          </Dropdown>
          <Dropdown title='2. Almacenamiento y Tránsito' className={styles.dropdown}>
            <ul className={styles.list}>
              <li>
                <b>Infraestructura</b>: una parte de la construcción de infraestructuras y de las energías utilizadas
                (electricidad, gas) se atribuye al paquete almacenado/en tránsito.
              </li>
              <li>
                Esta parte se calcula en función de la superficie ocupada (m²) y del tiempo de almacenamiento o tránsito
                (en días).
              </li>
            </ul>
          </Dropdown>
          <Dropdown title='3. Transporte' className={styles.dropdown}>
            <ul className={styles.list}>
              <li>
                <b>Transporte</b>: el paquete se transporta primero en un *camión de carga media* desde el almacén hasta
                el centro de distribución, y luego en un *vehículo utilitario ligero* hasta la tienda o el punto de
                recogida.
              </li>
              <li>
                El impacto de carbono del transporte también incluye la construcción de infraestructuras viales, la
                fabricación de vehículos y el consumo de combustible, distribuido según el peso (kg) y el volumen (m³)
                de los paquetes.
              </li>
            </ul>
          </Dropdown>
          <Dropdown title='4. Mi desplazamiento' className={styles.dropdown}>
            <ul className={styles.list}>
              <li>
                <b>Compra en tienda - Click & Collect</b>: La distancia media por defecto entre el domicilio y la tienda
                es de 1,5 km a pie y 15 km en coche. El cálculo tiene en cuenta el viaje de ida y vuelta, por lo que la
                distancia se multiplica por dos. Es posible ajustar esta distancia para cada escenario.
              </li>
              <li>
                <b>Entrega en punto de recogida</b>: La distancia media por defecto entre el domicilio y el punto de
                recogida es de 1,5 km a pie y 3,5 km en coche. El viaje de ida y vuelta también se tiene en cuenta,
                duplicando así la distancia. Puede modificar este valor según el escenario.
              </li>
            </ul>
          </Dropdown>
          <Dropdown title='5. Fabricación' className={styles.dropdown}>
            <ul className={styles.list}>
              <li>
                La fase de fabricación incluye la extracción de materias primas, su transformación y el ensamblaje de
                los diferentes componentes. Para obtener una estimación completa del impacto de su paquete, puede
                agregar esta opción.
              </li>
            </ul>
          </Dropdown>
        </ul>
      </div>
      <h2 className={styles.title}>Modos de entrega: especificidades</h2>
      <div className={styles.content}>
        <p>
          El impacto de cada modo de entrega se basa en el esquema logístico anterior y en el medio de transporte
          utilizado para recoger el paquete.
        </p>
        <ul>
          <Dropdown title='Compra en tienda' className={styles.dropdown}>
            <p>
              Los artículos almacenados inicialmente en el almacén transitan hacia una <b>plataforma de agrupación</b>,
              luego a un <b>centro de distribución</b> antes de ser enviados y puestos en estanterías{' '}
              <b>en la tienda</b>.
            </p>
          </Dropdown>
          <Dropdown title='Entrega a domicilio' className={styles.dropdown}>
            <p>
              Una vez recibido el pedido, el paquete se prepara y embala en <b>el almacén</b>. Luego sigue la misma ruta
              logística <b>plataforma de agrupación, centro de distribución</b> antes de ser entregado en el domicilio
              del consumidor. La entrega a domicilio implica viajes más largos para el vehículo utilitario durante{' '}
              <b>la ruta de entrega</b>.
            </p>
          </Dropdown>
          <Dropdown title='Entrega en punto de recogida' className={styles.dropdown}>
            <p>
              El paquete sigue el mismo circuito que para la entrega a domicilio, pero su viaje termina en el punto de
              recogida.
            </p>
          </Dropdown>
          <Dropdown title='Entrega en Click & Collect' className={styles.dropdown}>
            <p>
              Los artículos, almacenados en el almacén, siguen el mismo recorrido que para una compra en tienda
              (plataforma de agrupación, centro de distribución, tienda). Después de recibir el pedido, el paquete se
              prepara y embala en <b>la tienda</b>.
            </p>
          </Dropdown>
        </ul>
      </div>
    </>
  )
}

const ENLivraisonData = () => {
  return (
    <>
      <div className={styles.content}>
        <p>
          Our calculations and assumptions are based on data from{' '}
          <Link href='https://infos.ademe.fr/article-magazine/limpact-environnemental-du-commerce-en-ligne'>
            the ADEME study on the environmental impacts of online commerce
          </Link>
          . We use emission factors from the{' '}
          <Link href='https://base-empreinte.ademe.fr/donnees/jeu-donnees'>Base Empreinte</Link> in our analyses.
        </p>
      </div>
      <h2 className={styles.title}>Scenario details by object</h2>
      <div className={styles.content}>
        <p>
          Here are the details of the data used in the calculation of purchase scenarios, for each of the objects
          proposed in the simulator:
        </p>
        <ul>
          <Dropdown title='Grocery shopping' className={styles.dropdown}>
            <p>
              Grocery shopping includes a selection of non-perishable dry foods such as pasta, rice, lentils, flour,
              oils, sugar, chocolate spread, coffee, cookies, madeleines, as well as beverages like soda and mineral
              water.
            </p>
            <LivraisonEquivalents slug={LivraisonType.Courses} />
          </Dropdown>
          <Dropdown title='Pairs of shoes' className={styles.dropdown}>
            <LivraisonEquivalents slug={LivraisonType.Chaussure} />
          </Dropdown>
          <Dropdown title='Book' className={styles.dropdown}>
            <LivraisonEquivalents slug={LivraisonType.Livre} />
          </Dropdown>
          <Dropdown title='Microwave' className={styles.dropdown}>
            <LivraisonEquivalents slug={LivraisonType.MicroOndes} />
          </Dropdown>
          <Dropdown title='Clothing order' className={styles.dropdown}>
            <p>The clothing order includes four t-shirts, a pair of jeans, and a coat.</p>
            <LivraisonEquivalents slug={LivraisonType.Vetements} />
          </Dropdown>
          <Dropdown title='Washing machine' className={styles.dropdown}>
            <LivraisonEquivalents slug={LivraisonType.LaveLinge} />
          </Dropdown>
          <Dropdown title='Complete bed' className={styles.dropdown}>
            <LivraisonEquivalents slug={LivraisonType.Lit} />
          </Dropdown>
          <Dropdown title='Smartphone' className={styles.dropdown}>
            <LivraisonEquivalents slug={LivraisonType.Smartphone} />
          </Dropdown>
          <Dropdown title='Case of wine' className={styles.dropdown}>
            <LivraisonEquivalents slug={LivraisonType.Vin} />
          </Dropdown>
          <Dropdown title='Espresso coffee maker' className={styles.dropdown}>
            <LivraisonEquivalents slug={LivraisonType.Cafetiere} />
          </Dropdown>
        </ul>
      </div>
      <h2 className={styles.title}>Package journey</h2>
      <div className={styles.content}>
        <p>
          The carbon impact of a package is determined by all the stages of its logistical journey, from the order to
          the consumer's collection.
        </p>
        <p>
          In the simulator, these logistical stages (1, 2, and 3) are taken into account in the calculation of the
          impact of each scenario, in the <b>Logistics / Delivery</b> section.
        </p>
        <ul>
          <Dropdown title='1. Order & Preparation' className={styles.dropdown}>
            <p>In-store purchase begins with the trip, while any online purchase begins with browsing.</p>
            <ul className={styles.list}>
              <li>
                <b>Order process</b>: whether it is a routine or considered purchase, online browsing and the
                manufacture of digital equipment involve energy and resource consumption.
              </li>
              <li>
                <b>Packaging</b>: The type and size of packaging used (cardboard, bubble wrap, plastic) contribute to
                the overall carbon impact of the package.
              </li>
            </ul>
          </Dropdown>
          <Dropdown title='2. Storage & Transit' className={styles.dropdown}>
            <ul className={styles.list}>
              <li>
                <b>Infrastructure</b>: a portion of the construction of infrastructures and the energies used
                (electricity, gas) is attributed to the stored/in-transit package.
              </li>
              <li>
                This portion is calculated based on the occupied surface area (m²) and the storage or transit duration
                (in days).
              </li>
            </ul>
          </Dropdown>
          <Dropdown title='3. Transport' className={styles.dropdown}>
            <ul className={styles.list}>
              <li>
                <b>Transport</b>: the package is first transported by *medium heavy truck* from the warehouse to the
                distribution center, then by *light utility vehicle* to the store or pickup point.
              </li>
              <li>
                The carbon impact of transport also includes the construction of road infrastructures, the manufacture
                of vehicles, and fuel consumption, distributed according to the weight (kg) and volume (m³) of the
                packages.
              </li>
            </ul>
          </Dropdown>
          <Dropdown title='4. My trip' className={styles.dropdown}>
            <ul className={styles.list}>
              <li>
                <b>In-store purchase - Click & Collect</b>: The default average distance between home and the store is
                set at 1.5 km on foot and 15 km by car. The calculation takes into account the round trip, so the
                distance is doubled. You can adjust this distance for each scenario.
              </li>
              <li>
                <b>Pickup point delivery</b>: The default average distance between home and the pickup point is 1.5 km
                on foot and 3.5 km by car. The round trip is also taken into account, doubling the distance. You can
                modify this value according to the scenario.
              </li>
            </ul>
          </Dropdown>
          <Dropdown title='5. Manufacturing' className={styles.dropdown}>
            <ul className={styles.list}>
              <li>
                The manufacturing phase includes the extraction of raw materials, their transformation, and the assembly
                of the various components. To get a complete estimate of the impact of your package, you can add this
                option.
              </li>
            </ul>
          </Dropdown>
        </ul>
      </div>
      <h2 className={styles.title}>Delivery modes: specifics</h2>
      <div className={styles.content}>
        <p>
          The impact of each delivery mode is based on the upstream logistics scheme and the means of transport used to
          collect the package.
        </p>
        <ul>
          <Dropdown title='In-store purchase' className={styles.dropdown}>
            <p>
              Items initially stored in the warehouse transit to a <b>grouping platform</b>, then a{' '}
              <b>distribution center</b> before being shipped and shelved <b>in the store</b>.
            </p>
          </Dropdown>
          <Dropdown title='Home delivery' className={styles.dropdown}>
            <p>
              Once the order is received, the package is prepared and packed in <b>the warehouse</b>. It then follows
              the same logistical route <b>(grouping platform, distribution center)</b> before being delivered to the
              consumer's home. Home delivery involves longer trips for the utility vehicle during{' '}
              <b>the delivery route</b>.
            </p>
          </Dropdown>
          <Dropdown title='Pickup point delivery' className={styles.dropdown}>
            <p>The package follows the same circuit as for home delivery, but its journey ends at the pickup point.</p>
          </Dropdown>
          <Dropdown title='Click & Collect delivery' className={styles.dropdown}>
            <p>
              Items, stored in the warehouse, follow the same route as for an in-store purchase (grouping platform,
              distribution center, store). After receiving the order, the package is prepared and packed in{' '}
              <b>the store</b>.
            </p>
          </Dropdown>
        </ul>
      </div>
    </>
  )
}

const LivraisonData = () => {
  const { language } = useParamContext()
  if (language === 'en') {
    return <ENLivraisonData />
  }
  if (language === 'es') {
    return <ESLivraisonData />
  }

  return <FRLivraisonData />
}
export default LivraisonData
