const os = require('os');

const getUsername = (req, res) => res.send({ username: os.userInfo().username });

exports.getUsername = getUsername;
