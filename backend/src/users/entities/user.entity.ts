import { Role } from "src/common/enums/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users', schema: 'secman' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
    email: string | null;

    @Column({ type: 'varchar', length: 255, nullable: true })
    password: string | null;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role;

    @Column({ name: 'name', type: 'varchar', length: 255, nullable: true })
    name?: string;

    @Column({ name: 'nip', type: 'varchar', length: 255, nullable: true })
    nip?: string;

    @Column({ name: 'avatar', type: 'varchar', length: 255, nullable: true })
    avatar?: string;
}
