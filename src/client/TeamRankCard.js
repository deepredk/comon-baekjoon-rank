import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import LooksOneIcon from "@material-ui/icons/LooksOne";
import LooksTwoIcon from "@material-ui/icons/LooksTwo";
import LooksThreeIcon from "@material-ui/icons/Looks3";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import "./TeamRankCard.css";

const useStyles = makeStyles({
  root: {
    marginTop: 10,
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function TeamRankCard({ rank, teamName, members, expInAWeek }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {teamName}
          <span className="rank">
            {rank === 1 && <LooksOneIcon style={{ color: "#ffb300" }} />}
            {rank === 2 && <LooksTwoIcon style={{ color: "#757575" }} />}
            {rank === 3 && <LooksThreeIcon style={{ color: "#8d6e63" }} />}
          </span>
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {members.join(", ")}
        </Typography>
        <Typography variant="body1" align="right">
          최근 7일
        </Typography>
        <Typography variant="h5" align="right">
          {expInAWeek} Exp
        </Typography>
      </CardContent>
    </Card>
  );
}
