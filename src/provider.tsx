import type { NavigateOptions } from "react-router-dom";

import { ToastProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeroUIProvider } from "@heroui/system";
import { useHref, useNavigate } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const queryClient = new QueryClient();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <ToastProvider
        placement="top-center"
        toastProps={{
          timeout: 3000,
        }}
      />
      <SpeedInsights />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </HeroUIProvider>
  );
}
