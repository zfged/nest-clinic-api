// model/user.entity.ts
import { Role } from './role.enum';

export interface User {
    userId: number;
    username: string;
    password: string;
    roles: Role[];
}