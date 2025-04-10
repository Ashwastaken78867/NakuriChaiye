import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (!query.trim()) return;
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    };

    return (
        <section className="text-center py-16 px-4 bg-white">
            <div className="max-w-3xl mx-auto flex flex-col gap-6">
                <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-[#F83002] text-sm font-semibold tracking-wide uppercase">
                    India’s Leading Job Search Platform
                </span>

                <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
                    Discover, Apply & <br />
                    Land Your <span className="text-[#6A38C2]">Dream Job</span>
                </h1>

                <p className="text-gray-600 text-lg">
                    We connect talented professionals with top companies across the country.
                    Search thousands of job listings tailored to your skills and goals.
                </p>

                <div className="flex items-center w-full max-w-xl mx-auto border border-gray-200 rounded-full shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-[#6A38C2]">
                    <input
                        type="text"
                        value={query}
                        placeholder="Search by job title, skill, or company"
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-grow px-5 py-3 text-gray-800 focus:outline-none"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="rounded-none rounded-r-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white px-5"
                        aria-label="Search Jobs"
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
