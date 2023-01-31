import type { GetServerSidePropsContext, NextPage } from "next";
import UnAuthenticated from "@/views/UnAuthenticated";
import { userFromRequest } from "@/web/tokens";
import { User } from "@prisma/client";
import Authenticated from "@/views/Authenticated";

const Home: NextPage<{ user: User | null }> = ({ user }): JSX.Element => {
  return <>{user ? <Authenticated user={user} /> : <UnAuthenticated />} </>;
};

export async function getServerSideProps(constext: GetServerSidePropsContext) {
  const user = await userFromRequest(constext.req);

  if (!user) {
    return {
      props: {
        user: null
      }
    };
  }
  return {
    props: {
      user: JSON.parse(JSON.stringify(user))
    }
  };
}
export default Home;
