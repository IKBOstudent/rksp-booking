import { Text } from '@gravity-ui/uikit';
import { SearchForm } from '~/components/SearchForm/SearchForm';
import { Offers } from '../home/components/Offers/Offers';

export const SearchPage = () => {
    return (
        <div>
            {/* <Text variant='header-2'>Поиск отелей по выгодным ценам</Text> */}
            <SearchForm />
            {/* <Offers /> */}
        </div>
    );
};
