import api from "@/lib/axios";


const ProfileService = {
    
    getProfile: async () => {
        const response = await api.get(`user/profile`);
        return response.data;
    } 
}

export default ProfileService;