import Image from 'next/image'

export const tools = [
  {
    slug: 'comparateur',
    title: 'Comparateur',
    description: 'Le bon outil pour obtenir les bons ordres de grandeur',
    linkLabel: 'Visualiser',
  },
  {
    slug: 'transport',
    title: 'Transports',
    description: 'Calculer l’impact carbone des moyens de transport',
    linkLabel: 'Essayer',
  },
  {
    slug: 'chauffage',
    title: 'Chauffage',
    description: 'Situer l’empreinte carbone des modes de chauffage',
    linkLabel: 'Calculer',
  },
  {
    slug: 'mobilier',
    title: 'Mobilier',
    description: 'Comparer l’impact carbone du mobilier',
    linkLabel: 'Visualiser',
  },
  {
    slug: 'repas',
    title: 'Alimentation',
    description: 'Comparer l’empreinte carbone des repas',
    linkLabel: 'Découvrir',
  },
  {
    slug: 'electromenager',
    title: 'Électroménager',
    description: 'Comparer l’impact carbone des appareils ménagers',
    linkLabel: 'Comparer',
  },
  {
    slug: 'fruitsetlegumes',
    title: 'Fruits et légumes',
    description: 'Découvrir les fruits et légumes de la saison et leur impact carbone',
    linkLabel: 'Visualiser',
  },
  {
    slug: 'habillement',
    title: 'Habillement',
    description: 'Comparer l’impact carbone des vêtements entre eux',
    linkLabel: 'Découvrir',
  },
  {
    slug: 'numerique',
    title: 'Numérique',
    description: 'Mesurer l’impact carbone des appareils numériques',
    linkLabel: 'Comparer',
  },
  {
    slug: 'boisson',
    title: 'Boisson',
    description: 'Comparer l’impact carbone des boissons',
    linkLabel: 'Comparer',
  },
  {
    slug: 'usagenumerique',
    title: 'Usage numérique',
    description: 'Évaluer l’impact carbone de vos usages numériques (streaming, visioconférence, email)',
    linkLabel: 'Visualiser',
  },
  {
    slug: 'livraison',
    title: 'Livraison',
    description: 'Simuler l’impact carbone de vos livraisons de colis',
    linkLabel: 'Découvrir',
  },
  {
    slug: 'teletravail',
    title: 'Télétravail',
    description: 'Mesurer les économies de carbone réalisées grâce au télétravail',
    linkLabel: 'Visualiser',
  },
]

export const smallTools = [
  {
    slug: 'etiquettes',
    title: 'Étiquettes',
    description: 'Le petit format pour communiquer les bons ordres de grandeur.',
    linkLabel: 'Découvrir',
    content: (
      <>
        <div>
          Dans le prolongement du comparateur carbone, Impact CO2 propose désormais une version compacte et facilement
          configurable : l'étiquette carbone.
        </div>
        <div>
          Elle permet de visualiser rapidement le poids carbone associé à des gestes et objets du quotidien et de les
          comparer entre eux, dans un format mini, idéal pour une communication percutante et ludique des ordres de
          grandeur.
        </div>
        <div>
          <b>
            Les étiquettes sont créées automatiquement lorsque vous utilisez le comparateur carbone, juste en dessous de
            ce dernier.
          </b>{' '}
          En faisant défiler la page du comparateur, vous pouvez retrouver votre comparaison au format étiquette et
          l’utiliser dans vos contenus et applications.
        </div>
      </>
    ),
    toolLink: '/comparateur#etiquette',
    toolLinkLabel: 'Créer mon étiquette avec le comparateur carbone',
  },
  {
    slug: 'detecteur',
    title: 'Détecteur CO₂',
    description: 'L’outil pratique pour mettre en lumière vos données carbone.',
    linkLabel: 'Découvrir',
    content: (
      <>
        <div>
          Impact CO2 lance le détecteur CO₂, un nouveau format innovant pour détecter et surligner automatiquement les
          mentions de données carbones dans vos contenus.
        </div>
        <div>
          Cet <b>outil gratuit</b>, simple d’utilisation et basé sur les données de l’ADEME a vocation à s’intégrer sur
          les sites internet de médias, d’entreprises ou d’associations pour{' '}
          <b>vulgariser les bons ordres de grandeur et remettre en perspective les données carbones.</b>
        </div>
        <div>Un exemple vaut mieux que mille mots ! Découvrez par vous-même 👇</div>
        <div>
          <b>
            L’Info Durable est le premier média spécialisé en développement durable à avoir intégré l’outil sur son site
            internet (plus de 45 000 articles en ligne !).
          </b>
        </div>
        <div>
          <Image src='/images/detecteur-co2.jpg' alt='' width={680} height={208} />
        </div>
      </>
    ),
    clipboardURL: '<script src="https://impactco2.fr/scripts/detection.js"></script>',
  },
  {
    slug: 'osez-changer',
    title: 'Défi chaussures',
    description: 'Compter vos chaussure et évaluer l’impact carbone de vos derniers achats',
    linkLabel: 'Découvrir',
    content: <>TODO</>,
    toolLink: 'TODO',
    toolLinkLabel: 'TODO',
  },
]

export const devTools = [
  {
    slug: 'api',
    title: 'API',
    description: 'Accéder facilement et gratuitement à des données carbone fiables.',
    linkLabel: 'Découvrir',
    content: (
      <>
        <div>
          Grâce à L’API Impact CO2, vous pouvez accéder aux données carbone utilisées sur Impact CO2 et dans toutes les
          ressources du site.
        </div>
        <div>
          Gratuite, personnalisable, et régulièrement mise à jour elle vous permet de vous emparer facilement des
          informations essentielles sur les émissions carbones de + de 200 objets et gestes du quotidien, et de les
          intégrer dans vos propres applications et contenus.
        </div>
        <div>
          Comme toute API, sa documentation s’adresse principalement aux développeurs. Nous vous conseillons ainsi de la
          partager avec votre équipe technique afin d’explorer les possibilités d’intégration au sein de vos contenus et
          applications.
        </div>
      </>
    ),
    toolLink: '/api-doc',
    toolLinkLabel: 'Accéder à la documentation de l’API',
  },
  {
    slug: 'npm',
    title: 'Package NPM',
    description: "Pour faciliter l'intégration de l’étiquette carbone.",
    linkLabel: 'Découvrir',
    content: (
      <>
        <div>
          Impact CO2 a développé à destination des développeurs des packages npm pour l’étiquette carbone, permettant
          d'intégrer facilement cette ressource dans le code source de leurs applications ou sites web.
        </div>
        <div>
          Cette solution simplifie et accélère l'intégration de notre outil pour tous les relais désireux de l'héberger
          sur leur site ou application native.
        </div>
      </>
    ),
    toolLink: 'https://www.npmjs.com/package/@incubateur-ademe/impactco2-react',
    toolLinkLabel: 'Accéder au package NPM',
  },
]
