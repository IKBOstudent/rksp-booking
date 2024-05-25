import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import URLs from './constants/URLs';
import { AuthPage } from './pages/auth/AuthPage';
import { NotFoundPage } from './pages/notFound/NotFoundPage';
import { HomePage } from './pages/home/HomePage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { SearchPage } from './pages/search/SearchPage';

const RootComponent: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path={URLs.AuthRoot} element={<AuthPage />} />
                <Route path={URLs.HomeRoot} element={<HomePage />} />
                <Route path={URLs.ProfileRoot} element={<ProfilePage />} />
                <Route path={URLs.Search} element={<SearchPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default RootComponent;
