import { Card, Text } from '@gravity-ui/uikit';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

export const DateDisplay: React.FC = () => {
    const [date, setDate] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(moment().toDate().toString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Card>
            <Text variant="body-1">{date}</Text>
        </Card>
    );
};
