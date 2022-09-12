import type { NextPage } from "next";
import UnAuthenticated from "@/views/UnAuthenticated";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  return <>{<UnAuthenticated />} </>;
};

export default Home;
