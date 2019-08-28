import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToMany,
} from "typeorm";

import Organization from "./Organization";
import AdministrationRoute from "./AdministrationRoute";


@Entity("developmentStatusSummary")
export default class DevelopmentStatusSummary extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column() // could have its own entity
    condition: string;

    @Column() // could have its own entity
    highestPhase: string;

    @Column()
    conditionInActiveDevelopment: boolean;

    @Column()
    year: string;

    @ManyToMany(type => Organization, organization => organization.developmentStatusSummaries, { nullable: true, cascade: true})
    @JoinColumn({ name: "organization"})
    organizations: Organization[];

    @ManyToMany(type => AdministrationRoute, administrationRoute => administrationRoute.developmentStatusSummaries, { nullable: true, cascade: true})
    @JoinColumn({ name: "molecularMechanisms"})
    administrationRoutes: AdministrationRoute[];
}