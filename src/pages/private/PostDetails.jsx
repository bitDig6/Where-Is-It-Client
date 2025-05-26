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

    const { imageUrl } = post;

    return (
        <div className='py-20'>
            <div className="w-4/5 mx-auto hero bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <img
                        src={imageUrl}
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                    <div>
                        <h1 className="text-5xl font-bold">Box Office News!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;