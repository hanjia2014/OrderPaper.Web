import { Item, GroupItem } from './Items';

export class Section {
    IsFrontPage: boolean;
    IsIncluded: boolean;
    Name: string;
    Items: Array<Item>;
    Groups: Array<Array<Item>>;
    GroupItems: Array<GroupItem>;
    Details: string;
    Speeches: string;
    constructor() {
        this.Items = new Array<Item>();
        this.Groups = new Array<Array<Item>>();
        this.GroupItems = new Array<GroupItem>();
    }
}