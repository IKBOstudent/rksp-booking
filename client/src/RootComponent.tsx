import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import URLs from './constants/URLs';
import { NotFoundPage } from './pages/error/NotFoundPage';
import { HomePage } from './pages/home/HomePage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { SearchPage } from './pages/search/SearchPage';
import { LoginPage } from './pages/auth/LoginPage/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage/RegisterPage';
import { useProfileQuery } from './store/features/auth/authApi';
import { useAppDispatch } from './store/store';
import { setUser } from './store/features/auth/authSlice';
import { BookingPage } from './pages/book/BookingPage';
import { MainLoader } from './components/MainLoader/MainLoader';
import { HotelPage } from './pages/hotel/HotelPage';

const RootComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const { data, isLoading } = useProfileQuery();

    useEffect(() => {
        if (data) {
            dispatch(setUser(data.user));
        }
    }, [data]);

    if (isLoading) {
        return <MainLoader />;
    }
    return (
        <Router>
            <Routes>
                <Route path={URLs.Login} element={<LoginPage />} />
                <Route path={URLs.Register} element={<RegisterPage />} />
                <Route path={URLs.HomeRoot} element={<HomePage />} />
                <Route path={URLs.ProfileRoot} element={<ProfilePage />} />
                <Route path={URLs.Search} element={<SearchPage />} />
                <Route path={`${URLs.Hotel}/:id`} element={<HotelPage />} />
                <Route path={URLs.Book} element={<BookingPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default RootComponent;
