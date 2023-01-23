import { createTheme, ThemeProvider } from "@material-ui/core";
import { useMemo } from "react";

import "./App.css";
import Mint from "./Mint";
import MainHome from "./MainHome";
import About from "./About";
import Roadmap from "./Roadmap";
import Faq from "./Faq";
import Header from "./Header";

import { Route, Routes } from "react-router";


const txTimeout = 30000; // milliseconds (confirm this works for your project)

const theme = createTheme({
    palette: {
        type: 'dark',
    },
    overrides: {
        MuiButtonBase: {
            root: {
                justifyContent: 'flex-start',
            },
        },
        MuiButton: {
            root: {
                textTransform: undefined,
                padding: '12px 16px',
            },
            startIcon: {
                marginRight: 8,
            },
            endIcon: {
                marginLeft: 8,
            },
        },
    },
});

const App = () => {
    // Custom RPC endpoint.

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.


  return (
      <ThemeProvider theme={theme}>
        <Header/>
        <Routes>  
          <Route path='/' element={<MainHome/>}></Route>
          <Route path='/About' element={<About/>}></Route>
          <Route path='/Roadmap' element={<Roadmap/>}></Route>
          <Route path='/Faq' element={<Faq/>}></Route>
          <Route path="/Mint" element = {<Mint />}>
          </Route>
        </Routes>
      </ThemeProvider>
  );
};

export default App;
