export interface LoginRequest {
    email: string;
    password: string;
}
export interface RegisterRequest {
    name: string,
    email: string;
    password: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string
}

export interface AuthContextProps {
    user: User | null;
    loading: boolean;
    login: ({ email, password }: LoginRequest) => Promise<void>;
    logout: ()=>void
}