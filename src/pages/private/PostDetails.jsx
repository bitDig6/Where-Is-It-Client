import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useParams } from 'react-router';
import Loading from '../../components/shared/common/Loading';
import RecoveryModal from '../../components/shared/LfItems/RecoveryModal';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';

const PostDetails = () => {
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const queryClient = useQueryClient();
    const { user } = useAuth();

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

    const { title, postType, userName, userEmail, imageUrl, category, location, date, description, isRecovered } = post;

    const handleItemRecovery = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const recoveryData = {
            title,
            imageUrl,
            category,
            description,
            recoveryLocation: Object.fromEntries(formData.entries()),
            userName: user.displayName,
            userEmail: user.email
        };

        const newItemData = {
            title,
            postType,
            imageUrl,
            category,
            location,
            date,
            description,
            isRecovered: true
        };

        axiosSecure.patch(`/items/${id}`, newItemData)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    queryClient.invalidateQueries(['post']);
                    axiosSecure.post(`/allRecovered`, recoveryData)
                        .then(res => {
                            if (res.data.insertedId) {
                               toast.success('Item Recover Successful')
                            }
                        }).catch(error => {
                            toast.error(error.message);
                        })
                }
            }).catch (error => {
                toast.error(error.message);
            })

    }

    return (
        <div className='py-20 min-h-screen bg-gradient-to-br from-[#FFC7C7] to-[#EDFFBB]'>
            {/* post details */}
            <div className="w-4/5 mx-auto hero text-black rounded-lg">
                <div className="hero-content flex-col lg:flex-row gap-10">
                    <img
                        src={imageUrl}
                        className="w-96 rounded-lg shadow-2xl"
                    />
                    <div>
                        <h1 className="text-3xl font-bold text-center font-inter">{title}</h1>
                        <p className="text-lg py-6 font-medium text-gray-600">
                            {description}
                        </p>
                        <div className='space-y-2 pb-6'>
                            <p>
                                <span className='font-semibold'>Post Type: </span>{postType}
                            </p>
                            <p>
                                <span className='font-semibold'>Posted By: </span>
                                {userName}
                            </p>
                            <p>
                                <span className='font-semibold'>User Email: </span>
                                {userEmail}
                            </p>
                            <p>
                                <span className='font-semibold'>Item Category: </span>
                                {category}
                            </p>
                            <p>
                                <span className='font-semibold'>
                                    {(postType === 'lost' ? 'Lost' : 'Found') + ' Location: '}
                                </span>
                                {location}
                            </p>
                            <p>
                                <span className='font-semibold'>{(postType === 'lost' ? 'Lost' : 'Found') + ' Date: '}</span>
                                {date}
                            </p>
                            <p>
                                <span className='font-semibold'>Status: </span>
                                {isRecovered ? 'Recovered' : 'Not Recovered'}
                            </p>
                        </div>
                        <div className='flex justify-center'>
                            <button onClick={() => document.getElementById('dialog').showModal()} className="w-full md:w-3/5 btn lg:btn-lg btn-primary bg-linear-65 from-red-200 to-orange-400 text-black">
                                {postType === 'Lost' ? 'Found This!' : 'This is Mine!'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <RecoveryModal
                isRecovered={post.isRecovered}
                handleItemRecovery={handleItemRecovery}
            >
            </RecoveryModal>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default PostDetails;