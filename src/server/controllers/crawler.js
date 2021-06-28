/* eslint-disable array-callback-return */
import axios from 'axios';

const fetchTierAndExp = async baekjoonId => {
  let response;
  try {
    response = await axios.get(
      `https://solved.ac/api/v3/user/show?handle=${baekjoonId}`,
    );
  } catch (error) {
    console.error(error);
    return null;
  }
  const { tier, exp } = response.data;

  try {
    response = await axios.get(
      `https://solved.ac/api/v3/user/history?handle=${baekjoonId}&topic=exp`,
    );
  } catch (error) {
    console.error(error);
    return null;
  }

  const expHistories = response.data;
  const aWeekAgo = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;

  const historyInAWeek = expHistories.filter(
    history => new Date(history.timestamp).getTime() >= aWeekAgo,
  );

  const expsInAWeek = historyInAWeek.map(history => history.value);
  const minExpInAWeek = expsInAWeek.reduce(
    (acc, cur) => Math.min(cur, acc),
    exp,
  );

  let expInAWeek = exp - minExpInAWeek;
  if (expInAWeek < 0) expInAWeek = 0;

  return { tier, exp, expInAWeek };
};

export const getProfile = async baekjoonId => {
  const tierAndExpPromise = fetchTierAndExp(baekjoonId);

  const tierAndExp = await tierAndExpPromise;
  if (tierAndExp === null) return {};

  return { ...tierAndExp };
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
    const delay = 500 * i;
    profilePromises.push(
      new Promise(async resolve => {
        await new Promise(res => setTimeout(res, delay));
        resolve(await getProfile(people[i].baekjoonId));
      }),
    );
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
