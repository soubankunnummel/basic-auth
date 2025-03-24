
import authService from "@/services/auth";
import { AuthResponse, User } from "@/types/User";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useAdminRegister = (): UseMutationResult<AuthResponse, Error, User> => {
    return useMutation({
      mutationKey: ["register"],
      mutationFn: authService.register,
    });
  };

export const useAdminLogin = (): UseMutationResult<AuthResponse, Error, User> => {
    return useMutation({
      mutationKey: ["login"],
      mutationFn: authService.login,
    });
  };
 

export const useLogout = (): any => {
    return useMutation({
      mutationKey: ["logout"],
      mutationFn: authService.logout,
    });
  }
