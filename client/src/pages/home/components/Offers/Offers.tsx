import { Flex, Text } from '@gravity-ui/uikit';
import { HotelCard } from '~/pages/home/components/HotelCard/HotelCard';
import { useAppSelector } from '~/store/store';
import { offersSelector } from '~/store/features/hotels/hotelSearchSlice';
import React from 'react';

export const Offers: React.FC = () => {
    const offers = useAppSelector(offersSelector);

    // if

    return (
        <div>
            {offers.length === 0 && (
                <Text variant="subheader-3">
                    По данному запросу отелей не найдено
                </Text>
            )}
            <Flex gap={4} direction="column" style={{ padding: 16 }}>
                {offers.map(({ id, ...rest }) => (
                    <HotelCard key={id} {...rest} />
                ))}
            </Flex>
        </div>
    );
};
