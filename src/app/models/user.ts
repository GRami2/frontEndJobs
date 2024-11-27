export interface User {
    id: number;
    fullName: string;
    profileTitle: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface UserRequestDTO {
    fullName: string;
    profileTitle: string;
    email: string;
    password: string; 
  }
  
  export interface UserResponseDTO {
    id: number;
    fullName: string;
    profileTitle: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  }