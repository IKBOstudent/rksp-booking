import React from 'react';
import { Card, Container, Text } from '@gravity-ui/uikit';
import { Header } from '~/components/Header/Header';
import { SearchForm } from '~/components/SearchForm/SearchForm';
import { Offers } from './components/Offers/Offers';
import { useAppSelector } from '~/store/store';
import { searchParamsSelector } from '~/store/features/hotels/hotelSearchSlice';

export const HomePage: React.FC = () => {
    const searchParams = useAppSelector(searchParamsSelector);

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
            {searchParams && (
                <div style={{ marginTop: 24 }}>
                    <Offers />
                </div>
            )}
        </Container>
    );
};
