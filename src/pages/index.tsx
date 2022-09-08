import type { NextPage } from "next";
import UnAuthenticated from "@/views/UnAuthenticated";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect((): void => {}, [isAuthenticated]);
  return <>{isAuthenticated ? <p>You are authenticated</p> : <UnAuthenticated />}</>;
};

export default Home;
