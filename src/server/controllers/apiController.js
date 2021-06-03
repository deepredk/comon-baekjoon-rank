const axios = require("axios");
const os = require("os");

const getUsername = (req, res) =>
  res.send({ username: os.userInfo().username });

const getProfile = async (baekjoonId) => {
  // axios
  //   .get(`https://solved.ac/profile/${baekjoonId}/history`)
  //   .then((response) => {
  //     // console.log(response);
  //   });

  let response = await axios.get(
    `https://www.acmicpc.net/status?problem_id=&user_id=${baekjoonId}&language_id=-1&result_id=-1`
  );

  return response.data.split(`data-method="from-now">`)[1].split(`<`)[0];
};

exports.getUsername = getUsername;
exports.getProfile = getProfile;

// (아이디) -> {티어, 누적경험치, 최근 7일 경험치, 마지막 풀이}
// 팀 랭킹 json
// 개인 랭킹 json
