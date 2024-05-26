import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PasswordInput } from '@gravity-ui/components';
import { Alert, Button, Checkbox, Flex, TextInput } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router-dom';
import URLs from '~/constants/URLs';
import { IRegisterUserData } from '~/store/features/auth/types';

type RegisterAuthFormProps = {
    isLoading: boolean;
    error: any;
    onSubmit: (userData: IRegisterUserData) => Promise<void>;
};

export const RegisterAuthForm: React.FC<RegisterAuthFormProps> = ({
    isLoading,
    error,
    onSubmit,
}) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { isValid },
    } = useForm<IRegisterUserData>();

    const internalOnSubmit = async (data: IRegisterUserData) => {
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
                        message="Не удалось создать пользователя"
                    />
                )}
                <TextInput
                    {...register('name')}
                    size="l"
                    type="text"
                    placeholder="Имя"
                />
                <TextInput
                    {...register('email')}
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
                <Checkbox {...register('isPartner')}>Отельер</Checkbox>
                <Button
                    size="l"
                    view="action"
                    loading={isLoading}
                    type="submit"
                    disabled={!isValid}
                >
                    Создать новый аккаунт
                </Button>
            </Flex>
        </form>
    );
};
