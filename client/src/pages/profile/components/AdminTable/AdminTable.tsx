import {
    Divider,
    Flex,
    Loader,
    Table,
    TableActionConfig,
    Text,
    useToaster,
    withTableActions,
} from '@gravity-ui/uikit';
import React from 'react';
import {
    useDeleteMutation,
    useUsersQuery,
} from '~/store/features/auth/authApi';
import { EUserRole, IUser } from '~/store/features/auth/types';

const TableWithActions = withTableActions<IUser>(Table);

const AdminTable: React.FC = () => {
    const toaster = useToaster();

    const { data, isLoading } = useUsersQuery();
    const [deleteUser] = useDeleteMutation();

    const tableData: IUser[] = data?.users.map((user) => user) || [];
    const columns = [
        { id: 'id', name: 'Id' },
        { id: 'name', name: 'Name' },
        { id: 'email', name: 'Email' },
        { id: 'role', name: 'Role' },
    ];

    const handleDeleteUser = async (user: IUser) => {
        try {
            await deleteUser(user.id);
        } catch (err) {
            //
        }
    };

    const getRowActions = (user: IUser): TableActionConfig<IUser>[] => {
        if (user.role === EUserRole.ADMIN) {
            return [];
        }
        return [
            {
                text: 'Delete',
                handler: handleDeleteUser,
                theme: 'danger',
            },
        ];
    };

    if (isLoading) {
        return <Loader size="m" />;
    }

    return (
        <Flex direction="column" gap={2}>
            <Divider />
            <Text variant="subheader-3">Данные о пользователях</Text>
            <TableWithActions
                columns={columns}
                data={tableData}
                getRowActions={getRowActions}
            />
        </Flex>
    );
};

export default AdminTable;
