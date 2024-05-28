import { UserLabel, Button, Flex, Text } from '@gravity-ui/uikit';
import React from 'react';
import { Link } from 'react-router-dom';
import URLs from '~/constants/URLs';
import { isAuthSelector } from '~/store/features/auth/authSlice';
import { useAppSelector } from '~/store/store';

export const Header: React.FC = () => {
    const user = useAppSelector(isAuthSelector);

    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            style={{ padding: 12 }}
        >
            <Link to={URLs.HomeRoot}>
                <Text variant="header-1">Rksp-Booking</Text>
            </Link>
            {Boolean(user) ? (
                <Link to={URLs.ProfileRoot}>
                    <UserLabel>{user?.name}</UserLabel>
                </Link>
            ) : (
                <Link to={URLs.Login}>
                    <Button size="l">Войти</Button>
                </Link>
            )}
        </Flex>
    );
};
