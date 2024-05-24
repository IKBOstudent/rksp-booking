import React from 'react';
import { Card, Text } from '@gravity-ui/uikit';
import { SearchForm } from '~/components/SearchForm/SearchForm';

export const HomePage: React.FC = () => {
    return (
        <div>
            <SearchForm />
        </div>
    );
};
