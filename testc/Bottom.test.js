import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { renderWithModal } from 'test-utils/render-with-modal'
import Bottom from 'components/misc/category/Bottom'

describe('Bottom - Texte et bouton affichés en bas de chaque thématique', () => {
  // See https://webtips.dev/how-to-mock-processenv-in-jest
  const env = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env, NEXT_PUBLIC_URL: 'https://example.com' }
  })

  afterEach(() => {
    process.env = env
  })

  test('Affiche un texte et un bouton par défaut', async () => {
    // When
    renderWithModal(<Bottom category={{ divider: 1 }} />)
    // Then
    expect(await screen.findByTestId('bottomText')).toBeInTheDocument()
    expect(await screen.findByTestId('bottomButton')).toBeInTheDocument()
  })
  test('Le texte affiche des kg si le diviseur vaut 1', async () => {
    // When
    renderWithModal(<Bottom category={{ divider: 1 }} />)
    // Then
    expect(await screen.findByTestId('bottomText')).toHaveTextContent('Valeurs exprimées en kg CO2e émis')
  })
  test('Le texte affiche des g si le diviseur ne vaut pas 1', async () => {
    // When
    renderWithModal(<Bottom category={{ divider: 22 }} />)
    // Then
    expect(await screen.findByTestId('bottomText')).toHaveTextContent('Valeurs exprimées en g CO2e émis')
  })
  test("Le bouton a bien le texte 'Voir toutes les thématiques'", async () => {
    // When
    renderWithModal(<Bottom category={{ divider: 1 }} />)
    // Then
    expect(await actionButton(screen)).toHaveTextContent('Voir toutes les thématiques')
  })
  test('Le bouton redirige bien vers /thematiques par défaut', async () => {
    // When
    renderWithModal(<Bottom category={{ divider: 1 }} />)
    // Then
    expect(await actionButton(screen)).toHaveAttribute('href', '/thematiques')
  })
  test('Le bouton redirige bien vers https://example.com/thematiques si la propriété iframe est présente', async () => {
    // When
    renderWithModal(<Bottom category={{ divider: 1 }} iframe />)
    // Then
    expect(await actionButton(screen)).toHaveAttribute('href', 'https://example.com/thematiques')
  })
})

async function actionButton(screen) {
  return (await screen.findByTestId('bottomButton')).querySelector('a')
}
