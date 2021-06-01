import React from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

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
    borderRadius: 0
  },
});

function createData(rank, name, tier, experience, lastSubmit, account) {
  return {
    rank, name, tier, experience, lastSubmit, account
  };
}

const rows = [
  createData(1, '김진홍', 'Gold IV', '100,000Exp', '1시간 전', 'deepred'),
  createData(2, '김수진', 'Silver V', '100,000Exp', '1시간 전', 'deepred'),
  createData(3, '정형일', 'Bronze I', '100,000Exp', '1시간 전', 'deepred'),
  createData(4, '이승현', 'Bronze II', '100,000Exp', '1시간 전', 'deepred'),
  createData(5, '정회운', 'Bronze V', '100,000Exp', '1시간 전', 'deepred'),
];

export default function PersonalRank() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table
        className={classes.table}
        size="small"
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="center">이름</StyledTableCell>
            <StyledTableCell align="center">티어</StyledTableCell>
            <StyledTableCell align="center">누적 경험치</StyledTableCell>
            <StyledTableCell align="right">마지막 풀이</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.rank}>
              <StyledTableCell>{row.rank}</StyledTableCell>
              <StyledTableCell align="center">
                <Link
                  href={`https://acmicpc.net/user/${row.account}`}
                  style={{ color: '#1769aa' }}
                  target="_blank"
                >
                  {row.name}
                </Link>
              </StyledTableCell>
              <StyledTableCell align="center">{row.tier}</StyledTableCell>
              <StyledTableCell align="center">{row.experience}</StyledTableCell>
              <StyledTableCell align="right">{row.lastSubmit}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
