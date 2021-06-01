import React from 'react';
import TeamRankCard from './TeamRankCard';

function createData(rank, teamName, members, experience) {
  return {
    rank, teamName, members, experience
  };
}

const cards = [
  createData(1, 'G P S', ['이승현', '정형일', '김수진'], '100,000'),
  createData(2, 'G P S', ['이승현', '정형일', '김수진'], '100,000'),
  createData(3, 'G P S', ['이승현', '정형일', '김수진'], '100,000'),
  createData(4, 'G P S', ['이승현', '정형일', '김수진'], '100,000'),
  createData(5, 'G P S', ['이승현', '정형일', '김수진'], '100,000'),
];


export default function TeamRank() {
  return (
    <>
      {cards.map(card => (
        <TeamRankCard
          rank={card.rank}
          teamName={card.teamName}
          members={card.members}
          experience={card.experience}
        />
      ))}
    </>
  );
}
