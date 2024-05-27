import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PasswordInput } from '@gravity-ui/components';
import { Alert, Button, Text, Flex, TextInput } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router-dom';
import URLs from '~/constants/URLs';
import { ILoginUserData } from '~/store/features/auth/types';

type LoginAuthFormProps = {
    isLoading: boolean;
    error: any;
    onSubmit: (userData: ILoginUserData) => Promise<void>;
};

export const LoginAuthForm: React.FC<LoginAuthFormProps> = ({
    isLoading,
    error,
    onSubmit,
}) => {
    const navigate = useNavigate();
    const {
        register: registerField,
        handleSubmit,
        reset,
        control,
        formState: { isValid },
    } = useForm<ILoginUserData>();

    const internalOnSubmit = async (data: ILoginUserData) => {
        await onSubmit(data);

        reset();
        navigate(URLs.HomeRoot);
    };

    return (
        <form onSubmit={handleSubmit(internalOnSubmit)}>
            <Flex gap={3} direction="column">
                {error && (
                    <Alert
                        theme="danger"
                        title="Ошибка"
                        message="Не удалось войти"
                    />
                )}
                <TextInput
                    {...registerField('email')}
                    size="xl"
                    type="email"
                    placeholder="Email"
                />
                <Controller
                    defaultValue=""
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <PasswordInput
                            value={field.value}
                            onUpdate={field.onChange}
                            size="xl"
                            placeholder="Пароль"
                        />
                    )}
                />
                <Button
                    size="xl"
                    view="action"
                    loading={isLoading}
                    type="submit"
                    disabled={!isValid}
                >
                    <Text variant="subheader-2">Войти</Text>
                </Button>
            </Flex>
        </form>
    );
};
