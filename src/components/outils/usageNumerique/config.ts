export const usageNumeriqueConfig = {
  email: {
    title: 'Emails envoyés',
    unit: 'email',
    mainTitle: 'Durée de la rédaction',
    mainUnit: 'minute',
    mainValue: 'email . terminaux . temps écriture',
    mainDivider: 1,
    secondTitle: 'Nombre de destinataires',
    secondUnit: 'personne',
    secondValue: 'email . destinataires',
    device: 'email . appareil',
    network: 'email . transmission . émetteur . réseau',
    type: 'email . taille',
    appareils: ['smartphone', 'tablette', 'ordinateur portable', 'ordinateur et écran'],
    types: [0.075, 1.075, 5.075],
    networks: ['fixe FR', 'mobile FR'],
  },
  visio: {
    title: 'Heures de visioconférence',
    unit: 'heure',
    mainTitle: 'Heures de visioconférence',
    mainUnit: 'heure',
    mainValue: 'visio . durée',
    mainDivider: 60,
    secondTitle: 'Nombre de participants',
    secondUnit: 'participant',
    secondValue: 'visio . emplacements',
    device: 'visio . appareil',
    network: 'visio . transmission . réseau',
    type: 'visio . qualité',
    appareils: ['smartphone', 'tablette', 'ordinateur portable', 'ordinateur et écran', 'TV'],
    types: ['audio', 'SD', 'HD'],
    networks: ['fixe FR', 'mobile FR'],
  },
  streaming: {
    title: 'Heures de streaming',
    unit: 'heure',
    mainTitle: 'Heures de streaming',
    mainUnit: 'heure',
    mainValue: 'streaming . durée',
    mainDivider: 60,
    secondTitle: '',
    secondUnit: '',
    secondValue: '',
    device: 'streaming . appareil',
    network: 'streaming . transmission . réseau',
    type: 'streaming . qualité',
    appareils: ['smartphone', 'tablette', 'ordinateur portable', 'ordinateur et écran', 'TV'],
    types: ['SD', 'HD', 'ultra HD'],
    networks: ['fixe FR', 'mobile FR'],
  },
}
