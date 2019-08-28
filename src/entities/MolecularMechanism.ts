import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
} from "typeorm";

import Drug from "./Drug"

@Entity("drugMechanism")
export default class MolecularMechanism extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mechanismName: string;

    @ManyToMany(type => Drug, drug => drug.molecularMechanism, { nullable: true, cascade: true})
    drug: Drug[];
}