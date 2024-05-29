import {
    Button,
    Divider,
    Flex,
    Label,
    Text,
    TextInput,
} from '@gravity-ui/uikit';
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
    const [deleteFeature, { isLoading: isDeleting }] =
        useDeleteFeatureMutation();

    const [newFeature, setNewFeature] = useState<string>('');

    const handleDelete = async (id: number) => {
        await deleteFeature(id);
        refetchParent();
    };

    const handleCreate = async () => {
        await addFeature({ name: newFeature, hotelId });
        setNewFeature('');
        refetchParent();
    };

    return (
        <Flex direction="column" gap={2}>
            <Divider />
            <Text variant="body-3">Признаки</Text>
            <Flex gap={2}>
                {features.map(({ id, name }) => (
                    <div key={id} style={{ width: 'auto' }}>
                        <Label
                            size="m"
                            type="close"
                            onCloseClick={() => handleDelete(id)}
                            disabled={isDeleting}
                        >
                            {name}
                        </Label>
                    </div>
                ))}
            </Flex>

            <form>
                <Flex gap={4}>
                    <Label theme="utility" size="m">
                        <TextInput
                            view="clear"
                            type="text"
                            placeholder="Бассейн ..."
                            value={newFeature}
                            onUpdate={(val) => setNewFeature(val)}
                        />
                    </Label>
                    <Button onClick={handleCreate} size="m">
                        Добавить признак
                    </Button>
                </Flex>
            </form>
        </Flex>
    );
};
