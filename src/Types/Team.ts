import type { Group } from "./Group"

export type Team={
    id: number,
    name: string,
    code: string,
    flag: string,
    confederation:string,
    continent: string,
    groupId: number,
    group: Group,
    createdAt: Date,
    updatedAt: Date,
    flagImagePath:string
}
