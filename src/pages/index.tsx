import type { NextPage } from "next";
import UnAuthenticated from "@/views/UnAuthenticated";

const Home: NextPage = (): JSX.Element => {
  return <>{<UnAuthenticated />} </>;
};

export default Home;
