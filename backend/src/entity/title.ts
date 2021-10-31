import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'titles'})
export default class Title {
    @PrimaryColumn()
    emp_no: number

    @PrimaryColumn()
    title: string

    @PrimaryColumn()
    from_date: Date

    @Column()
    to_date: Date
}