/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Helmet } from "react-helmet";
import { Login } from "./pages/Login/use-login";

import { GlobalStyle } from "./styles/globalStyles";
import { darkTheme, lightTheme } from "./styles/theme";
import {
  Configurations,
  Dash,
  Mapa,
  Previsao,
  Relatorios,
  User,
} from "./pages/RouterViewDashBoard/useRouterView";
import { Provider } from "react-redux";
import store from "./Redux/store";
// import ProtectedRoutes from './firebaseConfig/privateRouter';

type Tema = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

const default_values = {
  theme: "",
  setTheme: () => {},
};
export const ThemeContext = React.createContext<Tema>(default_values);

const Router: FC = () => {
  const [theme, setTheme] = useState("light");
  const themeStyle = theme === "dark" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <ThemeProvider theme={themeStyle}>
        <GlobalStyle />

        <Helmet>
          <title>Agro Future</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              {/* <Route element={<ProtectedRoutes />}> */}
              <Route path="/dashboard" element={<Dash />} />
              <Route path="/map" element={<Mapa />} />
              <Route path="/profile" element={<User />} />
              <Route path="/relatorio" element={<Relatorios />} />
              <Route path="/previsoes" element={<Previsao />} />
              <Route path="/configuracoes" element={<Configurations />} />
              {/* </Route> */}
            </Routes>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default Router;
