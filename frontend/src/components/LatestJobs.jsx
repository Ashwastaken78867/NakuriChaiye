import React, { useEffect } from 'react';
import LatestJobCards from './LatestJobsCards';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAllJobs } from '../redux/jobSlice';

const LatestJobs = () => {
    const dispatch = useDispatch();
    const { allJobs } = useSelector((store) => store.job);

    const fetchJobs = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/api/v1/job/get", { withCredentials: true });

            dispatch(setAllJobs(data.jobs));
        } catch (error) {
            console.error("Failed to fetch jobs", error);
        }
    };

    useEffect(() => {
        fetchJobs(); // Load jobs on component mount
    }, []);

    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    allJobs.length <= 0
                        ? <span>No Job Available</span>
                        : allJobs.slice(0, 6).map((job) => (
                            <LatestJobCards key={job._id} job={job} />
                        ))
                }
            </div>
        </div>
    );
};

export default LatestJobs;
