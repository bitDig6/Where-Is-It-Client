import React from 'react';
import LFItemsForm from '../../components/shared/LfItems/LFItemsForm';
import useDynamicTitle from '../../hooks/useDynamicTitle';

const AddItems = () => {
    const addDynamicTitle = useDynamicTitle();
    addDynamicTitle('Add Item');

    return (
        <div className='min-h-screen py-20 bg-gradient-to-r from-[#FFC7C7] to-[#EDFFBB]'>
            <h2 className='font-inter text-black text-3xl font-bold text-center mb-5'>Report A Lost Or Found Item</h2>
            <LFItemsForm></LFItemsForm>
        </div>
    );
};

export default AddItems;