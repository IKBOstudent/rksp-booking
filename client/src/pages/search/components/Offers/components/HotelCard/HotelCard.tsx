import { Button, Card, Flex, Icon, Label, Text } from '@gravity-ui/uikit';
import { ArrowUpRightFromSquare, Check, Link, Star } from '@gravity-ui/icons';
import { IHotel } from '~/store/features/hotels/types';

interface IHotelCardProps extends Omit<IHotel, 'id'> {}

const DEFAULT_HOTEL_IMAGE =
    'https://jkfenner.com/wp-content/uploads/2019/11/default.jpg';

export const HotelCard = ({
    name,
    rating,
    imageUrl,
    price,
    features,
}: IHotelCardProps) => {
    return (
        <Card view="filled" style={{ padding: 8 }}>
            <Flex gap={4}>
                <img
                    src={imageUrl}
                    alt="отель"
                    width={200}
                    height={200}
                    onError={({ currentTarget }) =>
                        (currentTarget.src = DEFAULT_HOTEL_IMAGE)
                    }
                />
                <Flex gap={3} direction="column">
                    <Flex centerContent gap={2} style={{ marginTop: 12 }}>
                        <Text variant="header-2">{name}</Text>
                        <Label
                            theme="warning"
                            icon={<Icon size={16} data={Star} />}
                        >
                            {rating}
                        </Label>
                    </Flex>
                    <Flex gap={2} direction="column">
                        {features.map(
                            ({ value, name }, index) =>
                                value && (
                                    <Label
                                        key={index}
                                        theme="success"
                                        icon={<Icon size={16} data={Check} />}
                                    >
                                        {name}
                                    </Label>
                                ),
                        )}
                    </Flex>
                    <Flex centerContent justifyContent="space-between">
                        <Text variant="display-1">{price} RUB</Text>
                    </Flex>
                    <Button view="normal" size="l">
                        <Text variant="subheader-1">Забронировать </Text>
                        <Icon data={ArrowUpRightFromSquare} size={18} />
                    </Button>
                </Flex>
            </Flex>
        </Card>
    );
};
