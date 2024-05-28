import { CirclePlus } from '@gravity-ui/icons';
import {
    Card,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Flex,
    Icon,
    Loader,
    Text,
    TextInput,
    useToaster,
} from '@gravity-ui/uikit';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    useAddHotelMutation,
    useGetOwnHotelsQuery,
} from '~/store/features/hotels/hotelApi';
import { HotelPayload } from '~/store/features/hotels/types';
import { FeatureBuilder } from './components/FeatureBuilder';
import { RoomsBuilder } from './components/RoomsBuilder';

const DEFAULT_HOTEL_IMAGE =
    'https://jkfenner.com/wp-content/uploads/2019/11/default.jpg';

type FormData = Omit<HotelPayload, 'images'>;

export const HotelCards: React.FC = () => {
    const toaster = useToaster();

    const { data, isLoading, refetch } = useGetOwnHotelsQuery();
    const [createHotel, { isLoading: isCreating }] = useAddHotelMutation();

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const { register, handleSubmit } = useForm<FormData>({
        shouldUnregister: false,
    });

    const hotels = data?.hotels;
    if (isLoading) {
        return (
            <Flex justifyContent="center" alignItems="center">
                <Loader />
            </Flex>
        );
    }

    const handleCreateHotel = async (data: FormData) => {
        try {
            await createHotel({ ...data, images: [] });

            toaster.add({
                name: 'Отель создан!',
                theme: 'success',
            });

            refetch();
        } catch (err) {
            toaster.add({
                name: 'Произошла ошибка...',
                theme: 'danger',
            });
        }

        setShowDialog(false);
    };

    return (
        <Flex style={{ marginTop: 16 }} direction="column" gap={6}>
            <Text variant="header-2">Мои Отели</Text>
            <Flex justifyContent="space-around">
                <Card
                    view="filled"
                    type="action"
                    onClick={() => setShowDialog(true)}
                >
                    <Flex
                        justifyContent="center"
                        alignItems="center"
                        style={{ width: 240, height: 300 }}
                    >
                        <Icon data={CirclePlus} size={30} />
                    </Flex>
                </Card>

                <Dialog
                    size="s"
                    open={showDialog}
                    onClose={() => setShowDialog(false)}
                >
                    <DialogHeader caption="Создание нового отеля" />
                    <DialogBody>
                        <form>
                            <Flex direction="column" gap={3}>
                                <TextInput
                                    {...register('name')}
                                    size="l"
                                    type="text"
                                    label="Название: "
                                    placeholder="Отель ..."
                                    disabled={isCreating}
                                />
                                <TextInput
                                    {...register('rating')}
                                    size="l"
                                    type="number"
                                    label="Рейтинг: "
                                    placeholder="5.5"
                                    disabled={isCreating}
                                />
                                <TextInput
                                    {...register('reviews')}
                                    size="l"
                                    type="text"
                                    label="Количество отзывов: "
                                    placeholder="777"
                                    disabled={isCreating}
                                />
                                <TextInput
                                    {...register('regionId')}
                                    size="l"
                                    type="number"
                                    label="id Региона: "
                                    placeholder="1"
                                    disabled={isCreating}
                                />
                            </Flex>
                        </form>
                    </DialogBody>
                    <DialogFooter
                        onClickButtonApply={() =>
                            handleSubmit(handleCreateHotel)()
                        }
                        onClickButtonCancel={() => setShowDialog(false)}
                        textButtonApply="Создать отель"
                        textButtonCancel="Отмена"
                    />
                </Dialog>

                {hotels &&
                    hotels.map((hotel) => (
                        <Card key={hotel.id} view="outlined" size="l">
                            <Flex>
                                <Text variant="body-2">{hotel.name}</Text>
                                <Text>{hotel.rating}</Text>
                                <img
                                    src={
                                        hotel?.images[0] || DEFAULT_HOTEL_IMAGE
                                    }
                                    alt="отель"
                                />
                                <FeatureBuilder
                                    hotelId={hotel.id}
                                    features={hotel.features}
                                    refetchParent={refetch}
                                />
                                <RoomsBuilder
                                    hotelId={hotel.id}
                                    rooms={hotel.rooms}
                                />
                            </Flex>
                        </Card>
                    ))}
            </Flex>
        </Flex>
    );
};
