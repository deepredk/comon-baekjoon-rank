import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import LooksThreeIcon from '@material-ui/icons/Looks3';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    marginTop: 10,
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  rankFirst: {
    color: '#ffb300',
  },
  rankSecond: {
    color: '#757575',
  },
  rankThird: {
    color: '#8d6e63',
  },
  rank: {
    marginLeft: '5px',
    width: '60px',
    height: '60px',
  },
});

export default function TeamRankCard({ rank, teamName, members, expInAWeek }) {
  const classes = useStyles();

  // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  const addComma = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {teamName}
          <span className={classes.rank}>
            {rank === 1 && <LooksOneIcon className={classes.rankFirst} />}
            {rank === 2 && <LooksTwoIcon className={classes.rankSecond} />}
            {rank === 3 && <LooksThreeIcon className={classes.rankThird} />}
          </span>
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {members.join(', ')}
        </Typography>
        <Typography variant="body1" align="right">
          최근 7일
        </Typography>
        <Typography variant="h5" align="right">
          {addComma(expInAWeek)} Exp
        </Typography>
      </CardContent>
    </Card>
  );
}

TeamRankCard.defaultProps = {
  rank: 0,
  teamName: 'teamName',
  members: [],
  expInAWeek: 0,
};

TeamRankCard.propTypes = {
  rank: PropTypes.number,
  teamName: PropTypes.string,
  members: PropTypes.arrayOf(PropTypes.string),
  expInAWeek: PropTypes.number,
};
