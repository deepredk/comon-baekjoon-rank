import { Container } from '@material-ui/core';
import React from 'react';
import Rank from './Rank';
import './Content.css';

export default function Content() {
  return (
    <Container maxWidth="md" className="container">
      <Rank />
    </Container>
  );
}
