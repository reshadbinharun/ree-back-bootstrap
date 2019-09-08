import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinColumn
} from "typeorm";

import Drug from "./Drug"

@Entity("drugMechanism")
export default class MolecularMechanism extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Drug, drug => drug.molecularMechanism, { eager: true, nullable: true, cascade: true})
    @JoinColumn({ name: "molecularMechanisms"})
    drug: Drug[];
}