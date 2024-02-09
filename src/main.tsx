import ReactDOM from "react-dom/client";
import App from "./App.routes.tsx";
import "./index.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from "primereact/api";
import { ToastProvider } from "./providers";
import { ErrorBoundary } from "react-error-boundary";
import ErrorHandler from "./components/ErrorHandler/ErrorHandler.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary FallbackComponent={ErrorHandler}>
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <ToastProvider position="bottom-right">
          <App />
        </ToastProvider>
      </PrimeReactProvider>
    </QueryClientProvider>
  </ErrorBoundary>,
);
