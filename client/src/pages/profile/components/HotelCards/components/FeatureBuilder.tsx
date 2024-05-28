import { Button, Flex, Label, TextInput } from '@gravity-ui/uikit';
import React, { useState } from 'react';
import {
    useAddFeatureMutation,
    useDeleteFeatureMutation,
} from '~/store/features/hotels/hotelApi';
import { IFeature } from '~/store/features/hotels/types';

export const FeatureBuilder: React.FC<{
    hotelId: number;
    features?: IFeature[];
    refetchParent: () => void;
}> = ({ hotelId, features = [], refetchParent }) => {
    const [addFeature] = useAddFeatureMutation();
    const [deleteFeature] = useDeleteFeatureMutation();

    const [newFeature, setNewFeature] = useState<string>('');

    const handleDelete = async (id: number) => {
        await deleteFeature(id);
    };

    const handleCreate = async () => {
        await addFeature({ name: newFeature, hotelId });
        refetchParent();
    };

    return (
        <Flex direction="column" gap={2}>
            {features.map(({ id, name }) => (
                <Label
                    size="m"
                    key={id}
                    type="close"
                    onCloseClick={() => handleDelete(id)}
                >
                    {name}
                </Label>
            ))}

            <form>
                <Label theme="utility">
                    <TextInput
                        type="text"
                        placeholder="Бассейн с видом на горы"
                        value={newFeature}
                        onUpdate={(val) => setNewFeature(val)}
                    />
                </Label>
                <Button onClick={handleCreate} size="l">
                    Добавить признак
                </Button>
            </form>
        </Flex>
    );
};
