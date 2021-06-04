import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import axios from "axios";

const StyledTableCell = withStyles((theme) => ({
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

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 360,
  },
});

export default function PersonalRank() {
  const classes = useStyles();
  const [people, setPeople] = useState([]);

  useEffect(() => {
    axios.get("http://3.24.245.34/api/rank").then((response) => {
      setPeople(response.data);
    });
  }, []);

  return (
    <TableContainer
      component={Paper}
      className={classes.table}
      style={{ marginTop: 10, backgroundColor: "#fafafa" }}
    >
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
          {people.map((person) => (
            <StyledTableRow key={person.baekjoonId}>
              <StyledTableCell>{person.rank}</StyledTableCell>
              <StyledTableCell align="center">
                <Link
                  href={`https://acmicpc.net/user/${person.baekjoonId}`}
                  style={{ color: "#1769aa" }}
                  target="_blank"
                >
                  {person.name}
                </Link>
              </StyledTableCell>
              <StyledTableCell align="center">{person.tier}</StyledTableCell>
              <StyledTableCell align="center">{person.exp}</StyledTableCell>
              <StyledTableCell align="right">
                {person.lastSubmitted}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
