import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
} from "typeorm";

import DevelopmentStatusSummary from "./DevelopmentStatusSummary"

@Entity("organization")
export default class Organization extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    organizationName: string;

    @ManyToMany(type => DevelopmentStatusSummary, developmentStatusSummary => developmentStatusSummary.organizations, { nullable: true, cascade: true})
    developmentStatusSummaries: DevelopmentStatusSummary[];
}