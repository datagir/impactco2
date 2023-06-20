import ResultatLivraison from "./ResultatLivraison";
import LivraisonEq from "components/misc/tiles/LivraisonEq";
import DataContext from "components/providers/DataProvider";
import React, { useContext, useMemo, useEffect, useState } from "react";
import styled from "styled-components";

export default function ResultatsLivraison(props) {
  // eslint-disable-next-line no-unused-vars
  const { equivalents, whitelist } = useContext(DataContext);

  // eslint-disable-next-line no-unused-vars
  const [eqv1L, setEqv1L] = useState([]);
  useEffect(() => {
    const items = localStorage.getItem("eqv1L");
    if (items) {
      setEqv1L(items);
    }
  }, []);

  const equivalentsToShow = useMemo(
    () =>
      equivalents.filter(
        (equivalent) => whitelist.includes(equivalent.slug)
        // trunk-ignore(eslint/react-hooks/exhaustive-deps)
      ),
    [whitelist]
  );

  return (
    <Wrapper>
      <ResultatLivraison co2eq={props.co2eq} />
      {equivalentsToShow
        .sort(function (a, b) {
          return a.category < b.category;
        })
        .map((equivalent, indx) => (
          <LivraisonEq key={equivalent.slug} slug={indx + 1} equivalent={equivalent} weight={props.co2eq / 1000} />
        ))}
      <div>
        {JSON.stringify(eqv1L, null, 2)}
        {JSON.stringify(whitelist, null, 2)}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid #457be7;
  border-radius: 16px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 1rem;
  ${(props) => props.theme.mq.xlarge} {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }
`;
