import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamRankCard from './TeamRankCard';

export default function TeamRank() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get(`/api/teamrank`).then(response => {
      setTeams(response.data);
    });
  }, []);

  return (
    <>
      {teams
        ? teams.map(team => (
            <TeamRankCard
              rank={team.rank}
              teamName={team.teamName}
              members={team.members}
              expInAWeek={team.expInAWeek}
            />
          ))
        : null}
    </>
  );
}
