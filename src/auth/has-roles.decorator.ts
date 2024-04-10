import { SetMetadata } from '@nestjs/common';
import { Role } from '../user/role.enum';

export const HasRoles = (...roles: Role[]) => {
    return SetMetadata('roles', roles)
};