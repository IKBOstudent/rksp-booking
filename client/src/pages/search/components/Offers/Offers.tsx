import { Flex } from '@gravity-ui/uikit';
import { HotelCard } from './components/HotelCard/HotelCard';
import { IOffer } from '~/types/search/types';

const hotels: IOffer[] = [
    {
        id: 1,
        name: 'Royal National Hotel',
        image: '',
        rating: 7.9,
        price: 1200,
        features: [
            { name: 'Бесплатная отмена', value: true },
            { name: 'Включен завтрак', value: true },
        ],
    },
    {
        id: 2,
        name: 'Strand Palace Hotel',
        image: '',
        rating: 8.9,
        price: 5200,
        features: [
            { name: 'Бесплатная отмена', value: true },
            { name: 'Включен завтрак', value: true },
        ],
    },
];

export const Offers = () => {
    return (
        <Flex gap={4} direction="column" style={{ padding: 16 }}>
            {hotels.map(({ id, ...rest }) => (
                <HotelCard key={id} {...rest} />
            ))}
        </Flex>
    );
};
