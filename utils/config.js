// // const JWT_SECRET = process.env.JWT_SECRET;
// module.exports = {
//   JWT_SECRET: "secret-key",
// };
// // module.exports = { JWT_SECRET };

const { JWT_SECRET = "super-strong-secret" } = process.env;

console.log(JWT_SECRET);

module.exports = {
  JWT_SECRET,
};
