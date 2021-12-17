import Dashboard from './Dashboard'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { StylesProvider } from '@mui/styles';
import { render } from "react-dom";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { BrowserRouter } from "react-router-dom"

const theme = createTheme();
export const muiCache = createCache({
    "key": "mui",
    "prepend": true,
});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CacheProvider value={muiCache}>
          <ThemeProvider theme={theme}>
              <Dashboard />
          </ThemeProvider>
        </CacheProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
