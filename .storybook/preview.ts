import { withThemeFromJSXProvider } from '@storybook/addon-themes'
import { Preview } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import { themes } from '../src/utils/styles'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export const decorators = [
  withThemeFromJSXProvider({
    themes,
    defaultTheme: 'default',
    Provider: ThemeProvider,
  }),
]

export default preview
