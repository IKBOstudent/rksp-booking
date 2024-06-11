import React from 'react';
import { Flex, Label, Text } from '@gravity-ui/uikit';
import { IHotel } from '~/store/features/hotels/types';

export const HotelHeader: React.FC<{ hotel: IHotel }> = ({ hotel }) => {
    return (
        <div className="hotel-header">
            <Flex alignItems="center" gap={2}>
                <Text variant="header-2">{hotel.name}</Text>
                <Label theme="info" size="s">
                    {hotel.rating}
                </Label>
                <Text variant="subheader-1">{hotel.Region?.name}</Text>
            </Flex>
        </div>
    );
};
