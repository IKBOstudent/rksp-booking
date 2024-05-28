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

export interface IFeature {
    id: number;
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

export interface IReservation {
    id: number;
    checkInDate: Date;
    checkOutDate: Date;
    userId: number;
    roomId: number;
}

export interface ISearchParams {
    regionId: number;
    checkInDate: string;
    checkOutDate: string;
    guestsCount: number;
}

export interface IBookData {
    roomId: number;
    checkInDate: Date;
    checkOutDate: Date;
}

export interface ISuggestion {
    id: number;
    name: string;
}
