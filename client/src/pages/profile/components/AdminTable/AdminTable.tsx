import { Loader, Table, withTableSelection } from '@gravity-ui/uikit';
import React from 'react';
import { useUsersQuery } from '~/store/features/auth/authApi';
import { IUser } from '~/store/features/auth/types';

const TableWithActions = withTableSelection(Table);

interface TableData {
    id: string;
    text: string;
}

const AdminTable = () => {
    const { data, error, isLoading } = useUsersQuery();
    const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

    const tableData: IUser[] = data?.users.map((user) => user) || [];
    const columns = [
        { id: 'id', name: 'Id' },
        { id: 'name', name: 'Name' },
        { id: 'email', name: 'Email' },
        { id: 'role', name: 'Role' },
    ];

    if (isLoading) {
        return <Loader size="m" />;
    }

    return (
        <div style={{ marginTop: 24 }}>
            <TableWithActions
                columns={columns}
                data={tableData}
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
            />
        </div>
    );
};

export default AdminTable;
