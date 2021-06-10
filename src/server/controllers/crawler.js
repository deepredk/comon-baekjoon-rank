/* eslint-disable array-callback-return */
import axios from 'axios';

const fetchLastSubmitted = async baekjoonId => {
  let response;
  try {
    response = await axios.get(
      `https://www.acmicpc.net/status?problem_id=&user_id=${baekjoonId}&language_id=-1&result_id=-1`,
    );
  } catch (error) {
    console.error(error);
    return null;
  }

  return response.data.split(`data-method="from-now">`)[1].split(`<`)[0];
};

const fetchTierAndExp = async baekjoonId => {
  let response;
  try {
    response = await axios.get(
      `https://solved.ac/profile/${baekjoonId}/history`,
    );
  } catch (error) {
    console.error(error);
    return null;
  }

  const tier = parseInt(
    response.data
      .split('img src="https://static.solved.ac/tier_small/')[1]
      .split('"')[0],
    10,
  );
  const exp = parseInt(
    response.data.split('<b>')[2].split('Exp</b>')[0].replace(/,/gi, ''),
    10,
  );

  const expHistoryJsonStr = response.data
    .split('"expHistory":{"success":true,"result":')[1]
    .split('},"solvedHistory')[0];

  const expHistories = JSON.parse(expHistoryJsonStr);
  const aWeekAgo = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;

  const historyInAWeek = expHistories.filter(
    history => parseInt(history.timestamp, 10) >= aWeekAgo,
  );

  const expsInAWeek = historyInAWeek.map(history => history.exp);
  const minExpInAWeek = expsInAWeek.reduce(
    (acc, cur) => Math.min(cur, acc),
    exp,
  );

  let expInAWeek = exp - minExpInAWeek;
  if (expInAWeek < 0) expInAWeek = 0;

  return { tier, exp, expInAWeek };
};

export const getProfile = async baekjoonId => {
  const lastSubmittedPromise = fetchLastSubmitted(baekjoonId);
  const tierAndExpPromise = fetchTierAndExp(baekjoonId);

  const lastSubmitted = await lastSubmittedPromise;
  if (lastSubmitted === null) return {};
  const tierAndExp = await tierAndExpPromise;
  if (tierAndExp === null) return {};

  return { ...tierAndExp, lastSubmitted };
};

const people = [
  { name: '김진홍', baekjoonId: 'deepred' },
  { name: '이승현', baekjoonId: 'ujm0524' },
  { name: '위승빈', baekjoonId: 'wsb0722' },
  { name: '이예은', baekjoonId: 'jjklunicc' },
];
const teams = [
  { teamName: '우리팀화이팀', members: ['김진홍', '이승현'] },
  { teamName: '4학년화이팀', members: ['위승빈', '이예은'] },
];

export const getPeople = () => people;
export const getTeams = () => teams;

const getPersonByName = name => {
  const targetPerson = people.filter(person => person.name === name)[0];
  return targetPerson;
};

const crawle = () => {
  const profilePromises = [];

  for (let i = 0; i < people.length; i += 1) {
    profilePromises.push(getProfile(people[i].baekjoonId));
  }

  let idx = 0;
  Promise.all(profilePromises)
    .then(profiles => {
      profiles.map(profile => {
        people[idx] = { ...people[idx], ...profile };
        idx += 1;
      });
    })
    .then(() => {
      for (let i = 0; i < teams.length; i += 1) {
        teams[i].expInAWeek = 0;
        for (let j = 0; j < teams[i].members.length; j += 1) {
          teams[i].expInAWeek += getPersonByName(
            teams[i].members[j],
          ).expInAWeek;
        }
      }
    })
    .then(() => {
      people.sort((x, y) => y.exp - x.exp);
      for (let i = 0; i < people.length; i += 1) {
        people[i].rank = i + 1;
      }

      teams.sort((x, y) => y.expInAWeek - x.expInAWeek);
      for (let i = 0; i < teams.length; i += 1) {
        teams[i].rank = i + 1;
      }
    });
};

export const startCrawling = () => {
  crawle();
  setInterval(crawle, 30000);
};
