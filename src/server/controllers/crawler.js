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
    return { tier: 0, exp: 0, expInAWeek: 0 };
  }
  const { tier, exp } = response.data;

  try {
    response = await axios.get(
      `https://solved.ac/api/v3/user/history?handle=${baekjoonId}&topic=exp`,
    );
  } catch (error) {
    console.error(error);
    return { tier: 0, exp: 0, expInAWeek: 0 };
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
  if (!tierAndExp) return { tier: 0, exp: 0, expInAWeek: 0 };

  return { ...tierAndExp };
};

const people = [
  { name: '이승현', baekjoonId: 'ujm0524', exp: 0, expInAWeek: 0 },
  { name: '정유민', baekjoonId: 'furo9899', exp: 0, expInAWeek: 0 },
  { name: '이민영', baekjoonId: 'dreamlmy1203', exp: 0, expInAWeek: 0 },
  { name: '최지연', baekjoonId: 'cerulean20', exp: 0, expInAWeek: 0 },
  { name: '오승민', baekjoonId: 'gkahsl13', exp: 0, expInAWeek: 0 },
  { name: '전도현', baekjoonId: 'whiterabbit02', exp: 0, expInAWeek: 0 },
  { name: '최강헌', baekjoonId: 'choikangheon', exp: 0, expInAWeek: 0 },
  { name: '최범준', baekjoonId: 'kk7073', exp: 0, expInAWeek: 0 },
  { name: '함창범', baekjoonId: 'hcb1999', exp: 0, expInAWeek: 0 },
  { name: '안예진', baekjoonId: 'yejin0308', exp: 0, expInAWeek: 0 },
  { name: '김수진', baekjoonId: 'pocachip0318', exp: 0, expInAWeek: 0 },
  { name: '정형일', baekjoonId: 'aadsf1789', exp: 0, expInAWeek: 0 },
];

const teams = [
  { teamName: '엽떡', members: ['이승현', '김수진', '정형일'] },
  { teamName: '팀1', members: ['정유민', '안예진'] },
  { teamName: '팀2', members: ['오승민', '최범준', '함창범'] },
  { teamName: '커밋', members: ['이민영', '최지연'] },
  { teamName: '팀4', members: ['최강헌', '전도현'] },
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
    const delay = 1000 * i;
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
  setInterval(crawle, 300000);
};
