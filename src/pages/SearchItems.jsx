import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import Loading from '../components/shared/common/Loading';

const SearchItems = () => {
    const { search } = useParams();
    console.log(search);

    const { isPending, error, data: filteredItems} = useQuery({
        queryKey: ['filteredItems'],
        queryFn: async () => {
            const res = await axios.get(`https://where-is-it-server-xi.vercel.app/searchItem?search=${search}`);
            return (await res).data;
        }
    });

    if(isPending){
        return <Loading></Loading>
    }

    if(error){
        return error.message;
    }

    console.log(filteredItems);

    return (
        <div>
            search results
        </div>
    );
};

export default SearchItems;