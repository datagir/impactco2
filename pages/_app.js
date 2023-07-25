import { init } from "@socialgouv/matomo-next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DataProvider } from "components/providers/DataProvider";
import { ModalProvider } from "components/providers/ModalProvider";
import { StyleProvider } from "components/providers/StyleProvider";
import { NextAdapter } from "next-query-params";
import React, { useEffect, useState } from "react";
import { hotjar } from "react-hotjar";
import styled from "styled-components";
import { QueryParamProvider } from "use-query-params";
import "utils/augmenters";
import "utils/fonts.css";
import { GlobalStyle } from "utils/styles";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      init({ url: "https://stats.data.gouv.fr", siteId: 156 });
    }
    hotjar.initialize(3372162, 6);
  }, []);

  return (
    <QueryParamProvider adapter={NextAdapter}>
      <QueryClientProvider client={queryClient}>
        <StyleProvider>
          <SkipLinks>
            <div className="fr-skiplinks">
              <nav className="fr-container" role="navigation" aria-label="Accès rapide">
                <ul className="fr-skiplinks__list">
                  <li>
                    <a className="fr-link screenreader-text" href="#contenu">
                      Contenu
                    </a>
                  </li>
                  <li>
                    <a className="fr-link screenreader-text" href="#header-navigation">
                      Menu
                    </a>
                  </li>
                  <li>
                    <a className="fr-link screenreader-text" href="#header-search">
                      Recherche
                    </a>
                  </li>
                  <li>
                    <a className="fr-link screenreader-text" href="#footer">
                      Pied de page
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </SkipLinks>

          <DataProvider>
            <ModalProvider>
              <GlobalStyle />
              <Component {...pageProps} />
            </ModalProvider>
          </DataProvider>
        </StyleProvider>
      </QueryClientProvider>
    </QueryParamProvider>
  );
}

export default MyApp;

const SkipLinks = styled.div`
  .fr-skiplinks {
    background-color: purple;
  }

  .visible-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  .visible-hidden:focus {
    clip: auto;
    height: auto;
    overflow: auto;
    position: absolute;
    width: auto;
  }

  .screenreader-text {
    position: absolute;
    left: -999px;
    width: 1px;
    height: 1px;
    top: auto;
  }

  .screenreader-text:focus {
    color: black;
    display: inline-block;
    height: auto;
    margin: auto;
    position: static;
    width: auto;
  }
`;
