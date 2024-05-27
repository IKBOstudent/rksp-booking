import { DatePicker } from '@gravity-ui/date-components';
import { DateTime, dateTime } from '@gravity-ui/date-utils';
import { Button, Card, Flex, TextInput } from '@gravity-ui/uikit';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSearchHotelsMutation } from '~/store/features/hotels/hotelApi';
import { setOffers } from '~/store/features/hotels/hotelSlice';
import { useAppDispatch } from '~/store/store';

interface FormData {
    destination: string;
    startDate: DateTime | null;
    endDate: DateTime | null;
    guestsCount: number;
}

export const SearchForm = () => {
    const dispatch = useAppDispatch();
    const [search, { isLoading }] = useSearchHotelsMutation();

    const { register, control, getValues, handleSubmit, setFocus } =
        useForm<FormData>();

    useEffect(() => {
        setFocus('destination');
    }, []);

    const onSubmit = async ({
        destination,
        startDate,
        endDate,
        guestsCount,
    }: FormData) => {
        const checkInDate = startDate?.format('MM/DD/YYYY');
        const checkOutDate = endDate?.format('MM/DD/YYYY');

        if (!checkInDate || !checkOutDate) {
            return;
        }

        const searchParams = {
            region: destination,
            checkInDate,
            checkOutDate,
            guestsCount,
        };
        console.log(searchParams);

        const data = await search(searchParams).unwrap();
        dispatch(setOffers(data.hotels));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex>
                <TextInput
                    type="text"
                    size="xl"
                    pin="round-brick"
                    style={{ width: '30%' }}
                    placeholder="Москва"
                    label="Куда:"
                    {...register('destination')}
                />

                <Controller
                    name="startDate"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                        <DatePicker
                            size="xl"
                            pin="brick-brick"
                            style={{ width: '20%' }}
                            placeholder="Дата заезда"
                            minValue={dateTime()}
                            value={field.value}
                            onUpdate={field.onChange}
                        />
                    )}
                />
                <Controller
                    name="endDate"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={null}
                    render={({ field }) => (
                        <DatePicker
                            size="xl"
                            pin="brick-brick"
                            style={{ width: '20%' }}
                            placeholder="Дата выезда"
                            value={field.value}
                            onUpdate={field.onChange}
                            minValue={getValues('startDate') ?? undefined}
                            disabled={getValues('startDate') === null}
                        />
                    )}
                />
                <Controller
                    name="guestsCount"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={2}
                    render={({ field }) => (
                        <TextInput
                            type="number"
                            size="xl"
                            pin="brick-brick"
                            style={{ width: '20%' }}
                            label="Гостей:"
                            onUpdate={(value) =>
                                field.onChange(parseInt(value, 10))
                            }
                            value={field.value.toString()}
                        />
                    )}
                />

                <Button
                    type="submit"
                    pin="brick-round"
                    size="xl"
                    view="action"
                    style={{ width: '10%' }}
                    loading={isLoading}
                >
                    Найти
                </Button>
            </Flex>
        </form>
    );
};
