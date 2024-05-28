import React from 'react';
import { Card, Container, Text } from '@gravity-ui/uikit';
import { Header } from '~/components/Header/Header';
import { SearchForm } from '~/components/SearchForm/SearchForm';

export const HomePage: React.FC = () => {
    return (
        <Container maxWidth="l">
            <Header />
            <Card view="raised" style={{ padding: 20, marginTop: 100 }}>
                <div style={{}}>
                    <Text variant="header-1">
                        Отели в России по выгодным ценам
                    </Text>
                </div>

                <div style={{ marginTop: 12 }}>
                    <SearchForm />
                </div>
            </Card>
        </Container>
    );
};
