import React from 'react';
import {AuthForm} from '../components/AuthForm/AuthForm';
import { useAppDispatch } from '~/store/store';
import { Card, Container, Text } from '@gravity-ui/uikit';
import { useLoginMutation } from '~/store/features/auth/authApi';
import { setUser } from '~/store/features/auth/authSlice';

export const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const [login, { isLoading, error }] = useLoginMutation();

    const onSubmit = async ({email, password}: UserData) => {
        console.log(email, password)
        const user = await login({ email, password }).unwrap();
        dispatch(setUser(user.user));
      };
      
  return (
    <Card style={{padding: 12, marginTop: 48, maxWidth: 340}} view='filled'>
      <Text variant='header-1'>Login</Text>
      <AuthForm isLogin={true} isLoading={isLoading} error={error} onSubmit={onSubmit}/>
    </Card>
  );
};
