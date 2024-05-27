import { Flex, Text } from '@gravity-ui/uikit';
import { HotelCard } from './components/HotelCard/HotelCard';
import { useAppSelector } from '~/store/store';
import { offersSelector } from '~/store/features/hotels/hotelSlice';

// const hotels: IHotel[] = [
//     {
//         id: 1,
//         name: 'Royal National Hotel',
//         image: '',
//         rating: 7.9,
//         price: 1200,
//         features: [
//             { name: 'Бесплатная отмена', value: true },
//             { name: 'Включен завтрак', value: true },
//         ],
//     },
//     {
//         id: 2,
//         name: 'Strand Palace Hotel',
//         image: '',
//         rating: 8.9,
//         price: 5200,
//         features: [
//             { name: 'Бесплатная отмена', value: true },
//             { name: 'Включен завтрак', value: true },
//         ],
//     },
// ];

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
