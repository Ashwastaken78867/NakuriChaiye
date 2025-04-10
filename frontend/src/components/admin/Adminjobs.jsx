import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar' // Navbar component
import { Input } from '../ui/input' // Custom Input UI component
import { Button } from '../ui/button' // Custom Button UI component
import { useNavigate } from 'react-router-dom' // Hook to navigate programmatically
import { useDispatch } from 'react-redux' // Redux hook to dispatch actions
import AdminJobsTable from './AdminJobsTable' // Table component for displaying jobs
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs' // Custom hook to fetch all admin jobs
import { setSearchJobByText } from '@/redux/jobSlice' // Redux action to filter jobs by text

const AdminJobs = () => {
  useGetAllAdminJobs(); // Fetch all jobs when component mounts

  const [input, setInput] = useState(""); // State to store input value
  const navigate = useNavigate(); // Navigate to other routes
  const dispatch = useDispatch(); // Dispatch actions to redux store

  useEffect(() => {
    dispatch(setSearchJobByText(input)); // Update job filter on input change
  }, [input]); // Dependency array ensures this runs when input changes

  return (
    <div>
      <Navbar /> {/* Navigation bar */}
      <div className='max-w-6xl mx-auto my-10'> {/* Centered container */}
        <div className='flex items-center justify-between my-5'>
          {/* Search input */}
          <Input
            className="w-fit"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)} // Update input state
          />
          {/* Button to navigate to job creation page */}
          <Button onClick={() => navigate("/admin/jobs/create")}>
            New Jobs
          </Button>
        </div>
        <AdminJobsTable /> {/* Display jobs in a table */}
      </div>
    </div>
  )
}

export default AdminJobs
