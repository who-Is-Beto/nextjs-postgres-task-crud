const ENVS = {
  tokenKey: process.env.TOKEN_KEY || "OutsideJWT",
  env: process.env.NODE_ENV || "development",
  secretTokenKey: process.env.SECRET_TOKEN_KEY,
  supabaseURL: process.env.SUPABASE_URL,
  anonKey: process.env.ANON_KEY
};

export default ENVS;
