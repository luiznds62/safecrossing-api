import 'reflect-metadata';
import { Mapper } from '../../core/Mapper';
import { User } from '../../domain/user/User';

export interface UserDto {
  id: number;
  name: string;
  email: string;
  password: string;
}

export class UserMap extends Mapper<User> {
  toDomain(raw: any): User {
    return User.build({
      id: raw.id,
      name: raw.name,
      email: raw.email,
      password: raw.password
    });
  }

  toDTO(t: User): UserDto {
    return {
      id: t.getId(),
      name: t.getName(),
      email: t.getEmail(),
      password: t.getPassword()
    };
  }
}
