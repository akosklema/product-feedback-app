import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/auth/PrivateRoute';

import NewFeedbackPage from './pages/NewFeedbackPage';
import EditFeedbackPage from './pages/EditFeedbackPage';
import FeedbackDetailPage from './pages/FeedbackDetailPage';
import SuggestionsPage from './pages/SuggestionsPage';
import RoadmapPage from './pages/RoadmapPage';
import UserProfilePage from './pages/UserProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import FeedbackNotFoundPage from './pages/FeedbackNotFoundPage';
import NoPage from './pages/NoPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to ='/login' />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/forgot-password' element={<ForgotPasswordPage />} />
      <Route path='/reset-password/:resetPwToken' element={<ResetPasswordPage />} />
      <Route path='/suggestions' element={
        <PrivateRoute>
          <SuggestionsPage />
        </PrivateRoute>
      } />
      <Route path='/user-settings' element={
        <PrivateRoute>
          <UserProfilePage />
        </PrivateRoute>
      } />
      <Route path='/roadmap' element={
        <PrivateRoute>
          <RoadmapPage />
        </PrivateRoute>
      } />
      <Route path='/create-feedback' element={
        <PrivateRoute>
          <NewFeedbackPage />
        </PrivateRoute>
      } />
      <Route path='/feedbacks/:feedbackId' element={
        <PrivateRoute>
          <FeedbackDetailPage />
        </PrivateRoute>
      } />
      <Route path='/feedback-not-found' element={
        <PrivateRoute>
          <FeedbackNotFoundPage />
        </PrivateRoute>
      } />
      <Route path='/feedbacks/:feedbackId/edit' element={
        <PrivateRoute>
          <EditFeedbackPage />
        </PrivateRoute>
      } />
      <Route path='*' element={<NoPage />} />
    </Routes>
  );
};

export default App;