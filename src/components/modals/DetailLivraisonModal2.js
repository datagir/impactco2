import MagicLink from "components/base/MagicLink";
import Modal2 from "components/base/Modal2";
import ModalContext from "components/providers/ModalProvider";
import React, { useContext } from "react";
import styled from "styled-components";

const Title = styled.h2``;

const DetailsTitle = styled.h4`
  cursor: pointer;
  display: inline;
`;

export default function DetailLivraisonModal2() {
  const getTitle = () => {
    return <Title>Les hypothèses retenues</Title>;
  };
  const { hypothesisLivraison: open, setHypothesisLivraison: setOpen } = useContext(ModalContext);
  return (
    <Modal2 open={open} setOpen={setOpen} getTitle={getTitle} width={"80em"}>
      <p>
        L'ensemble des calculs sont issus de{" "}
        <MagicLink to="https://librairie.ademe.fr/mobilite-et-transport/6261-e-commerce-modelisation-des-impacts-et-recommandations-filieres-et-grand-public.html">
          l’étude Commerce en ligne - 2023
        </MagicLink>{" "}
        à destination des professionels du E-commerce. L'outil ECEL à l'origine des calculs de cette étude a été adapté
        au contexte des particuliers sous forme de simulateur.
      </p>
      <h3>Les différents type de produits</h3>
      <p>
        L'<b>habillement</b> correspond à un produit textile qui va de la paire de chaussures, au manteau en passant par
        le t-shirt. Par défaut, nous considérons une <b>boite à chaussures</b>. Les <b>produits culturels</b>{" "}
        correspondent aux livres, jeux de société, CD/vinyles, jeux vidéos, etc. Par défaut, nous considérons un{" "}
        <b>livre</b>. Les <b>équipements volumineux</b> correspondent aux gros électroménagers, l'ameublement, etc. Par
        défaut, nous considérons un <b>lave-vaisselle</b>.Pour <b>les produits de grande consommation</b>, nous avons
        considéré un carton de <b>produits secs de supermarchés</b>.
      </p>
      <h3>Les scénarios de livraison</h3>
      <p>
        Dans cette première version, 3 scénarios sont proposés: la livraison{" "}
        <b> à domicile, en point relais ou en click & collect</b>, tous adaptables à l'option{" "}
        <b>"colis qui vient de loin"</b>.
      </p>
      <p>
        Pour chaque scénario, nous prenons en compte l'<b>ensemble des étapes d'un processus de livraison</b> : commande
        en ligne, emballage, entrepôt de stockage, plateformes de tri, transport inter-platerformes, l'infrastruture de
        collecte, et enfin, le déplacement consommateur dans le cas d'une livraison en point relais ou click & collect (
        <i>Voir ci-dessous pour le détail des processus de livraison</i>). Pour un article <b>"qui vient de loin"</b>,
        nous avons fait l'hypothèse que le colis arrive <b>par avion depuis la Chine</b> via une étape de transport
        supplémentaire (9000km parcourus par avion, mix électrique de l'entrepôt de départ adapté).{" "}
      </p>
      <h3>Des informations supplémentaires sur les paramètres...</h3>
      <p>
        Pour le processus de <b>commande en ligne</b>, le type de produit impacte le temps de recherche web et donc
        l'empreinte de l'utilisation du terminal pour effectuer effectuer l'achat. On conserve donc une valeur unique
        (5,4 gCO2e) par commande quel que soit le produit.
      </p>
      <p>
        Un <b>emballage carton</b> a été attribué à chaque type de colis selon sa taille.
      </p>
      <p>
        Pour les étapes de <b>stockage</b> en entrepôt, on considère un entrepôt de 10 000 m2. Le nombre de jour de
        stockage dépend du type de produit.
      </p>
      <p>
        En ce qui concerne les <b>camions de livraison</b>, pour le transport longue distance, nous avons considéré un
        poids lourd moyen (type 44 tonnes) tandis que pour les derniers kilomètres de livraison, nous avons considéré un
        véhicule utilisaire léger.{" "}
      </p>
      <h3>Le détails des processus</h3>
      <details>
        <summary>
          <DetailsTitle>Livraison à domicile</DetailsTitle>
        </summary>
        <ul>
          <li>Processus de commande en ligne</li>
          <li>
            Entrepôt initial de stockage et de préparation du colis (emballé et stocké entre 15 et 40 jours dans un
            entrepôt de 10000 m2)
          </li>
          <li>
            Transport entrepôt - plateforme 1: 400 km (poids lourd moyen, taux de remplissage de 15% et un taux de
            retour à vide de 20% roulant à une vitesse moyenne de 60 km/h)
          </li>
          <li>Plateforme 1</li>
          <li>
            Transport plateforme 1 - plateforme 2: 400 km (poids lourd moyen, taux de remplissage de 15% et un taux de
            retour à vide de 20% roulant à une vitesse moyenne de 60 km/h)
          </li>
          <li>Plateforme 2</li>
          <li>
            Transport plateforme 2 - domicile: 70 km (VUL, taux de remplissage de 15% et un taux de retour à vide de 20%
            roulant à une vitesse moyenne de 30 km/h)
          </li>
        </ul>
      </details>
      <details>
        <summary>
          <DetailsTitle>Livraison en point relais</DetailsTitle>
        </summary>
        <ul>
          <li>Processus de commande en ligne</li>
          <li>Entrepôt initial de stockage et de préparation du colis</li>
          <li>
            Transport entrepôt - plateforme 1: 400 km (poids lourd moyen, taux de remplissage de 15% et un taux de
            retour à vide de 20% roulant à une vitesse moyenne de 60 km/h)
          </li>
          <li>Plateforme 1</li>
          <li>
            Transport plateforme 1 - plateforme 2: 400 km (poids lourd moyen, taux de remplissage de 15% et un taux de
            retour à vide de 20% roulant à une vitesse moyenne de 60 km/h)
          </li>
          <li>Plateforme 2</li>
          <li>
            Transport plateforme 2 - point de retrait: 70 km (VUL, taux de remplissage de 15% et un taux de retour à
            vide de 20% roulant à une vitesse moyenne de 30 km/h)
          </li>
          <li>Point de retrait</li>
          <li>Déplacement consommateur</li>
        </ul>
      </details>
      <details>
        <summary>
          <DetailsTitle>Livraison en click & collect</DetailsTitle>
        </summary>
        <ul>
          <li>Processus de commande en ligne</li>
          <li>Entrepôt initial de stockage et de préparation du colis</li>
          <li>
            Transport entrepôt - plateforme 1: 400 km (poids lourd moyen, taux de remplissage de 15% et un taux de
            retour à vide de 20% roulant à une vitesse moyenne de 60 km/h)
          </li>
          <li>Plateforme 1</li>
          <li>
            Transport plateforme 1 - plateforme 2: 400 km (poids lourd moyen, taux de remplissage de 15% et un taux de
            retour à vide de 20% roulant à une vitesse moyenne de 60 km/h)
          </li>
          <li>Plateforme 2</li>
          <li>
            Transport plateforme 2 - magasin: 70 km (VUL, taux de remplissage de 15% et un taux de retour à vide de 20%
            roulant à une vitesse moyenne de 30 km/h)
          </li>
          <li>Magasin (stocké 28 jours dans une enseigne type "supermarchés" de 2000 m2)</li>
          <li>Déplacement consommateur</li>
        </ul>
      </details>
    </Modal2>
  );
}
