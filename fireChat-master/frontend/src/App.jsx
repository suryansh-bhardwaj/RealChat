import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OnboardingPage from "./pages/OnboardingPage";
import NotificationPage from "./pages/NotificationPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import PageLoader from "./components/PageLoader";
import useAuthUser from "./hooks/useAuthUser";
import Layout from "./components/Layout";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();
  if (isLoading) return <PageLoader />;

  const isAuthenticated = Boolean(authUser);

  const isOnboarded = authUser?.isOnboarded;

  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route    
          path="/home"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              isOnboarded ? (
                <Navigate to="/home" />
              ) : (
                <OnboardingPage />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated ? (
              <Layout showSidebar={true}>
                <NotificationPage />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignUpPage />
            ) : (
              <Navigate to={isOnboarded ? "/home" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/home" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/call"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to="/home" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
