import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useParams } from 'react-router';
import Loading from '../../components/shared/common/Loading';

const PostDetails = () => {
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();

    const { isPending, error, data: post } = useQuery({
        queryKey: ['post'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/items/${id}`);
            return res.data;
        }
    })

    if (isPending) {
        return <Loading></Loading>;
    }

    if (error) {
        return error.message;
    }

    console.log(post);

    return (
        <div className='w-11/12 mx-auto my-20 space-y-4 px-10'>
            <div className="card lg:card-side bg-base-100 shadow-sm">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                        alt="Album" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">New album is released!</h2>
                    <p>Click the button to listen on Spotiwhy app.</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Listen</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;