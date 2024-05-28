import React from 'react';
import { Card } from '@gravity-ui/uikit';

export const HotelImages: React.FC<{ images: string[] }> = ({ images }) => {
    return (
        <div className="hotel-images-carousel">
            {images.map((src, index) => (
                <div key={index}>
                    <img src={src} alt={'Hotel view ${index}'} />
                </div>
            ))}
        </div>
    );
};
