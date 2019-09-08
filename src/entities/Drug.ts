import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToMany,
    OneToOne,
} from "typeorm";

import MolecularMechanism from "./MolecularMechanism"
import DevelopmentStatusSummary from "./DevelopmentStatusSummary";

@Entity("drug")
export default class Drug extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ name: "names_code", array: true, nullable: true })
    namesCode: string;

    @Column({ name: "names_brand", array: true, nullable: true })
    namesBrand: string

    @Column({ name: "names_generic", array: true, nullable: true })
    namesGeneric: string

    @ManyToMany(type => MolecularMechanism, molecularMechanism => molecularMechanism.drug, { nullable: true, cascade: true})
    molecularMechanism: MolecularMechanism[];

    @OneToOne(type => DevelopmentStatusSummary, developmentStatusSummary => developmentStatusSummary.drug, { nullable: true, cascade: true})
    @JoinColumn({ name: "developmentStatusSummary"})
    developmentStatusSummary: DevelopmentStatusSummary[];
}