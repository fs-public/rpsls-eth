import styled from "styled-components";

export const StyledRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  align-items: center;
  padding: 20px 0;

  @media (min-width: 640px) {
    flex-direction: row;
    gap: 48px;

    & > *:nth-child(1) {
      width: 75%;
    }
    & > *:nth-child(2) {
      width: 25%;
    }
  }
`;

export const StyledSimpleRow = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 16px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;
