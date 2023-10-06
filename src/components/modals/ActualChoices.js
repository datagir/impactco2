import DataContext from "components/providers/DataProvider";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import useLocalStorage from "use-local-storage";

export default function ActualChoices() {
  const [eqvArray, setEqvArray] = useLocalStorage("ico2_eqv_array");
  const { equivalents } = useContext(DataContext);
  const [eqvError, setEqvError] = useLocalStorage("eqvError");

  useEffect(() => {
    if (eqvArray && eqvArray.length >= 2) {
      setEqvError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eqvArray]);

  const removeChoice = (slug) => {
    const newArray = eqvArray.filter((ticked) => ticked !== slug);
    setEqvArray(newArray);
  };

  const getPluralOf = (word) => {
    let res = word;
    if (eqvArray.length > 1) {
      res += "s";
    }
    return res;
  };

  const nameOf = (ticked) => {
    return equivalents.find((e) => e.slug === ticked).name;
  };

  return (
    <Wrapper>
      <SelectionBox>
        <UpperSide>
          <UpperSideCounting>
            <Count>{eqvArray.length}</Count>/<MaxCount>3</MaxCount>
          </UpperSideCounting>{" "}
          <strong>{getPluralOf("équivalence")}</strong> {getPluralOf("sélectionnée")}
        </UpperSide>
        <Choices>
          {eqvArray.length > 0 ? (
            <>
              {eqvArray.map((ticked) => {
                return (
                  <Choice key={ticked} onClick={() => removeChoice(ticked)}>
                    <ChoiceTick>
                      <Tick></Tick>
                    </ChoiceTick>
                    <ChoiceText>{nameOf(ticked)}</ChoiceText>
                  </Choice>
                );
              })}
            </>
          ) : (
            <>
              <EmptyChoice>Veuillez choisir au moins 2 items ci-contre.</EmptyChoice>
            </>
          )}
        </Choices>
      </SelectionBox>
      {eqvError ? (
        <>
          <ShowDesktopOnly>
            <ErrorBox>⚠️ {eqvError}</ErrorBox>
          </ShowDesktopOnly>
        </>
      ) : (
        <></>
      )}
    </Wrapper>
  );
}

const ShowDesktopOnly = styled.div`
  display: block;
  ${(props) => props.theme.mq.small} {
    display: none;
  }
`;

const Wrapper = styled.div`
  margin-left: 1.5rem;
  margin-right: 1rem;
`;

const SelectionBox = styled.div`
  background-color: #ebfffe;
  border-radius: 1rem;
  padding: 1rem;
`;

const UpperSide = styled.div`
  border-bottom: 1px solid #a0f5ee;
  padding-bottom: 1rem;
`;
const Choices = styled.div``;

const ChoiceTick = styled.div`
  background-color: #26827c;
  border: 1px solid #26827c;
  border-radius: 4px;
  height: 24px;
  width: 24px;
`;

const Choice = styled.div`
  cursor: pointer;
  display: flex;
  margin-top: 0.75rem;
  &:hover {
    background-color: #dfeceb;
  }
`;
const Tick = styled.div`
  border-bottom: 2px solid white;
  border-right: 2px solid white;
  display: inline-block;
  height: 10px;
  margin-bottom: 2px;
  margin-left: 42%;
  transform: rotate(45deg);
  width: 5px;
`;

const ChoiceText = styled.div`
  margin-left: 0.75rem;
`;

const UpperSideCounting = styled.div`
  background-color: #a0f5ee;
  border-radius: 0.25rem;
  display: inline-block;
  padding: 0.125rem 0.5rem;
`;

const Count = styled.strong`
  margin-right: 0.1rem;
`;

const MaxCount = styled.span`
  margin-left: 0.1rem;
`;

const EmptyChoice = styled.div`
  font-style: italic;
  margin-top: 1rem;
`;

const ErrorBox = styled.div`
  border: 1px solid black;
  border-radius: 0.25rem;
  margin-top: 1rem;
  padding: 1rem;
`;
