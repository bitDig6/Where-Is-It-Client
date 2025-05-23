import React from 'react';
import { Link } from 'react-router';

const LFItemCard = ({post}) => {
    const {_id, title, imageUrl, description, date} = post;

    return (
        <div className="card bg-base-100 shadow-sm">
            <figure className="px-10 pt-10">
                <img
                    src={imageUrl}
                    alt="item"
                    className="w-48 h-36 rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{title}</h2>
                <h4 className='font-bold'>{date}</h4>
                <p>{description}</p>
                <div className="card-actions">
                    <Link to={`/items/${_id}`}>
                    <button className="btn btn-primary">See Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LFItemCard;