import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
} from "typeorm";

import DevelopmentStatusSummary from "./DevelopmentStatusSummary"

@Entity("administrationRoute")
export default class AdministrationRoute extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    administrationRouteName: string;

    @ManyToMany(type => DevelopmentStatusSummary, developmentStatusSummary => developmentStatusSummary.administrationRoutes, { nullable: true, cascade: true})
    developmentStatusSummaries: DevelopmentStatusSummary[];
}