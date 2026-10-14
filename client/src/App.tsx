import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { ExploreCreatorsPage } from './pages/public/ExploreCreatorsPage';
import { CreatorProfilePage } from './pages/public/CreatorProfilePage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { RoleSelectionPage } from './pages/auth/RoleSelectionPage';
import { ForBrandsPage } from './pages/brand/ForBrandsPage';
import { ForCreatorsPage } from './pages/creator/ForCreatorsPage';

// Layouts & Protection
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { ProtectedRoute } from './components/common/ProtectedRoutes';

// Brand Pages
import { BrandDashboardPage } from './pages/brand/BrandDashboardPage';
import { CreateBriefPage } from './pages/brand/CreateBriefPage';
import { BrandBriefsPage } from './pages/brand/BrandBriefsPage';
import { BriefMatchesPage } from './pages/brand/BriefMatchesPage';
import { BrandProposalsPage } from './pages/brand/BrandProposalsPage';
import { BrandCollaborationsPage } from './pages/brand/BrandCollaborationsPage';
import { SavedCreatorsPage } from './pages/brand/SavedCreatorsPage';

// Creator Pages
import { CreatorDashboardPage } from './pages/creator/CreatorDashboardPage';
import { CreatorPortfolioPage } from './pages/creator/CreatorPortfolioPage';
import { CreatorOpportunitiesPage } from './pages/creator/CreatorOpportunitiesPage';
import { CreatorProposalsPage } from './pages/creator/CreatorProposalsPage';
import { CreatorCollaborationsPage } from './pages/creator/CreatorCollaborationsPage';
import { CreatorProfileEditPage } from './pages/creator/CreatorProfileEditPage';

// Shared Pages
import { MessagesPage } from './pages/shared/MessagesPage';
import { NotificationsPage } from './pages/shared/NotificationsPage';
import { SettingsPage } from './pages/shared/SettingsPage';

export const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/how-it-works" element={<LandingPage />} />
      <Route path="/for-brands" element={<ForBrandsPage />} />
      <Route path="/for-creators" element={<ForCreatorsPage />} />
      <Route path="/explore" element={<ExploreCreatorsPage />} />
      <Route path="/creators/:handle" element={<CreatorProfilePage />} />
      <Route path="/creator-profile/:id" element={<CreatorProfilePage />} />
      <Route path="/creators/id/:id" element={<CreatorProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/role-select" element={<RoleSelectionPage />} />

      {/* Brand Protected Workspace */}
      <Route
        path="/brand"
        element={
          <ProtectedRoute allowedRoles={['brand']}>
            <DashboardLayout role="brand" />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/brand/dashboard" replace />} />
        <Route path="dashboard" element={<BrandDashboardPage />} />
        <Route path="create-brief" element={<CreateBriefPage />} />
        <Route path="briefs" element={<BrandBriefsPage />} />
        <Route path="briefs/:id/matches" element={<BriefMatchesPage />} />
        <Route path="proposals" element={<BrandProposalsPage />} />
        <Route path="collaborations" element={<BrandCollaborationsPage />} />
        <Route path="saved" element={<SavedCreatorsPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Creator Protected Workspace */}
      <Route
        path="/creator"
        element={
          <ProtectedRoute allowedRoles={['creator']}>
            <DashboardLayout role="creator" />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/creator/dashboard" replace />} />
        <Route path="dashboard" element={<CreatorDashboardPage />} />
        <Route path="portfolio" element={<CreatorPortfolioPage />} />
        <Route path="opportunities" element={<CreatorOpportunitiesPage />} />
        <Route path="proposals" element={<CreatorProposalsPage />} />
        <Route path="collaborations" element={<CreatorCollaborationsPage />} />
        <Route path="profile" element={<CreatorProfileEditPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
