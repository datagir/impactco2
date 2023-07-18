import { Emojis } from "components/misc/Visualization";
import React from "react";
import styled from "styled-components";

export default function AdviceLivraisonDetail(props) {
  return (
    <>
      <Wrapper>
        <Heading>
          <H3Title>{props.title}</H3Title>
        </Heading>
        {props.line1Text ? (
          <>
            <Line>
              <Icon>
                <Emojis>{props.line1Emoji}</Emojis>
              </Icon>
              <Text>{props.line1Text}</Text>
            </Line>
            <Line>
              <Icon></Icon>
              <Subtext>{props.line1Subtext}</Subtext>
            </Line>
          </>
        ) : (
          <></>
        )}
      </Wrapper>
    </>
  );
}

const H3Title = styled.h3`
  color: ${(props) => props.theme.colors.main3};
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.darkBackground};
  border-radius: 8px;
  padding: 2rem;
`;

const Heading = styled.div``;

const Line = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
`;

const Icon = styled.div`
  margin-right: 0.5rem;
  width: 40px;
`;
const Text = styled.div``;
const Subtext = styled.div``;
