import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum Gender {
    M,
    F
}

@Entity({ name: "employees" })
export default class Employee {
    @PrimaryGeneratedColumn()
    emp_no: number;

    @Column({
        nullable: false
    })
    birth_date: Date

    @Column({
        nullable: false
    })
    first_name: string

    @Column({
        nullable: false
    })
    last_name: string

    @Column({
        nullable: false
    })
    gender: Gender

    @Column({
        nullable: false
    })
    hire_date: Date
}