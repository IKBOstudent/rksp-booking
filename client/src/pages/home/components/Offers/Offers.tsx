import { Flex, Text } from '@gravity-ui/uikit';
import { HotelCard } from '~/components/HotelCard/HotelCard';
import { useAppSelector } from '~/store/store';
import { offersSelector } from '~/store/features/hotels/hotelSearchSlice';

export const Offers = () => {
    const offers = useAppSelector(offersSelector);

    return (
        <div>
            {offers.length === 0 && (
                <Text variant="header-1">
                    По данному запросу отелей не найдено
                </Text>
            )}
            <Flex gap={4} direction="column" style={{ padding: 16 }}>
                {offers.map(({ id, ...rest }) => (
                    <HotelCard key={id} {...rest} />
                ))}
            </Flex>
        </div>
    );
};
