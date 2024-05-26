import { DatePicker } from '@gravity-ui/date-components';
import { DateTime, dateTime } from '@gravity-ui/date-utils';
import { Button, Card, Flex, TextInput } from '@gravity-ui/uikit';
import { Controller, useForm } from 'react-hook-form';

interface FormData {
    destination: string;
    startDate: DateTime | null;
    endDate: DateTime | null;
    guestsCount: number;
}

export const SearchForm = () => {
    const { control, getValues, handleSubmit } = useForm<FormData>();

    console.log(getValues());
    return (
        <Card view="filled" style={{ padding: 16 }}>
            <form onSubmit={handleSubmit(console.log)}>
                <Flex>
                    <Controller
                        name="destination"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextInput
                                type="text"
                                size="l"
                                placeholder="Москва"
                                label="Куда:"
                                pin="round-brick"
                                style={{ width: '30%' }}
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="startDate"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <DatePicker
                                size="l"
                                placeholder="Дата заезда"
                                pin="brick-brick"
                                style={{ width: '20%' }}
                                minValue={dateTime()}
                                onUpdate={field.onChange}
                                value={field.value}
                            />
                        )}
                    />
                    <Controller
                        name="endDate"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <DatePicker
                                size="l"
                                placeholder="Дата выезда"
                                pin="brick-brick"
                                style={{ width: '20%' }}
                                minValue={getValues().startDate ?? undefined}
                                disabled={!getValues().startDate}
                                onUpdate={field.onChange}
                                value={field.value}
                            />
                        )}
                    />
                    <Controller
                        name="guestsCount"
                        control={control}
                        defaultValue={2}
                        render={({ field }) => (
                            <TextInput
                                type="number"
                                size="l"
                                label="Гостей:"
                                pin="brick-brick"
                                style={{ width: '20%' }}
                                onChange={field.onChange}
                                value={field.value.toString()}
                            />
                        )}
                    />

                    <Button
                        pin="brick-round"
                        size="l"
                        view="action"
                        style={{ width: '10%' }}
                    >
                        Найти
                    </Button>
                </Flex>
            </form>
        </Card>
    );
};
