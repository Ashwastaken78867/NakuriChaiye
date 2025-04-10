import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar' // Shared navbar component
import ApplicantsTable from './ApplicantsTable' // Table displaying applicant data
import axios from 'axios'; // Axios for HTTP requests
import { APPLICATION_API_END_POINT } from '@/utils/constant'; // API base URL constant
import { useParams } from 'react-router-dom'; // Hook to get route parameters
import { useDispatch, useSelector } from 'react-redux'; // Redux hooks
import { setAllApplicants } from '@/redux/applicationSlice'; // Redux action to set applicant data

const Applicants = () => {
    const params = useParams(); // Get job ID from URL
    const dispatch = useDispatch(); // Used to dispatch Redux actions
    const { applicants } = useSelector(store => store.application); // Accessing applicants from Redux store

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                // API call to fetch applicants based on job ID
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                // Store the fetched applicant data in Redux
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error); // Log errors if request fails
            }
        };

        fetchAllApplicants(); // Call fetch function once on component mount
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                {/* Display applicant count dynamically */}
                <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length}</h1>
                <ApplicantsTable />
            </div>
        </div>
    );
};

export default Applicants;
