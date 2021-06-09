import { Container } from '@material-ui/core';
import React from 'react';
import Rank from './Rank';
import { styled } from "@material-ui/core/styles";

const StyledContainer = styled(Container)({
  marginTop: "10px",
  padding: "0",
});

export default function Content() {
  return (
    <StyledContainer maxWidth="md" className="container">
      <Rank />
    </StyledContainer>
  );
}
