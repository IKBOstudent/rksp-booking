import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import { HotelHeader } from './components/Header/HotelHeader';
import { HotelImages } from './components/HotelImages/HotelImages';
import { MainLoader } from '~/components/MainLoader/MainLoader';
import { Container, Flex, Icon, Label } from '@gravity-ui/uikit';
import { Check } from '@gravity-ui/icons';
import { HotelRooms } from './components/HotelRooms/HotelRooms';
import { useGetHotelQuery } from '~/store/features/hotels/hotelApi';
import { Header } from '~/components/Header/Header';

export const HotelPage: React.FC = () => {
    const { id = '' } = useParams();
    const navigate = useNavigate();
    const { data, error, isLoading } = useGetHotelQuery(parseInt(id, 10));

    if (isLoading) return <MainLoader />;
    const hotel = data?.hotel;
    if (!hotel) {
        return null;
    }
    // if (error) return navigate();

    //   const breadcrumbs = [
    //     { path: , label: 'Main page' },
    //     { path: /region/${hotel.region.id}, label: hotel.region.name },
    //     { path: /hotel/${hotel.id}, label: hotel.name },
    //   ];

    return (
        <Container maxWidth="m" className="hotel-page">
            <Header />
            {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
            <Flex>
                <HotelHeader hotel={hotel} />
            </Flex>
            <Flex direction="column">
                <HotelImages images={hotel.images} />
            </Flex>
            <Flex gap={2} direction="column">
                {hotel.features.map(({ name }, index) => (
                    <Label
                        key={index}
                        theme="success"
                        icon={<Icon size={16} data={Check} />}
                    >
                        {name}
                    </Label>
                ))}
            </Flex>

            <HotelRooms rooms={hotel.rooms} />
        </Container>
    );
};
