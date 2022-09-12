import { useRouter } from "next/router";

export function useServerRefresher(): () => void {
  const router = useRouter();
  return (): void => {
    router.replace(router.asPath);
  };
}
