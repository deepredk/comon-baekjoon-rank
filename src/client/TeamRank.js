import React, { useState, useEffect } from "react";
import TeamRankCard from "./TeamRankCard";
import axios from "axios";

export default function TeamRank() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get("http://3.34.245.34/api/teamrank").then((response) => {
      setTeams(response.data);
    });
  }, []);

  return (
    <>
      {teams
        ? teams.map((team) => (
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
