import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PasswordInput } from '@gravity-ui/components';
import { Alert, Button, Checkbox, Flex, TextInput } from '@gravity-ui/uikit';
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
        try {
            await onSubmit(data);

            reset();
            navigate(URLs.HomeRoot);
        } catch {
            // ignore
        }
    };

    return (
        <form onSubmit={handleSubmit(internalOnSubmit)}>
            <Flex gap={2} direction="column">
                {error && (
                    <Alert
                        theme="danger"
                        title="Ошибка"
                        message="Не удалось войти"
                    />
                )}
                <TextInput
                    {...registerField('email')}
                    size="l"
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
                            size="l"
                            placeholder="Пароль"
                        />
                    )}
                />
                <Button
                    size="l"
                    view="action"
                    loading={isLoading}
                    type="submit"
                    disabled={!isValid}
                >
                    Войти
                </Button>
            </Flex>
        </form>
    );
};
