import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PasswordInput } from '@gravity-ui/components';
import { Button, Checkbox, Flex, TextInput } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router-dom';
import URLs from '~/constants/URLs';

type AuthFormProps = {
  isLogin: boolean;
  isLoading: boolean;
  error: any;
  onSubmit: (data: UserData) => Promise<void>
};

export const AuthForm: React.FC<AuthFormProps> = ({ isLogin, isLoading, error, onSubmit }) => {
    const navigate = useNavigate();
  const { register: registerField, handleSubmit, reset, control, formState: {isValid} } = useForm<UserData>();

  const internalOnSubmit = async (data: UserData) => {
    try {
        await onSubmit(data);

        reset();
        navigate(URLs.HomeRoot)
    } catch {
        
    }
  }

  return (
    
    <form onSubmit={handleSubmit(internalOnSubmit)} style={{marginTop: 8}}>
        <Flex gap={2} direction="column">
      {!isLogin && (
        <>
          <TextInput {...registerField('name')} size="l"  type="text" placeholder="Name"  />
          <Checkbox {...registerField('role')} size="l" checked={false}>Отельер</Checkbox>
        </>
      )}
      <TextInput {...registerField('email')} size="l" type="email" placeholder="Email"  />
      <Controller defaultValue='' control={control} name="password" render={({field}) => <PasswordInput value={field.value} onUpdate={field.onChange} size="l"  placeholder="Password" />} />
      <Button  size="l" view="action" loading={isLoading} type="submit" disabled={!isValid}>
        {isLogin ? 'Login' : 'Register'}
      </Button>
      </Flex>
    </form>
  );
};
