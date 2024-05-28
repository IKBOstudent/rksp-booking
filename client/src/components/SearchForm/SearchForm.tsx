import { debounce } from 'lodash';
import { DatePicker } from '@gravity-ui/date-components';
import { DateTime, dateTime } from '@gravity-ui/date-utils';
import {
    Button,
    Flex,
    Icon,
    List,
    ListItemData,
    Popup,
    Text,
    TextInput,
} from '@gravity-ui/uikit';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    useSearchHotelsMutation,
    useSuggestHotelsMutation,
} from '~/store/features/hotels/hotelApi';
import {
    setOffers,
    setSearchParams,
    setSuggestions,
    suggestsSelector,
} from '~/store/features/hotels/hotelSearchSlice';
import { type ISuggestion } from '~/store/features/hotels/types';
import { useAppDispatch, useAppSelector } from '~/store/store';

import styles from './SearchForm.module.scss';
import { Hashtag, PaperPlane } from '@gravity-ui/icons';

interface FormData {
    destination: string;
    startDate: DateTime | null;
    endDate: DateTime | null;
    guestsCount: number;
}

export const SearchForm = () => {
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLInputElement>(null);

    const [search] = useSearchHotelsMutation();

    const [getSuggest] = useSuggestHotelsMutation();
    const suggests = useAppSelector(suggestsSelector);
    const [selectedRegion, setSelectedRegion] = useState<ISuggestion>();
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { isValid },
    } = useForm<FormData>({ shouldUnregister: false });

    const startDateField = watch('startDate') ?? undefined;

    const getInitialSuggests = async () => {
        const data = await getSuggest('').unwrap();
        dispatch(setSuggestions(data.suggestions));
    };

    useEffect(() => {
        getInitialSuggests();
    }, []);

    const onSubmit = async ({ startDate, endDate, guestsCount }: FormData) => {
        const checkInDate = startDate?.format('MM/DD/YYYY');
        const checkOutDate = endDate?.format('MM/DD/YYYY');

        if (!selectedRegion || !checkInDate || !checkOutDate) {
            return;
        }

        const searchParams = {
            regionId: selectedRegion.id,
            checkInDate,
            checkOutDate,
            guestsCount,
        };
        dispatch(setSearchParams(searchParams));

        const data = await search(searchParams).unwrap();
        dispatch(setOffers(data.hotels));
    };

    const handleDestinationUpdate = debounce(async (value: string) => {
        const data = await getSuggest(value).unwrap();
        dispatch(setSuggestions(data.suggestions));
    }, 300);

    const handleSuggestSelect = (item: ListItemData<ISuggestion>) => {
        setValue('destination', item.name);
        setSelectedRegion(item);
        setShowPopup(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex>
                <Controller
                    name="destination"
                    control={control}
                    rules={{ required: true }}
                    defaultValue=""
                    render={({ field }) => (
                        <TextInput
                            type="text"
                            size="xl"
                            pin="round-brick"
                            style={{ width: '30%' }}
                            placeholder="Москва"
                            label="Куда:"
                            hasClear
                            ref={ref}
                            value={field.value}
                            onUpdate={(value) => {
                                field.onChange(value);
                                handleDestinationUpdate(value);
                            }}
                            onBlur={() => setShowPopup(false)}
                            onFocus={() => setShowPopup(true)}
                        />
                    )}
                />

                <Popup
                    anchorRef={ref}
                    placement="bottom-start"
                    open={showPopup && suggests.length > 0}
                >
                    <List
                        items={suggests}
                        renderItem={(item) => (
                            <Flex alignItems="center">
                                <Icon data={PaperPlane} size={12} />
                                <Text
                                    variant="body-2"
                                    style={{ marginLeft: 6 }}
                                >
                                    {item.name}
                                </Text>
                            </Flex>
                        )}
                        onItemClick={handleSuggestSelect}
                        filterable={false}
                        virtualized={false}
                        itemHeight={32}
                        itemClassName={styles.popupItem}
                        className={styles.popupContainer}
                    />
                </Popup>

                <Controller
                    name="startDate"
                    control={control}
                    rules={{ required: true }}
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
                            minValue={startDateField}
                            disabled={!startDateField}
                            value={field.value}
                            onUpdate={field.onChange}
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
                            label="Гостей: "
                            onUpdate={(value) =>
                                field.onChange(
                                    Math.min(
                                        Math.max(parseInt(value, 10), 1),
                                        10,
                                    ),
                                )
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
                    disabled={!selectedRegion || !isValid}
                >
                    <Text variant="body-2">Найти</Text>
                </Button>
            </Flex>
        </form>
    );
};
