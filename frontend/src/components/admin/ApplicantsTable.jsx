import React from 'react'
// Importing table components
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
// Importing Popover components for action options
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react'; // Icon for the action trigger
import { useSelector } from 'react-redux'; // To access Redux state
import { toast } from 'sonner'; // Notification library
import { APPLICATION_API_END_POINT } from '@/utils/constant'; // API endpoint
import axios from 'axios'; // Axios for API calls

// Array for dropdown status actions
const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application); // Access applicant data from Redux

    // Function to update applicant status
    const statusHandler = async (status, id) => {
        console.log('called');
        try {
            axios.defaults.withCredentials = true; // Include cookies with request
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }); // API call to update status
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message); // Show success notification
            }
        } catch (error) {
            toast.error(error.response.data.message); // Show error notification
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <tr key={item._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {
                                        item.applicant?.profile?.resume 
                                            ? <a 
                                                className="text-blue-600 cursor-pointer" 
                                                href={item?.applicant?.profile?.resume} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                              >
                                                {item?.applicant?.profile?.resumeOriginalName}
                                              </a> 
                                            : <span>NA</span> // Show NA if no resume
                                    }
                                </TableCell>
                                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell> {/* Display only the date */}
                                <TableCell className="float-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal /> {/* Action icon */}
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {
                                                shortlistingStatus.map((status, index) => (
                                                    <div 
                                                        onClick={() => statusHandler(status, item?._id)} 
                                                        key={index} 
                                                        className='flex w-fit items-center my-2 cursor-pointer'
                                                    >
                                                        <span>{status}</span>
                                                    </div>
                                                ))
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable;
