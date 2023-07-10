export const frequences = [
  { displayed: "semaine", uid: "par_semaine", mult: 1, baseNumber: 1, baseText: "par semaine" },
  { displayed: "mois", uid: "par_mois", mult: 4, baseNumber: 1, baseText: "par semaine" },
  { displayed: "an", uid: "par_an", mult: 12, baseNumber: 1, baseText: "par mois", isDefault: true },
];

export const produits = [
  {
    displayed: "Produits de grande consommation",
    uid: "consommation",
    publicode: "grande consommation",
  },
  {
    displayed: "Habillement",
    uid: "habillement",
    publicode: "habillement",
  },
  {
    displayed: "Produit culturel physique",
    uid: "culturel",
    publicode: "culturel",
  },
  {
    displayed: "Bien d'équipement volumineux",
    uid: "volumineux",
    publicode: "équipements volumineux",
  },
];

export const retraits = [
  { displayed: "Livraison à domicile", uid: "domicile", publicode: "domicile" },
  { displayed: "Point relais", uid: "relais", publicode: "point de retrait" },
  {
    displayed: "Click & collect",
    uid: "click",
    publicode: "click and collect",
  },
];

export const relays = [
  { displayed: "En voiture", uid: "voiture_thermique", publicode: "voiture thermique" },
  { displayed: "En voiture électrique", uid: "electricar", publicode: "voiture électrique" },
  { displayed: "Marche", uid: "marche", publicode: "marche" },
  { displayed: "En vélo", uid: "magasin", publicode: "vélo" },
  { displayed: "En vélo électrique", uid: "veloelectrique", publicode: "petit véhicule électrique" },
  { displayed: "En transport en commun", uid: "transport", publicode: "commun" },
];

export const trajs = [
  { displayed: "Domicile-Travail", uid: "dom_tra", publicode: "" },
  { displayed: "Point de retrait-domicile", uid: "ret_dom", publicode: "" },
  { displayed: "Domicile-magasin de proximité ", uid: "dom_mag", publicode: "" },
];
export const default_eqs = ["voiturethermique", "repasavecduboeuf", "streamingvideo"];
