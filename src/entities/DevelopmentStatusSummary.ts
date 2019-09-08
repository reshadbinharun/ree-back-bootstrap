import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne
    // JoinColumn,
    // ManyToMany,
} from "typeorm";

import Drug from "./Drug"

// import Organization from "./Organization";
// import AdministrationRoute from "./AdministrationRoute";


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

    @Column({ name: "organizations", array: true, nullable: true })
    organizations: string;

    @Column({ name: "administrationRoutes", array: true, nullable: true })
    administrationRoutes: string;

    @OneToOne(type => Drug, drug => drug.developmentStatusSummary, { nullable: true, cascade: true})
    drug: Drug

    // when having separate entities
    // @ManyToMany(type => Organization, organization => organization.developmentStatusSummaries, { nullable: true, cascade: true})
    // @JoinColumn({ name: "organization"})
    // organizations: Organization[];

    // @ManyToMany(type => AdministrationRoute, administrationRoute => administrationRoute.developmentStatusSummaries, { nullable: true, cascade: true})
    // @JoinColumn({ name: "molecularMechanisms"})
    // administrationRoutes: AdministrationRoute[];
}