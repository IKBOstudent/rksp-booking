import {
    Button,
    Card,
    Divider,
    Flex,
    Label,
    Text,
    TextInput,
} from '@gravity-ui/uikit';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
    useAddRoomMutation,
    useDeleteRoomMutation,
} from '~/store/features/hotels/hotelApi';
import { IRoom, RoomPayload } from '~/store/features/hotels/types';

type FormData = {
    nightPrice: string;
    maximumGuests: string;
    type: string;
};

export const RoomsBuilder: React.FC<{
    hotelId: number;
    rooms?: IRoom[];
    refetchParent: () => void;
}> = ({ hotelId, rooms = [], refetchParent }) => {
    const [addRoom] = useAddRoomMutation();
    const [deleteRoom, { isLoading: isDeleting }] = useDeleteRoomMutation();

    const { register, handleSubmit, reset } = useForm<FormData>({
        shouldUnregister: false,
    });

    const handleDelete = async (id: number) => {
        await deleteRoom(id);
        refetchParent();
    };

    const handleCreate = async ({
        type,
        maximumGuests,
        nightPrice,
    }: FormData) => {
        await addRoom({
            type,
            maximumGuests: parseInt(maximumGuests, 10),
            nightPrice: parseInt(nightPrice, 10),
            hotelId,
        });
        reset();
        refetchParent();
    };

    return (
        <Flex direction="column" gap={2}>
            <Divider />
            <Text variant="body-3">Номера</Text>
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
                                view="outlined-danger"
                                onClick={() => handleDelete(id)}
                            >
                                Удалить номер
                            </Button>
                        </Flex>
                    </Card>
                ))}
            </Flex>

            <Card style={{ padding: 8, width: 'fit-content' }}>
                <form onSubmit={handleSubmit(handleCreate)}>
                    <Flex direction="column" gap={1}>
                        <TextInput
                            {...register('type')}
                            type="text"
                            placeholder="Двухместный номер ..."
                        />
                        <TextInput
                            {...register('maximumGuests')}
                            type="number"
                            placeholder="2"
                            defaultValue="2"
                            label="Мест: "
                        />
                        <TextInput
                            {...register('nightPrice')}
                            type="number"
                            placeholder="3000"
                            label="Цена в рублях: "
                        />

                        <Button type="submit" loading={isDeleting}>
                            Добавить номер
                        </Button>
                    </Flex>
                </form>
            </Card>
        </Flex>
    );
};
