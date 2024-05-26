import React from 'react';
import { useAppDispatch } from '~/store/store';
import { Card, Flex, Text } from '@gravity-ui/uikit';
import { useLoginMutation } from '~/store/features/auth/authApi';
import { setUser } from '~/store/features/auth/authSlice';
import { Link } from 'react-router-dom';
import URLs from '~/constants/URLs';
import { ILoginUserData } from '~/store/features/auth/types';
import { LoginAuthForm } from './components/LoginAuthForm';

export const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const [login, { isLoading, error }] = useLoginMutation();

    const onSubmit = async (userData: ILoginUserData) => {
        const user = await login(userData).unwrap();
        dispatch(setUser(user.user));
    };

    return (
        <Card
            style={{ padding: 12, marginTop: 48, maxWidth: 400 }}
            view="filled"
        >
            <Flex direction="column" gap={2}>
                <Text variant="header-1">Вход</Text>
                <LoginAuthForm
                    isLoading={isLoading}
                    error={error}
                    onSubmit={onSubmit}
                />
                <Text>
                    Новый пользователь?{' '}
                    <Link to={URLs.Register}>Зарегистрироваться</Link>
                </Text>
            </Flex>
        </Card>
    );
};
