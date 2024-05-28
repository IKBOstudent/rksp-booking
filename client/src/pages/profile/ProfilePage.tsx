import {
    Button,
    Card,
    Container,
    Divider,
    Flex,
    Icon,
    Label,
    Text,
    TextInput,
} from '@gravity-ui/uikit';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthSelector, logout } from '~/store/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '~/store/store';
import AdminTable from './components/AdminTable/AdminTable';
import { Header } from '~/components/Header/Header';
import { ArrowRightFromSquare } from '@gravity-ui/icons';
import URLs from '~/constants/URLs';
import Cookies from 'js-cookie';
import { HotelCards } from './components/HotelCards/HotelCards';

export const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(isAuthSelector);

    const handleLogout = useCallback(() => {
        dispatch(logout());
        Cookies.remove('jwt');
    }, []);

    if (!user) {
        navigate(URLs.Login);
        return;
    }

    const { name, email, role } = user;

    return (
        <Container maxWidth="m">
            <Header />
            <Flex
                direction="column"
                gap={2}
                style={{ marginTop: 48, marginBottom: 32 }}
            >
                <Flex gap={2} alignItems="center">
                    <Text variant="header-1">Профиль пользователя</Text>

                    {role === 'ADMIN' && <Label theme="danger">Админ</Label>}

                    {role === 'PARTNER' && (
                        <Label theme="warning">Отельер</Label>
                    )}
                </Flex>

                <TextInput size="l" label="Имя" defaultValue={name} />
                <TextInput size="l" label="Эл. почта " defaultValue={email} />
                <Button
                    onClick={handleLogout}
                    view="flat-danger"
                    selected
                    style={{ width: 'fit-content' }}
                >
                    Выйти из аккаунта
                    <Icon data={ArrowRightFromSquare} size={18} />
                </Button>
            </Flex>

            <Divider orientation="horizontal" />
            {role === 'ADMIN' && <AdminTable />}

            <Divider orientation="horizontal" />
            {role !== 'CLIENT' && <HotelCards />}
        </Container>
    );
};
