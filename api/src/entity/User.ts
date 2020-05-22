import {
  Entity,
  PrimaryGeneratedColumn,
  Column, CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BaseEntity
} from "typeorm";

import bcrypt from 'bcryptjs';
import UserRole from "../config/UserRole";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  password: string

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.BASIC
  })
  userRole: UserRole

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword(){
    this.password = await bcrypt.hash(this.password, 8);
  }

  async checkPassword(plainPassword: string){
    const checked = await bcrypt.compare(plainPassword, this.password);
    this.hidePassword();
    return checked;
  }

  hidePassword(){
    delete this.password;
    return this;
  }
}
