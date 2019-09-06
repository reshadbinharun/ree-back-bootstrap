import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity("domain_search")
export default class DomainSearch extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    relational_id: number;

    @Column()
    name: string;

    @Column({ name: "domain" })
    domain: string;
}