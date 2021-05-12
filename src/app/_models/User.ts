import { Role } from "./role";

export class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    role: Role;
    token?: string;
    authdata?: string;
    userId: number;
    userTypeId: number;
    fullName: string;
    isAutoPass: boolean;
    isApproved: boolean;
    isActive: boolean;
}