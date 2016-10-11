export class Item {
    Sequence: number;
    Type: string;
    Title: string;
    IsGrouppedItem: boolean;
    HasLine: boolean;
    IsNew: boolean;

    constructor() {
        this.IsNew = true;
        this.Title = "Untitled";
    }
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
        this.IsNew = false;
    }
}

export class GroupItem extends Item {
    From: number;
    To: number;
    Items: Array<Item>;
    constructor() {
        super();
        this.Items = new Array<Item>();
        this.Type = "Group";
    }
}