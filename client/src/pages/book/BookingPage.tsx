import { Button } from '@gravity-ui/uikit';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import URLs from '~/constants/URLs';
import { useBookHotelMutation } from '~/store/features/hotels/hotelApi';

export const BookingPage = () => {
    const { hotelId, checkInDate, checkOutDate, guestsCount } = useParams();
    const navigate = useNavigate();

    const [bookHotel, { isLoading, error }] = useBookHotelMutation();

    const onSubmit = async () => {
        try {
            if (hotelId && checkInDate && checkOutDate) {
                await bookHotel({
                    hotelId: parseInt(hotelId, 10),
                    checkInDate: new Date(checkInDate),
                    checkOutDate: new Date(checkOutDate),
                    guestsCount: parseInt(guestsCount || '2', 10),
                }).unwrap();

                navigate(URLs.HomeRoot); // Redirect to home or any other page
            }
        } catch (error) {
            //
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
