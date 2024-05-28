import React from 'react';
import { IRoom } from '~/store/features/hotels/types';

export const HotelRooms: React.FC<{ rooms: IRoom[] }> = ({ rooms }) => {
    return <div>HotelRooms {JSON.stringify(rooms)}</div>;
};
