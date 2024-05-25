export interface IFeature {
    value: boolean;
    name: string;
}

export interface IOffer {
    id: number;
    name: string;
    image: string;
    rating: number;
    price: number;
    features: IFeature[];
}
