export interface IHotel {
    id: number;
    name: string;
    regionId: number;
    images: string[];
    rating: number;
    reviews: number;
    features: IFeature[];
    rooms: IRoom[];
    Region: ISuggestion;
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

export type HotelPayload = Omit<IHotel, 'id' | 'features' | 'rooms' | 'Region'>;
export type FeaturePayload = Omit<IFeature, 'id'>;
export type RoomPayload = Omit<IRoom, 'id' | 'reservations'>;
export type BookPayload = Omit<IReservation, 'id' | 'userId'>;

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
