import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import { useEffect } from "react";

import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { ForgotPassword } from "./components/auth/ForgotPassword";
import { Home } from "./pages/Home";
import { DragAndDrop } from "./pages/DragAndDrop";
import { InfiniteScroll } from "./pages/InfiniteScroll";
import { Layout } from "./components/layout/Layout";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import { PublicRoute } from "./components/auth/PublicRoute";

const queryClient = new QueryClient();
const theme = createTheme();

const RouteChangeHandler = () => {
  const location = useLocation();
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Minimum loading time to prevent flickering

    return () => clearTimeout(timer);
  }, [location, setLoading]);

  return null;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoadingProvider>
          <Router>
            <RouteChangeHandler />
            <Routes>
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <PublicRoute>
                    <ForgotPassword />
                  </PublicRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Layout>
                      <Home />
                    </Layout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/drag-drop"
                element={
                  <PrivateRoute>
                    <Layout>
                      <DragAndDrop />
                    </Layout>
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/infinite-scroll"
                element={
                  <PrivateRoute>
                    <Layout>
                      <InfiniteScroll />
                    </Layout>
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Router>
        </LoadingProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
