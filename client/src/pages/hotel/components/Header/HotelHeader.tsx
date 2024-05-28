import React from 'react';
import { Flex, Text } from '@gravity-ui/uikit';
import { IHotel } from '~/store/features/hotels/types';

export const HotelHeader: React.FC<{ hotel: IHotel }> = ({ hotel }) => {
    return (
        <div className="hotel-header">
            <Flex>
                <Text variant="header-2">{hotel.name}</Text>
                <div className="rating">
                    {/* <Rating value={hotel.rating} /> */}
                    <span>{hotel.rating}</span>
                </div>
                <Text variant="subheader-1">{hotel.Region.name}</Text>
            </Flex>
        </div>
    );
};
