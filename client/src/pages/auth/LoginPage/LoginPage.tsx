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
        const data = await login(userData).unwrap();
        dispatch(setUser(data.user));
    };

    return (
        <Flex justifyContent="center">
            <Flex
                style={{ paddingTop: 48, minWidth: 240, width: 320 }}
                direction="column"
                gap={3}
            >
                <Text variant="header-1">Вход</Text>
                <LoginAuthForm
                    isLoading={isLoading}
                    error={error}
                    onSubmit={onSubmit}
                />
                <Text>
                    Новый пользователь?
                    <Link
                        to={URLs.Register}
                        style={{ marginLeft: 8, textDecoration: 'underline' }}
                    >
                        Зарегистрироваться
                    </Link>
                </Text>
            </Flex>
        </Flex>
    );
};
