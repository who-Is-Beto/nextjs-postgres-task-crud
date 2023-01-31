const ENVS = {
  tokenKey: process.env.TOKEN_KEY || "OutsideJWT",
  env: process.env.NODE_ENV || "development",
  secretTokenKey: process.env.SECRET_TOKEN_KEY
};

export default ENVS;
