import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import axios from 'axios';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    padding: 10,
  },
  body: {
    fontSize: 14,
    padding: 10,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 360,
  },
  exp: {
    color: '#ba000d',
  },
  container: {
    marginTop: '5px',
    backgroundColor: '#fafafa',
  },
  profileLink: {
    color: '#1769aa',
  },
  tier: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tierImage: {
    width: '12px',
  },
  tierBox: {
    width: '90px',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '7px',
  },
});

export default function PersonalRank() {
  const classes = useStyles();
  const [people, setPeople] = useState([]);

  const addComma = number =>
    String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  useEffect(() => {
    axios.get(`/api/rank`).then(response => {
      setPeople(response.data);
    });
  }, []);

  const tierNames = [
    'Unrated',
    'Bronze V',
    'Bronze IV',
    'Bronze III',
    'Bronze II',
    'Bronze I',
    'Silver V',
    'Silver IV',
    'Silver III',
    'Silver II',
    'Silver I',
    'Gold V',
    'Gold IV',
    'Gold III',
    'Gold II',
    'Gold I',
    'Platinum V',
    'Platinum IV',
    'Platinum III',
    'Platinum II',
    'Platinum I',
    'Diamond V',
    'Diamond IV',
    'Diamond III',
    'Diamond II',
    'Diamond I',
    'Ruby V',
    'Ruby IV',
    'Ruby III',
    'Ruby II',
    'Ruby I',
    'Master',
  ];

  const getTierColor = tier => {
    if (tier === 0) return '#000000';
    if (tier >= 1 && tier <= 5) return '#ad5700';
    if (tier >= 6 && tier <= 10) return '#435f7a';
    if (tier >= 11 && tier <= 15) return '#df8f00';
    if (tier >= 16 && tier <= 20) return '#27e2a4';
    if (tier >= 21 && tier <= 25) return '#00b4fc';
    if (tier >= 26 && tier <= 30) return '#ff0062';
    return '#b491ff';
  };

  return (
    <TableContainer
      component={Paper}
      className={`${classes.table} ${classes.container}`}
    >
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="center">이름</StyledTableCell>
            <StyledTableCell align="center">티어</StyledTableCell>
            <StyledTableCell align="center">누적 경험치</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {people.map(person => (
            <StyledTableRow key={person.baekjoonId}>
              <StyledTableCell>{person.rank}</StyledTableCell>
              <StyledTableCell align="center">
                <Link
                  href={`https://acmicpc.net/user/${person.baekjoonId}`}
                  className={classes.profileLink}
                  target="_blank"
                >
                  {person.name}
                </Link>
              </StyledTableCell>
              <StyledTableCell align="center" className={classes.tier}>
                <div className={classes.tierBox}>
                  <img
                    className={classes.tierImage}
                    src={`https://static.solved.ac/tier_small/${person.tier}.svg`}
                    alt={tierNames[person.tier]}
                  />
                  &nbsp;
                  <span style={{ color: `${getTierColor(person.tier)}` }}>
                    {tierNames[person.tier]}
                  </span>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center" className={classes.exp}>
                {person.exp ? addComma(person.exp) : '-'}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
