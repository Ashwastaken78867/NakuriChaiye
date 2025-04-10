import React, { useEffect, useState } from 'react'
// Importing the Navbar component
import Navbar from '../shared/Navbar'
// UI components
import { Input } from '../ui/input'
import { Button } from '../ui/button'
// Table displaying company data
import CompaniesTable from './CompaniesTable'
// Hook for navigation
import { useNavigate } from 'react-router-dom'
// Custom hook to fetch all companies
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
// Redux utilities
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies(); // Call custom hook to fetch companies on component load

    const [input, setInput] = useState(""); // State for search input
    const navigate = useNavigate(); // Used to redirect user to the "create company" page
    const dispatch = useDispatch(); // Redux dispatch function

    // Effect to update the Redux store with current search text whenever `input` changes
    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div>
            <Navbar /> {/* Navigation bar at the top */}
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)} // Update search input on typing
                    />
                    <Button onClick={() => navigate("/admin/companies/create")}>
                        New Company {/* Navigate to company creation page */}
                    </Button>
                </div>
                <CompaniesTable /> {/* Component displaying companies in a table */}
            </div>
        </div>
    )
}

export default Companies;
