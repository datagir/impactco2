import React, { ReactNode, useContext, useMemo } from 'react'
import styled from 'styled-components'
import { Category } from 'types/category'
import ModalContext from 'components/providers/ModalProvider'
import ButtonLink from 'components/base/ButtonLink'
import { Section, SectionWideContent } from 'components/base/Section'

const Strong = styled.p`
  font-size: 1.5rem;
  font-style: italic;
  font-weight: bold;

  ${(props) => props.theme.mq.medium}  {
    font-size: 1.125rem;
  }
`

export default function Learning({ category }: { category: Category }) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: TODO
  const { setCo2e } = useContext<{ setCo2e: (open: boolean) => void }>(ModalContext)

  const learnings = useMemo<Record<string, ReactNode>>(
    () => ({
      repas: (
        <>
          <h2>Quel est l’impact sur le climat d'un repas&nbsp;?</h2>
          <Strong>
            Le quart des émissions de gaz à effet de serre en France provient de nos assiettes, c’est autant que le
            logement ou le transport&nbsp;!
          </Strong>
          <p>
            Un repas végétarien ou végétalien (0,5 et 0,4&thinsp;kg{' '}
            <ButtonLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </ButtonLink>
            ) a beacoup moins d'impact pour la planète qu’un repas avec du bœuf ou du poulet (7&thinsp;kg{' '}
            <ButtonLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </ButtonLink>{' '}
            et 1,6&thinsp;kg{' '}
            <ButtonLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </ButtonLink>
            ) ou encore avec du poisson (gras 1,1&thinsp;kg{' '}
            <ButtonLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </ButtonLink>{' '}
            et blanc 2&thinsp;kg{' '}
            <ButtonLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </ButtonLink>
            ). Il est donc préférable de manger des produits d'origine végétale pour protéger l’écosystème de la
            planète.
          </p>
        </>
      ),

      numerique: (
        <>
          <h2>Quel est l’impact sur le climat des appareils numériques&nbsp;?</h2>
          <Strong>
            L’empreinte carbone du secteur du numérique représente aujourd’hui 3 à 4% des émissions de gaz à effet de
            serre dans le monde et 2% de l’empreinte carbone à l’échelle nationale.
          </Strong>
          <p>
            La grande majorité de l'impact du numérique provient de la fabrication des smartphones, ordinateurs, et tous
            les dispositifs que nous achetons. Pour limiter l'impact du numérique, il est donc primordial de garder le
            plus longtemps possible nos équipements et de privilégier les appareils reconditionnés : tous les métaux et
            matériaux utilisés pour la fabrication repartent ainsi pour une nouvelle vie.
          </p>
        </>
      ),

      mobilier: (
        <>
          <h2>Quel est l'impact sur le climat du mobilier&nbsp;?</h2>
          <p>
            L'impact carbone d'un meuble comprenant la fabrication, la distribution et l’usage, peut aller de
            19&thinsp;kg d’émissions de{' '}
            <ButtonLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </ButtonLink>{' '}
            avec la chaise en bois, jusqu’à 907&thinsp;kg d’émissions de{' '}
            <ButtonLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </ButtonLink>{' '}
            avec l’armoire.
          </p>
        </>
      ),

      habillement: (
        <>
          <h2>Comment est calculé l’impact carbone des vêtements ?</h2>
          <p>
            Pour calculer l’impact carbone, on prend en compte les émissions de{' '}
            <ButtonLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </ButtonLink>{' '}
            à toutes les étapes de la vie du vêtement : depuis la production de matières premières (coton, laine,
            polyester…), en passant par sa fabrication, sa distribution dans des magasins ou en ligne, son utilisation
            et son entretien (lavage, séchage en machine).
          </p>
        </>
      ),

      transport: (
        <>
          <h2>Quel est l’impact sur le climat des déplacements&nbsp;?</h2>
          <Strong>
            Avec 30% des émissions de{' '}
            <ButtonLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </ButtonLink>
            , le secteur des transports est le 1er secteur émetteur de gaz à effet de serre.
          </Strong>
          <p>
            L’impact carbone d'un déplacement d'une distance de 10km peut aller de 0&thinsp;kg d’émission de{' '}
            <ButtonLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </ButtonLink>{' '}
            avec la marche ou le vélo, jusqu’à 2,2&thinsp;kg d’émissions de{' '}
            <ButtonLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </ButtonLink>{' '}
            avec une voiture thermique.
          </p>
        </>
      ),

      electromenager: (
        <>
          <h2>Quel est l'impact sur le climat d'un appareil électroménager&nbsp;?</h2>
          <p>
            L’impact carbone du secteur de l’électroménager comprenant la fabrication, la distribution et l’usage, peut
            aller de 41&thinsp;kg d’émissions de{' '}
            <ButtonLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </ButtonLink>{' '}
            avec une bouilloire, jusqu’à 513&thinsp;kg d’émissions de{' '}
            <ButtonLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </ButtonLink>{' '}
            avec le lave-linge.
          </p>
        </>
      ),

      chauffage: (
        <>
          <h2>Quel est l’impact sur le climat du chauffage d'un logement&nbsp;?</h2>
          <p>
            Que ce soit pour une maison ou un appartement, l’impact carbone du chauffage domestique par m2 et par année,
            peut aller de 3,7&thinsp;kg d’émissions de{' '}
            <ButtonLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </ButtonLink>{' '}
            avec le chauffage électrique, jusqu’à 53&thinsp;kg d’émissions de{' '}
            <ButtonLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </ButtonLink>{' '}
            avec le chauffage au fioul.
          </p>
        </>
      ),

      boisson: (
        <>
          <h2>Quel est l’impact sur le climat des boissons&nbsp;?</h2>
          <p>
            L’impact carbone des boissons peut aller de 0,0001&thinsp;kg d’émissions de{' '}
            <ButtonLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </ButtonLink>{' '}
            avec l’eau du robinet, comprenant l'impact de toute la gestion du réseau d'eau potable, jusqu’à
            1,5&thinsp;kg d’émissions de{' '}
            <ButtonLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </ButtonLink>{' '}
            avec le lait de vache. Pour les boissons embouteillées, les valeurs affichées comprennent l'impact de leur
            fabrication, de l'emballage, du transport, de toute la chaîne de distribution y compris les supermarchés.
          </p>
        </>
      ),

      usagenumerique: (
        <>
          <h2>Quel est l’impact sur le climat des usages numériques du quotidien&nbsp;?</h2>
          <Strong>
            L’empreinte carbone du secteur du numérique représente aujourd’hui 3 à 4% des émissions de gaz à effet de
            serre dans le monde et 2% de l’empreinte carbone à l’échelle nationale.
          </Strong>
          <p>
            La grande majorité de l'impact du numérique provient de la fabrication des smartphones, ordinateurs, et tous
            les dispositifs que nous achetons. L'impact carbone des mails va grandement varié selon la taille des pièces
            jointes et le nombre de destinataires, quand l'impact du streaming ou d'une visioconférence va varier selon
            la qualité de l'image. Enfin, la vidéo via 4G peut être jusqu'à 2 fois plus émétrice qu'avec une connexion
            Wifi.
          </p>
        </>
      ),

      fruitsetlegumes: (
        <>
          <h2>Quel est l’impact sur le climat des fruits et légumes&nbsp;?</h2>
          <Strong>
            Aujourd’hui 75% de Français déclarent consommer des tomates en hiver. Or une tomate produite hors saison
            présente une empreinte carbone bien plus élevée puisqu'elle génère 4 fois plus d’émissions de{' '}
            <ButtonLink onClick={() => setCo2e(true)}>
              CO<sub>2</sub>e
            </ButtonLink>{' '}
            que la même tomate produite durant la bonne saison.
          </Strong>
          <p>
            Afin de limiter ces émissions de gaz à effet de serre responsable du changement climatique, il est donc
            important de consommer les fruits & légumes du mois. Manger au moins 5 fruits et légumes par jour c’est bien
            pour la santé, mais s’ils sont de saison c’est encore mieux pour la planète et pour vos papilles !
          </p>
        </>
      ),
    }),
    [setCo2e]
  )

  return (
    <Section $theme='color'>
      <SectionWideContent>{learnings[category.slug]}</SectionWideContent>
    </Section>
  )
}
