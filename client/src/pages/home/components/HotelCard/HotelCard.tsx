import { Button, Card, Flex, Icon, Label, Text } from '@gravity-ui/uikit';
import { ArrowUpRightFromSquare } from '@gravity-ui/icons';
import { IHotel } from '~/store/features/hotels/types';
import React from 'react';
import URLs from '~/constants/URLs';
import { Link } from 'react-router-dom';

const DEFAULT_HOTEL_IMAGE =
    'https://jkfenner.com/wp-content/uploads/2019/11/default.jpg';

export const HotelCard: React.FC<IHotel> = ({
    id,
    name,
    images,
    rating,
    features = [],
    rooms = [],
}) => {
    return (
        <Card view="filled" overflow="hidden">
            <Flex gap={4} alignItems="center">
                <img
                    src={images[0] || DEFAULT_HOTEL_IMAGE}
                    alt="отель"
                    width={220}
                    height={220}
                    style={{
                        objectFit: 'cover',
                    }}
                />
                <Flex gap={3} direction="column" style={{ padding: 16 }}>
                    <Flex alignItems="center" gap={2}>
                        <Text variant="header-2">{name}</Text>
                        <Label theme="info" size="s">
                            {rating}
                        </Label>
                    </Flex>
                    <Flex gap={2}>
                        {features.map(({ id, name }) => (
                            <div key={id} style={{ width: 'auto' }}>
                                <Label theme="success" size="m">
                                    {name}
                                </Label>
                            </div>
                        ))}
                    </Flex>
                    <Flex justifyContent="space-between">
                        {rooms.length > 0 && (
                            <Text variant="header-1">
                                от {rooms[0].nightPrice} RUB
                            </Text>
                        )}
                    </Flex>

                    <Link to={`${URLs.Hotel}/${id}`}>
                        <Button
                            view="action"
                            size="l"
                            style={{ width: 'fit-content' }}
                        >
                            <Text variant="body-2">Забронировать номер</Text>
                            <Icon data={ArrowUpRightFromSquare} size={18} />
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </Card>
    );
};
