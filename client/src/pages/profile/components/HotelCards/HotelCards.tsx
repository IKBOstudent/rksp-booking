import { CirclePlus, Plus, Star } from '@gravity-ui/icons';
import {
    Button,
    Card,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Divider,
    Flex,
    Icon,
    Label,
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

type FormData = {
    name: string;
    regionId: string;
    rating: string;
    reviews: string;
};

export const HotelCards: React.FC = () => {
    const toaster = useToaster();

    const { data, isLoading, refetch } = useGetOwnHotelsQuery();
    const [createHotel, { isLoading: isCreating }] = useAddHotelMutation();

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const { register, handleSubmit, reset } = useForm<FormData>({
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

    const handleCreateHotel = async ({
        name,
        rating,
        reviews,
        regionId,
    }: FormData) => {
        try {
            await createHotel({
                name,
                rating: parseFloat(rating),
                reviews: parseInt(reviews, 10),
                regionId: parseInt(regionId, 10),
                images: [],
            });

            toaster.add({
                name: 'hotelCreation',
                title: 'Отель создан!',
                theme: 'success',
            });
        } catch (err) {
            toaster.add({
                name: 'hotelCreationFailure',
                title: 'Произошла ошибка...',
                theme: 'danger',
            });
        }

        reset();
        refetch();
        setShowDialog(false);
    };

    return (
        <>
            <Divider />
            <Flex style={{ marginTop: 36 }} direction="column" gap={6}>
                <Flex justifyContent="space-between" alignItems="center">
                    <Text variant="header-2">Мои Отели</Text>
                    <Button
                        view="action"
                        size="l"
                        onClick={() => setShowDialog(true)}
                    >
                        Создать новый Отель <Icon data={Plus} size={16} />
                    </Button>
                </Flex>
                <Flex direction="column" gap={4} style={{ marginBottom: 40 }}>
                    {hotels &&
                        hotels.map((hotel) => (
                            <Card
                                key={hotel.id}
                                view="raised"
                                size="l"
                                style={{ padding: 16 }}
                            >
                                <Flex direction="column" gap={4}>
                                    <Flex
                                        alignItems="center"
                                        gap={2}
                                        style={{ marginTop: 12 }}
                                    >
                                        <Text variant="header-1">
                                            {hotel.name}
                                        </Text>
                                        <Label theme="success" size="s">
                                            {hotel.rating}
                                        </Label>
                                    </Flex>

                                    <Flex gap={2}>
                                        {hotel?.images.length > 0 ? (
                                            hotel.images
                                                .slice(0, 3)
                                                .map((src) => (
                                                    <img
                                                        src={src}
                                                        alt="отель"
                                                        width={120}
                                                        height={120}
                                                        style={{
                                                            objectFit: 'cover',
                                                        }}
                                                    />
                                                ))
                                        ) : (
                                            <img
                                                src={DEFAULT_HOTEL_IMAGE}
                                                alt="отель"
                                                width={150}
                                                height={150}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        )}
                                    </Flex>

                                    <FeatureBuilder
                                        hotelId={hotel.id}
                                        features={hotel.features}
                                        refetchParent={refetch}
                                    />
                                    <RoomsBuilder
                                        hotelId={hotel.id}
                                        rooms={hotel.rooms}
                                        refetchParent={refetch}
                                    />
                                </Flex>
                            </Card>
                        ))}
                </Flex>
            </Flex>

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
                    onClickButtonApply={() => handleSubmit(handleCreateHotel)()}
                    onClickButtonCancel={() => setShowDialog(false)}
                    textButtonApply="Создать отель"
                    textButtonCancel="Отмена"
                />
            </Dialog>
        </>
    );
};
