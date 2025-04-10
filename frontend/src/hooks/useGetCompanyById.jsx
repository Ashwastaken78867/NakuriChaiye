import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    const hasFetched = useRef(false); // Prevent multiple fetches in dev

    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
                    withCredentials: true
                });

                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                    console.log(res.data.company); // Only logs once
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (!hasFetched.current && companyId) {
            hasFetched.current = true;
            fetchSingleCompany();
        }
    }, [companyId, dispatch]);
};

export default useGetCompanyById;
