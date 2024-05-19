import React from 'react';
import { Card, Text } from '@gravity-ui/uikit';
import { Link } from 'react-router-dom';
import URLs from '~/constants/URLs';

export const NotFoundPage: React.FC = () => {
    return (
        <Card>
            <Text variant="header-1">Oops 404!</Text>
            <Link role="button" to={URLs.HomeRoot}>
                Link Homepage
            </Link>
        </Card>
    );
};
