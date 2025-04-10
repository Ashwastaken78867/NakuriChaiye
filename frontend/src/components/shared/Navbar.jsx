import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';

import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true,
            });

            if (response.data.success) {
                dispatch(setUser(null));
                toast.success(response.data.message);
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Unable to logout. Please try again.');
        }
    };

    return (
        <header className="bg-white shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Brand Logo */}
                <Link to="/">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-800">
                        Naukri<span className="text-[#F83002]">Chaiye</span>
                    </h1>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-10">
                    <ul className="flex items-center gap-6 font-medium text-gray-700">
                        {user?.role === 'recruiter' ? (
                            <>
                                <li>
                                    <Link to="/admin/companies" className="hover:text-[#6A38C2]">
                                        Manage Companies
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/jobs" className="hover:text-[#6A38C2]">
                                        Posted Jobs
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/jobs" className="hover:text-[#6A38C2]">
                                        Job Listings
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/browse" className="hover:text-[#6A38C2]">
                                        Explore Careers
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Auth / User */}
                    {!user ? (
                        <div className="flex items-center gap-3">
                            <Link to="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">
                                    Create Account
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage
                                        src={user?.profile?.profilePhoto}
                                        alt="User Profile"
                                    />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-4 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto}
                                            alt="User Profile"
                                        />
                                    </Avatar>
                                    <div>
                                        <h4 className="text-lg font-semibold">{user?.fullname}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {user?.profile?.bio || "No bio available."}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm text-gray-700">
                                    {user?.role === 'student' && (
                                        <div className="flex items-center gap-2">
                                            <User2 size={18} />
                                            <Link to="/profile">
                                                <Button
                                                    variant="link"
                                                    className="p-0 h-auto text-sm"
                                                >
                                                    My Profile
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <LogOut size={18} />
                                        <Button
                                            variant="link"
                                            className="p-0 h-auto text-sm text-red-600"
                                            onClick={handleLogout}
                                        >
                                            Sign Out
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
