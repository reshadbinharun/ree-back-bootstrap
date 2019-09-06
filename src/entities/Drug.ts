import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToMany,
} from "typeorm";

import MolecularMechanism from "./MolecularMechanism"

@Entity("drug")
export default class Drug extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mainName: string;

    @Column({ name: "names_code", array: true, nullable: true })
    namesCode: string;

    @Column({ name: "names_brand", array: true, nullable: true })
    namesBrand: string

    @Column({ name: "names_generic", array: true, nullable: true })
    namesGeneric: string

    @ManyToMany(type => MolecularMechanism, molecularMechanism => molecularMechanism.drug, { nullable: true, cascade: true})
    @JoinColumn({ name: "molecularMechanisms"})
    molecularMechanism: MolecularMechanism[];
}