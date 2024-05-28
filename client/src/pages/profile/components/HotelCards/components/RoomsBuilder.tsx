import React from 'react';
import {
    useAddRoomMutation,
    useDeleteRoomMutation,
} from '~/store/features/hotels/hotelApi';
import { IRoom } from '~/store/features/hotels/types';

export const RoomsBuilder: React.FC<{
    hotelId: number;
    rooms?: IRoom[];
}> = ({ hotelId, rooms }) => {
    const [addRoom] = useAddRoomMutation();
    const [deleteRoom] = useDeleteRoomMutation();

    return <div>{JSON.stringify(rooms)}</div>;
};
