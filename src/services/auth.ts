import { AxiosResponse } from 'axios';
import api from './api';


interface AuthResponse {
    token: string;
  }

export async function SignInService(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return await api.post('login', {email, password});
  }

export function signOut(): void {
    localStorage.removeItem('web:token');
}
