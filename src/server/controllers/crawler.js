const axios = require("axios");

const getProfile = async (baekjoonId) => {
  const lastSubmittedPromise = fetchLastSubmitted(baekjoonId);
  const tierAndExpPromise = fetchTierAndExp(baekjoonId);

  const lastSubmitted = await lastSubmittedPromise;
  const tierAndExp = await tierAndExpPromise;

  return { ...tierAndExp, lastSubmitted };
};

const fetchLastSubmitted = async (baekjoonId) => {
  const response = await axios.get(
    `https://www.acmicpc.net/status?problem_id=&user_id=${baekjoonId}&language_id=-1&result_id=-1`
  );

  return response.data.split(`data-method="from-now">`)[1].split(`<`)[0];
};

const fetchTierAndExp = async (baekjoonId) => {
  const response = await axios.get(
    `https://solved.ac/profile/${baekjoonId}/history`
  );

  const tier = response.data.split("<b>")[1].split("</b>")[0];
  const exp = parseInt(
    response.data.split("<b>")[2].split("</b>")[0].replace(/,/gi, "")
  );

  const expHistoryJsonStr = response.data
    .split('"expHistory":{"success":true,"result":')[1]
    .split('},"solvedHistory')[0];

  const expHistories = JSON.parse(expHistoryJsonStr);
  const aWeekAgo = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;

  const historyInAWeek = expHistories.filter(
    (history) => parseInt(history.timestamp) >= aWeekAgo
  );

  const length = historyInAWeek.length;
  if (length === 0) {
    return { tier, exp: addComma(exp), expInAWeek: 0 };
  }

  const historyAWeekAgo = historyInAWeek[length - 1];
  const expAWeekAgo = parseInt(historyAWeekAgo.exp);

  expInAWeek = exp - expAWeekAgo;

  return { tier, exp: addComma(exp), expInAWeek: addComma(expInAWeek) };
};

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
const addComma = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const people = [
  { name: "김진홍", baekjoonId: "deepred" },
  { name: "이승현", baekjoonId: "ujm0524" },
  { name: "위승빈", baekjoonId: "wsb0722" },
  { name: "이예은", baekjoonId: "jjklunicc" },
];
const teams = [
  { teamName: "우리팀화이팀", members: ["김진홍", "이승현"], expInAWeek: "0" },
  { teamName: "4학년화이팀", members: ["위승빈", "이예은"], expInAWeek: "0" },
];

const getPeople = () => people;
const getTeams = () => teams;

const crawle = () => {
  const profilePromises = [];

  for (let i = 0; i < people.length; i++) {
    profilePromises.push(getProfile(people[i].baekjoonId));
  }

  let idx = 0;
  Promise.all(profilePromises)
    .then((profiles) => {
      profiles.map((profile) => {
        people[idx] = { ...people[idx], ...profile };
        idx++;
      });
    })
    .then(() => {
      for (let i = 0; i < teams.length; i++) {
        teams[i].expInAWeek = '0';
        for (let j = 0; j < teams[i].members.length; j++) {
          teams[i].expInAWeek = addComma(
            commaStrToInt(teams[i].expInAWeek) +
              commaStrToInt(getPersonByName(teams[i].members[j]).expInAWeek)
          );
        }
      }
    })
    .then(() => {
      people.sort(function (x, y) {
        return commaStrToInt(y.exp) - commaStrToInt(x.exp);
      });
      for (let i = 0; i < people.length; i++) {
        people[i].rank = i + 1;
      }

      teams.sort(function (x, y) {
        return commaStrToInt(y.expInAWeek) - commaStrToInt(x.expInAWeek);
      });
      for (let i = 0; i < teams.length; i++) {
        teams[i].rank = i + 1;
      }
    });
};

const commaStrToInt = (commaNumber) => {
  if (typeof commaNumber === "number") return commaNumber;
  return parseInt(commaNumber.replace(/,/gi, ""));
};

const getPersonByName = (name) => {
  const targetPerson = people.filter((person) => person.name === name)[0];
  return targetPerson;
};

let crawleTimer;
const startCrawling = () => {
  crawle();
  crawleTimer = setInterval(crawle, 10000);
};

exports.startCrawling = startCrawling;
exports.getPeople = getPeople;
exports.getTeams = getTeams;
