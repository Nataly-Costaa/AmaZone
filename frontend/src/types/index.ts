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

export interface Animal {
    id: string;
    nome: string;
    descricao: string;
    genero: string;
    popEstimada: number;
    nivelAmeaca: string;
}

export interface Plant {
    id: string;
    name: string;
    specie: string;
    botanicalDescription: string;
    naturalHabitat: string;
    benefits: string;
}

export interface AuthContextProps {
    user: User | null;
    loading: boolean;
    login: ({ email, password }: LoginRequest) => Promise<void>;
    logout: ()=>void
}