import { Button, useToaster } from '@gravity-ui/uikit';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import URLs from '~/constants/URLs';
import { useBookHotelMutation } from '~/store/features/hotels/hotelApi';

export const BookingPage = () => {
    const { roomId, checkInDate, checkOutDate } = useParams();
    const navigate = useNavigate();

    const toaster = useToaster();

    const [bookHotel, { isLoading, error }] = useBookHotelMutation();

    const onSubmit = async () => {
        try {
            if (roomId && checkInDate && checkOutDate) {
                await bookHotel({
                    roomId: parseInt(roomId, 10),
                    checkInDate,
                    checkOutDate,
                }).unwrap();

                toaster.add({
                    name: 'bookSuccess',
                    title: 'Бронь успешна',
                    theme: 'success',
                });

                navigate(URLs.HomeRoot);
            }
        } catch (error) {
            toaster.add({
                name: 'bookFailure',
                title: 'Произошла ошибка',
                theme: 'danger',
            });
        }
    };
    return (
        <div>
            <Button onClick={onSubmit} type="submit" disabled={isLoading}>
                Book
            </Button>
        </div>
    );
};
