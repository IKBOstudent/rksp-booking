import {
    Button,
    Card,
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
        <>
            <Header />
            <Card style={{ padding: 12 }}>
                <Flex direction="column" gap={1}>
                    <Text variant="header-1">
                        Профиль пользователя
                        {role === 'ADMIN' && (
                            <Label theme="danger">Админ</Label>
                        )}
                        {role === 'PARTNER' && (
                            <Label theme="warning">Отельер</Label>
                        )}
                    </Text>

                    <TextInput
                        view="clear"
                        size="xl"
                        label="Имя"
                        defaultValue={name}
                    />
                    <TextInput
                        view="clear"
                        size="xl"
                        label="Эл. почта "
                        defaultValue={email}
                    />
                    <Button
                        onClick={handleLogout}
                        view="outlined-danger"
                        style={{ width: 'fit-content' }}
                    >
                        Выйти из аккаунта{' '}
                        <Icon data={ArrowRightFromSquare} size={18} />
                    </Button>
                </Flex>
            </Card>
            {role === 'ADMIN' && <AdminTable />}
        </>
    );
};
