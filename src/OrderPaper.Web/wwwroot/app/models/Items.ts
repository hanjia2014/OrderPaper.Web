export class Item {
    Sequence: number;
    Type: string;
    Title: string;
    IsGroup: boolean;
    HasLine: boolean;
}

export class MotionItem extends Item {
    Date: Date;
    Summary: string;
    Member: string;
    Speeches: string;
    Motion: string;
    constructor() {
        super();
        this.Type = "Motion";
    }
}

export class BillItem extends Item {
    Number: string;
    Member: string;
    Stage: string;
    IsCurrentSittingWeek: boolean;
    IsFollowingSittingWeek: boolean;
    IsMajorityAmendments: boolean;
    IsExtendedSittingHours: boolean;
    Speeches: string;
    LatestEvent: string;

    constructor() {
        super();
        this.Type = "Bill";
    }
}

export class ReportItem extends Item {
    Shoulder: string;
    Committee: string;
    LatestEvent: string;
    constructor() {
        super();
        this.Type = "Report";
    }
}

export class LineItem extends Item {
    constructor() {
        super();
        this.Type = "Line";
    }
}

export class GroupItem extends Item {
    Items: Array<Item>;
    constructor() {
        super();
        this.Items = new Array<Item>();
        this.Type = "Group";
    }
}