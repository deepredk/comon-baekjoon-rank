const { ContactSupportOutlined } = require("@material-ui/icons");
const axios = require("axios");
const os = require("os");

const getUsername = (req, res) => {
  res.send({ username: os.userInfo().username });
  return;
};

const getProfile = (baekjoonId) => {
  const acmicpc = fetchLastSubmitted(baekjoonId);

  let lastSubmitted;
  acmicpc.then((response) => {
    console.log(response);
    lastSubmitted = response;
  });

  return { lastSubmitted };
};

const fetchLastSubmitted = async (baekjoonId) => {
  const response = await axios.get(
    `https://www.acmicpc.net/status?problem_id=&user_id=${baekjoonId}&language_id=-1&result_id=-1`
  );

  return response.data.split(`data-method="from-now">`)[1].split(`<`)[0];
};

const fetchTierExperience = (baekjoonId) => {
  /// 티어
  // <b> [1]
  // </b> [0]
  /// 누적 경험치
  // <b> [2]
  // </b> [0]
  /// 경험치 데이터
  // "expHistory":{"success":true,"result": [1]
  // },"solvedHistory [0]
  // 7일
};

exports.getUsername = getUsername;
exports.getProfile = getProfile;

// (아이디) -> {티어, 누적경험치, 최근 7일 경험치, 마지막 풀이}
// 팀 랭킹 json
// 개인 랭킹 json
