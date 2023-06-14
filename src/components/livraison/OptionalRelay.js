import SelectRelays from "./SelectRelays";
import styled from "styled-components";

export default function OptionalRelay(props) {
  return (
    <Wrapper>
      <GridContainer>
        <div className="item1">
          <Text>Vous effectuez généralement le trajet jusqu'au point relais</Text>
        </div>
        <div className="item2">
          <SelectRelays changeRelay={props.changeRelay}></SelectRelays>
        </div>
        <div className="item3"></div>
        <div className="item4">
          <Addendum>0 kg de CO2e</Addendum>
        </div>
      </GridContainer>
    </Wrapper>
  );
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  > .item1,
  .item2,
  .item4 {
    align-items: center;
    display: flex;
  }
`;

const Wrapper = styled.div`
  background-color: #f9f7f8;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0em;
  line-height: 24px;
`;

const Addendum = styled.div`
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0em;
  line-height: 16px;
`;
