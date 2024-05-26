import React from 'react';
import { Card, Container, Text } from '@gravity-ui/uikit';
import { Header } from '~/components/Header/Header';

export const HomePage: React.FC = () => {
    return (
        <Container maxWidth="m">
            <Header />
            <Text>Homepage</Text>
        </Container>
    );
};
