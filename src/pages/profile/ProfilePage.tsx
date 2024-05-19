import React from 'react';
import { Card, Text } from '@gravity-ui/uikit';
import { DateDisplay } from './components/DateDisplay';

export const ProfilePage: React.FC = () => {
    return (
        <Card>
            <Text>profile</Text>
            <DateDisplay />
        </Card>
    );
};
