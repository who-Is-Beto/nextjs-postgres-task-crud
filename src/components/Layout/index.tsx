import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { IRouteProperties, IStore, TRoutes } from "shimps";
import routes from "@/auth/routes";
import doesHttpOnlyCookieExist from "@/helpers/checkCookie";

const Layout: React.FC<{ children: any }> = ({ children }): JSX.Element => {
  const router = useRouter();
  useEffect((): void => {
    let pathName = router.pathname;
    let route: IRouteProperties = (routes as any)[pathName];
    if (route.protect && !doesHttpOnlyCookieExist("OutsideJWT")) {
      router.push("/Login");
      return;
    }
    if (doesHttpOnlyCookieExist("OutsideJWT") && !route.accessWithToken) {
      router.push("/");
      return;
    }
  }, [router.pathname]);
  return <>{children}</>;
};

export default Layout;
