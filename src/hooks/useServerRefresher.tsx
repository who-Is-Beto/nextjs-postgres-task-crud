import { useRouter } from "next/router";

export function useServerRefresher(): () => void {
  const router = useRouter();
  return () => {
    router.replace(router.asPath);
  };
}
