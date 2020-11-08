import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity"
import { Question } from "./Question";
import { RequestOrder } from "./RequestOrder";

@Entity({ name: 'RequesAnswer' })
export class RequestOrderAnswer extends BaseEntity {

    @Column({ type: 'text', nullable: false })
    answer: string;

    @ManyToOne(() => RequestOrder, { eager: true })
    requesOrder: RequestOrder

    @ManyToOne(() => Question, { eager: true })
    question: Question
}
