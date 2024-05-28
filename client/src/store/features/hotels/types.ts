export interface IHotel {
    id: number;
    name: string;
    regionId: number;
    imageUrl: string;
    rating: number;
    reviews: number;
    features: IFeature[];
    rooms: IRoom[];
}

export interface IHotelData {
    name: string;
    regionId: number;
    imageUrl: string;
    rating: number;
    reviews: number;
}

export interface IFeature {
    id: number;
    name: string;
    hotelId: number;
}

export interface IFeatureData {
    name: string;
    hotelId: number;
}

export interface IRoom {
    id: number;
    nightPrice: number;
    maximumGuestsCount: number;
    hotelId: number;
    reservations: IReservation[];
}

export interface IRoomData {
    nightPrice: number;
    maximumGuestsCount: number;
    hotelId: number;
}

export interface IReservation {
    id: number;
    checkInDate: Date;
    checkOutDate: Date;
    userId: number;
    roomId: number;
}

export interface IReservationData {
    roomId: number;
    checkInDate: string;
    checkOutDate: string;
}

export interface ISearchParams {
    regionId: number;
    checkInDate: string;
    checkOutDate: string;
    guestsCount: number;
}

export interface ISuggestion {
    id: number;
    name: string;
}
