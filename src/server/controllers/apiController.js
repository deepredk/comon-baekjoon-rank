import { getProfile, getPeople, getTeams } from './crawler';

export const crawled = (people, members) => {
  this.people = people;
  this.member = members;
};

export const getPersonalRank = (req, res) => res.json(getPeople());

export const getTeamRank = (req, res) => res.json(getTeams());

export const getProfileInfo = (req, res) => {
  const { baekjoonId } = req.params;
  getProfile(baekjoonId).then(profile => res.send(profile));
};
