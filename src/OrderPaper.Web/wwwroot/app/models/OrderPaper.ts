﻿import { Status }                                   from './constants';
import { Item, MotionItem, BillItem, ReportItem }   from './Items';
import { Section }                                  from './Section';
import { AppConstants }                             from '../settings/app.constants';

export class OrderPaper {
    Id: number;
    SittingDay: string;
    Status: string;
    Number: number;
    SittingHours: string;
    Sections: Array<Section>;
    Progress: string;
    PublishingProgress: Array<string>;
    constructor() {
        this.Sections = new Array<Section>();
        this.PublishingProgress = new Array<string>();
    }

    public containPreview = (): boolean => {
        return this.PublishingProgress.indexOf(AppConstants.PROGRESS_PREVIEW) >= 0;
    }

    public containWord = (): boolean => {
        return this.PublishingProgress.indexOf(AppConstants.PROGRESS_WORD) >= 0;
    }

    public containPublish = (): boolean => {
        return this.PublishingProgress.indexOf(AppConstants.PROGRESS_PUBLISH) >= 0;
    }

    public containPrint = (): boolean => {
        return this.PublishingProgress.indexOf(AppConstants.PROGRESS_PRINT) >= 0;
    }
}