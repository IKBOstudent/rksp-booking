import { Button, Card, Flex, Icon, Label, Text } from '@gravity-ui/uikit';
import { ArrowUpRightFromSquare, Check, Link, Star } from '@gravity-ui/icons';
import { IHotel } from '~/store/features/hotels/types';
import React from 'react';

interface IHotelCardProps extends Omit<IHotel, 'id'> {}

const DEFAULT_HOTEL_IMAGE =
    'https://jkfenner.com/wp-content/uploads/2019/11/default.jpg';

export const HotelCard: React.FC<IHotelCardProps> = ({
    name,
    images,
    rating,
    features,
    rooms,
}) => {
    return (
        <Card view="filled" style={{ padding: 8 }}>
            <Flex gap={4}>
                <img
                    src={images[0]}
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
                        {features.map(({ name }, index) => (
                            <Label
                                key={index}
                                theme="success"
                                icon={<Icon size={16} data={Check} />}
                            >
                                {name}
                            </Label>
                        ))}
                    </Flex>
                    <Flex centerContent justifyContent="space-between">
                        <Text variant="header-1">
                            от {rooms[0].nightPrice} RUB
                        </Text>
                    </Flex>

                    <Button view="action" size="l">
                        <Text variant="subheader-1">Открыть</Text>
                        <Icon data={ArrowUpRightFromSquare} size={18} />
                    </Button>
                </Flex>
            </Flex>
        </Card>
    );
};
