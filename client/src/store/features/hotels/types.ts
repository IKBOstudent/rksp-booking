export interface IFeature {
    id: number;
    value: boolean;
    name: string;
}

export interface IHotel {
    id: number;
    name: string;
    region: string;
    imageUrl: string;
    rating: number;
    reviews: number;
    features: IFeature[];
    availableRoomsCount: number;
}

export interface IReservation {
    id: number;
    userId: number;
    hotelId: number;
    checkInDate: Date;
    checkOutDate: Date;
    guestsCount: number;
}

export interface ISearchParams {
    region: string;
    checkInDate: Date;
    checkOutDate: Date;
    guestsCount: number;
}

export interface IBookData {
    hotelId: number;
    checkInDate: Date;
    checkOutDate: Date;
    guestsCount: number;
}
