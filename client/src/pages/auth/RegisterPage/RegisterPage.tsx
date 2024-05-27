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
        const data = await register(userData).unwrap();
        dispatch(setUser(data.user));
    };

    return (
        <Flex justifyContent="center">
            <Flex
                style={{ paddingTop: 48, minWidth: 240, width: 320 }}
                direction="column"
                gap={3}
            >
                <Text variant="header-1">Создание аккаунта</Text>
                <RegisterAuthForm
                    isLoading={isLoading}
                    error={error}
                    onSubmit={onSubmit}
                />
                <Text>
                    Уже есть аккаунт?
                    <Link to={URLs.Login} style={{ marginLeft: 8 }}>
                        Войти
                    </Link>
                </Text>
            </Flex>
        </Flex>
    );
};
