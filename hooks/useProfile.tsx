import ProfileService from "@/services/profile";
import { useQuery, UseQueryResult } from "@tanstack/react-query";



export const useProfile = (): UseQueryResult<any, Error> => {
    return useQuery({
        queryFn: ProfileService.getProfile,
        queryKey: ["profile"],
    });
};