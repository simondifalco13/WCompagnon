import { CafyGroup } from "./CafyGroup";
import { User } from "./User";

export interface GroupWithMembers {
    group: CafyGroup;
    members: User[];
}