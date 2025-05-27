import React from 'react';

const useDynamicTitle = () => {
    const addPageTitle = (title) => {
        document.title = title;
    }

    return addPageTitle;
};

export default useDynamicTitle;