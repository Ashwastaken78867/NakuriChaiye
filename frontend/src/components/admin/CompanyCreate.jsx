import React, { useState } from 'react'
// Navbar for consistent top navigation
import Navbar from '../shared/Navbar'
// UI components for form inputs and labels
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
// Navigation hook from React Router
import { useNavigate } from 'react-router-dom'
// Axios for making API requests
import axios from 'axios'
// API endpoint constant
import { COMPANY_API_END_POINT } from '@/utils/constant'
// Toast notifications
import { toast } from 'sonner'
// Redux hook and action
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate(); // For programmatic navigation
    const dispatch = useDispatch(); // To update Redux store

    const [companyName, setCompanyName] = useState(); // State to hold input value

    // Function to register a new company
    const registerNewCompany = async () => {
        try {
            // Send POST request to register a company
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true // Send cookies with request (useful for authentication)
            });

            // If registration is successful
            if (res?.data?.success) {
                // Save the new company in the Redux store
                dispatch(setSingleCompany(res.data.company));
                // Show a success toast
                toast.success(res.data.message);
                // Redirect to the newly created company’s page
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error); // Log any errors to the console
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                {/* Header Text */}
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name? you can change this later.</p>
                </div>

                {/* Input field for company name */}
                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="JobHunt, Microsoft etc."
                    onChange={(e) => setCompanyName(e.target.value)}
                />

                {/* Action buttons */}
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate
