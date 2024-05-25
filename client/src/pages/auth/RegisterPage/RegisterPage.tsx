import React from 'react';
import {AuthForm} from '../components/AuthForm/AuthForm';
import { useAppDispatch } from '~/store/store';
import { Card, Container, Text } from '@gravity-ui/uikit';
import { useRegisterMutation } from '~/store/features/auth/authApi';
import { setUser } from '~/store/features/auth/authSlice';

export const RegisterPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [register, { isLoading, error }] = useRegisterMutation();

    const onSubmit = async ({email, password, name, role}: UserData) => {
        const user = await register({name: name || 'default', email, password, role: role ? "PARTNER" : "CLIENT"}).unwrap();
        dispatch(setUser(user.user));
      };

    return (
        <Container maxWidth='s'>
    <Card style={{padding: 12}} view='filled'>
        <Text>Register</Text>
        <AuthForm isLogin={false} isLoading={isLoading} error={error} onSubmit={onSubmit}/>
      </Card>
      </Container>
    );
  };
