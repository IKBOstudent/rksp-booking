import React from 'react';
import { useAppDispatch } from '~/store/store';
import { Card, Flex, Text } from '@gravity-ui/uikit';
import { useRegisterMutation } from '~/store/features/auth/authApi';
import { setUser } from '~/store/features/auth/authSlice';
import { Link } from 'react-router-dom';
import URLs from '~/constants/URLs';
import { IRegisterUserData } from '~/store/features/auth/types';
import { RegisterAuthForm } from './components/RegisterAuthForm';

export const RegisterPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [register, { isLoading, error }] = useRegisterMutation();

    const onSubmit = async (userData: IRegisterUserData) => {
        const user = await register(userData).unwrap();
        dispatch(setUser(user.user));
    };

    return (
        <Card
            style={{ padding: 12, marginTop: 48, maxWidth: 400 }}
            view="filled"
        >
            <Flex direction="column" gap={2}>
                <Text variant="header-1">Создание аккаунта</Text>
                <RegisterAuthForm
                    isLoading={isLoading}
                    error={error}
                    onSubmit={onSubmit}
                />
                <Text style={{ marginTop: 8 }}>
                    Уже есть аккаунт? <Link to={URLs.Login}>Войти</Link>
                </Text>
            </Flex>
        </Card>
    );
};
