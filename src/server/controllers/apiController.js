const { getProfile, getPeople, getTeams } = require("./crawler");

const crawled = (people, members) => {
  this.people = people;
  this.member = members;
}

// 개인 랭킹 json
const getPersonalRank = (req, res) => {
  return res.json(getPeople());
}
// 팀 랭킹 json
const getTeamRank = (req, res) => {
  return res.json(getTeams());
}

const getProfileInfo = (req, res) => {
  const { baekjoonId } = req.params;
  getProfile(baekjoonId)
    .then((profile) => res.send(profile));
}

exports.getPersonalRank = getPersonalRank;
exports.getTeamRank = getTeamRank;
exports.getProfileInfo = getProfileInfo;
exports.crawled = crawled;