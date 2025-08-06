import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';
import { Transactions } from './pages/transations';
import { TransactionProvider } from './contexts/Transactions';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

          <TransactionProvider>
              <Transactions />
          </TransactionProvider>

    </ThemeProvider>
  )
}
