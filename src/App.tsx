import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { OfflineBanner } from './components/common/OfflineBanner';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { CivilianNav } from './components/navigation/CivilianNav';
import { GovNav } from './components/navigation/GovNav';
import { Loader2 } from 'lucide-react';

// Auth Screens
import { SplashScreen } from './screens/auth/SplashScreen';
import { OnboardingScreen } from './screens/auth/OnboardingScreen';
import { LoginScreen } from './screens/auth/LoginScreen';
import { RegisterScreen } from './screens/auth/RegisterScreen';
import { CompleteProfileScreen } from './screens/auth/CompleteProfileScreen';

// Civilian Screens
import { HomeScreen } from './screens/civilian/HomeScreen';
import { ChatbotScreen } from './screens/civilian/ChatbotScreen';
import { NewsScreen } from './screens/civilian/NewsScreen';
import { ImageUploaderScreen } from './screens/civilian/ImageUploaderScreen';
import { SOSScreen } from './screens/civilian/SOSScreen';

// Government Screens
import { GovHomeScreen } from './screens/government/GovHomeScreen';
import { ResourceManagerScreen } from './screens/government/ResourceManagerScreen';
import { PredictionScreen } from './screens/government/PredictionScreen';
import { InfrastructureReportsScreen } from './screens/government/InfrastructureReportsScreen';

// Lazy load maps as they are heavy
const MapScreen = React.lazy(() => import('./screens/civilian/MapScreen'));
const GovMapScreen = React.lazy(() => import('./screens/government/GovMapScreen'));

const LoadingFallback = () => (
  <div className="h-screen w-full flex items-center justify-center bg-bg">
    <Loader2 className="animate-spin text-primary" size={32} />
  </div>
);

const CivilianLayout = () => (
  <div className="min-h-screen bg-bg">
    <OfflineBanner />
    <Outlet />
    <CivilianNav />
  </div>
);

const GovLayout = () => (
  <div className="min-h-screen bg-bg">
    <OfflineBanner />
    <Outlet />
    <GovNav />
  </div>
);

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AccessibilityProvider>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<SplashScreen />} />
            <Route path="/onboarding" element={<OnboardingScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/register/complete-profile" element={<CompleteProfileScreen />} />

            {/* Civilian Protected Routes */}
            <Route 
              path="/civilian" 
              element={
                <ProtectedRoute requiredRole="civilian">
                  <CivilianLayout />
                </ProtectedRoute>
              }
            >
              <Route path="home" element={<HomeScreen />} />
              <Route path="map" element={
                <Suspense fallback={<LoadingFallback />}>
                  <MapScreen />
                </Suspense>
              } />
              <Route path="chat" element={<ChatbotScreen />} />
              <Route path="news" element={<NewsScreen />} />
              <Route path="upload" element={<ImageUploaderScreen />} />
              <Route path="sos" element={<SOSScreen />} />
            </Route>

            {/* Government Protected Routes */}
            <Route 
              path="/gov" 
              element={
                <ProtectedRoute requiredRole="government">
                  <GovLayout />
                </ProtectedRoute>
              }
            >
              <Route path="home" element={<GovHomeScreen />} />
              <Route path="map" element={
                <Suspense fallback={<LoadingFallback />}>
                  <GovMapScreen />
                </Suspense>
              } />
              <Route path="resources" element={<ResourceManagerScreen />} />
              <Route path="predictions" element={<PredictionScreen />} />
              <Route path="reports" element={<InfrastructureReportsScreen />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </AccessibilityProvider>
    </Router>
  );
}

export default App;
