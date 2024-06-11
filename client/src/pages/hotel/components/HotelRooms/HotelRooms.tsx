import { Button, Card, Flex, Label, Text, useToaster } from '@gravity-ui/uikit';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import URLs from '~/constants/URLs';
import { useBookHotelMutation } from '~/store/features/hotels/hotelApi';
import { searchParamsSelector } from '~/store/features/hotels/hotelSearchSlice';
import { IRoom } from '~/store/features/hotels/types';
import { useAppSelector } from '~/store/store';

export const HotelRooms: React.FC<{ rooms: IRoom[] }> = ({ rooms }) => {
    const searchParams = useAppSelector(searchParamsSelector);
    const navigate = useNavigate();
    const toaster = useToaster();
    const [bookHotel, { isLoading, error }] = useBookHotelMutation();

    if (!searchParams) {
        return null;
    }

    const { checkInDate, checkOutDate } = searchParams;

    const onSubmit = async (roomId: number) => {
        try {
            if (roomId && checkInDate && checkOutDate) {
                await bookHotel({
                    roomId,
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
            <Flex gap={2}>
                {rooms.map(({ id, maximumGuests, type, nightPrice }) => (
                    <Card key={id} style={{ padding: 8, width: 'fit-content' }}>
                        <Flex direction="column" gap={2}>
                            <Label size="m">{type}</Label>
                            <Flex gap={1}>
                                <Text>Количество мест:</Text>
                                <Label theme="info">{maximumGuests}</Label>
                            </Flex>
                            <Flex gap={1}>
                                <Text>Цена за ночь:</Text>
                                <Label theme="warning">{nightPrice}</Label>
                            </Flex>
                            <Button
                                onClick={() => onSubmit(id)}
                                type="submit"
                                disabled={isLoading}
                            >
                                Забронировать
                            </Button>
                        </Flex>
                    </Card>
                ))}
            </Flex>
        </div>
    );
};
