import doesHttpOnlyCookieExist from "@/helpers/checkCookie";
import type { NextPage } from "next";
import UnAuthenticated from "@/views/UnAuthenticated";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect((): void => {
    setIsAuthenticated(doesHttpOnlyCookieExist("OutsideJWT"));
  }, [isAuthenticated]);
  return <>{isAuthenticated ? <p>You are authenticated</p> : <UnAuthenticated />}</>;
};

export default Home;
