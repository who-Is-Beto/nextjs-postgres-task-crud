import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { IRouteProperties, IStore, TRoutes } from "shimps";
import routes from "@/auth/routes";

const Layout: React.FC<{ children: JSX.Element }> = ({ children }): JSX.Element => {
  const router = useRouter();
  const token = useSelector((state: IStore) => state.token);

  useEffect((): void => {
    let pathName = router.pathname;
    let route: IRouteProperties = (routes as any)[pathName];
    if (!route) {
      router.push("/");
      return;
    }
    if (route.protect && !token) {
      router.push("/Login");
      return;
    }
  }, [router.pathname]);
  return <>{children}</>;
};

export default Layout;
