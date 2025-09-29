export const useRouter = () => ({
  push: (_: string) => {},
  replace: (_: string) => {},
  prefetch: (_: string) => Promise.resolve(),
  back: () => {},
});

export const usePathname = () => "/";
export const useSearchParams = () => new URLSearchParams();
