import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Rank from './Rank';

const useStyles = makeStyles({
  container: {
    marginTop: '10px',
    padding: '0',
  },
});

export default function Content() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Rank />
    </Container>
  );
}
