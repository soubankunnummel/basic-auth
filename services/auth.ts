
import api from "@/lib/axios";
import { User } from "@/types/User";

// export default register;

const authService = {
  register: async (data: User) => {
    const response = await api.post(`auth/register`, data);
    
    return response.data;
  },

  login: async (data: User) => {
    console.log(data)
    const response = await api.post(`auth/login`, data);
    return response.data;
  },
};
export default authService;
