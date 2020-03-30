import styled from "styled-components";

const StyledRow = styled.div`
  width: 100vw;
  background: ${props => props.theme.secondaryBgColor};
  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-left: 1rem;
  padding-right:1rem;
  display: flex;
  flex-direction: row;
  align-items: center;

  @media only screen and (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 4px;
  }
`;

export default StyledRow;
