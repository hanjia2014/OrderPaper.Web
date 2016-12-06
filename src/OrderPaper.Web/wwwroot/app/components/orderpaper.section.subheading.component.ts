﻿import {
    AUTO_STYLE,
    trigger,
    state,
    animate,
    transition,
    style,
    HostBinding,
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    AfterViewInit
}                               from '@angular/core';
import { OrderPaper }           from '../models/orderpaper';
import { Section, Subheading }  from '../models/section';
import { Item,
    LineItem,
    MotionItem,
    GroupItem,
    ReportItem,
    BillItem
}                               from '../models/items';


@Component({
    selector: 'order-paper-section-subheading',
    template: `
                <div class="subheading">
                    <div class="row">
                        <div class="col-md-12">
                            <a class="pointer" (click)="toggle($event, index + '-section-subheading')">Section sub heading</a>
                        </div>
                    </div>
                    <div id="{{index + '-section-subheading'}}" class="initially-hidden">
                        <div class="row">
                            <div class="col-md-12">
                                Full line <input type="text" class="form-control undraggable" [(ngModel)]="subheading.FullLine" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                Col 1a <input type="text" class="form-control undraggable" [(ngModel)]="subheading.Col1a" />
                            </div>
                            <div class="col-md-3">
                                Col 2a <input type="text" class="form-control undraggable" [(ngModel)]="subheading.Col2a" />
                            </div>
                            <div class="col-md-3">
                                Col 3a <input type="text" class="form-control undraggable" [(ngModel)]="subheading.Col3a" />
                            </div>
                            <div class="col-md-3">
                                Col 4a <input type="text" class="form-control undraggable" [(ngModel)]="subheading.Col4a" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                Col 1b <input type="text" class="form-control undraggable" [(ngModel)]="subheading.Col1b" />
                            </div>
                            <div class="col-md-3">
                                Col 2b <input type="text" class="form-control undraggable" [(ngModel)]="subheading.Col2b" />
                            </div>
                            <div class="col-md-3">
                                Col 3b <input type="text" class="form-control undraggable" [(ngModel)]="subheading.Col3b" />
                            </div>
                            <div class="col-md-3">
                                Col 4b <input type="text" class="form-control undraggable" [(ngModel)]="subheading.Col4b" />
                            </div>
                        </div>
                    </div>
                </div>
                `,
    styles: [],
    providers: []
})
export class OrderPaperSectionSubheadingComponent implements OnInit {
    @Input()
    subheading: Subheading;
    hoverVisible: boolean;
    @Input()
    index: number;

    constructor() {
    }
    ngOnInit() {
        
    }

    toggle(element: any, eleId: string) {
        var eleId = "#" + eleId;
        $(eleId).slideToggle();
    }
}