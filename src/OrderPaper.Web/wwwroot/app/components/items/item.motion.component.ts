import {
    Component,
    OnInit,
    ViewChild,
    Input,
    AfterViewInit
}                               from '@angular/core';
import { MotionItem }           from '../../models/items';
import { ItemComponent }        from './item.component';

@Component({
    selector: 'item-motion',
    template: `
                <div class="motion">
                    <div class="row">
                        <div class="col-md-10">
                            <a href="#" (click)="toggle($event, toggleId)">{{item.Title}}</a>
                        </div>
                        <div class="col-md-2">
                            <div class="pull-right">
                                <img *ngIf="isGroupChild == false" src="{{imagesPath + 'dragndrop.png'}}" height="23" [style.visibility]="item.hoverVisible ? 'visible' : 'hidden'">
                                <span>{{item.Type}}</span>
                            </div>
                        </div>
                    </div>
                    <div id="{{toggleId}}" class="initially-hidden">
                        <div class="spacer"></div>
                        <div class="row nopadding">
                            <div class="form-group col-md-5 nopadding">
                                <span>Title</span>
                                <input type="text" class="form-control undraggable" [(ngModel)]="item.Title" />
                            </div>
                            <div class="form-group col-md-1">
                                <label>&nbsp;</label>
                                <img class="undraggable nopadding noborder" height="10" src="{{imagesPath + 'CPD arrow.png'}}" />
                            </div>
                            <div class="form-group col-md-5 nopadding">
                                <span>CPD</span>
                                <select2 [id]="sectionIndex + '-' + groupIndex + '-' + index + 'motion-title-cpd'" [cssClass]="'form-control undraggable'" [enableSearch]="true" [multiple]="true" [disableMultipleSelection]="true" [data]="motionTitleOptions" (selected)="titleSelect($event)"></select2>
                            </div>
                        </div>
                        <div class="spacer"></div>
                        <div class="row nopadding">
                            <div class="form-group col-md-5 nopadding">
                                <span>Member</span>
                                <input type="text" class="form-control undraggable" [(ngModel)]="item.Member" />
                            </div>
                            <div class="form-group col-md-1">
                                <label>&nbsp;</label>
                                <img class="undraggable nopadding noborder" height="10" src="{{imagesPath + 'CPD arrow.png'}}" />
                            </div>
                            <div class="form-group col-md-5 nopadding">
                                <span>CPD</span>
                                <select2 [id]="sectionIndex + '-' + groupIndex + '-' + index + 'motion-member-cpd'" [cssClass]="'form-control undraggable'" [enableSearch]="true" [multiple]="true" [disableMultipleSelection]="true" [data]="motionTitleOptions" (selected)="titleSelect($event)"></select2>
                            </div>
                        </div>

                        <div class="spacer"></div>
                        <div class="row nopadding">
                            <div class="form-group col-md-5 nopadding">
                                <span>Motion</span>
                                <textarea class="form-control undraggable" [(ngModel)]="item.Motion" cols="30" rows="5"></textarea>
                            </div>
                            <div class="form-group col-md-1">
                                <label>&nbsp;</label>
                                <img class="undraggable nopadding noborder" height="10" src="{{imagesPath + 'CPD arrow.png'}}" />
                            </div>
                            <div class="form-group col-md-5 nopadding">
                                <span>CPD</span>
                                <select2 [id]="sectionIndex + '-' + groupIndex + '-' + index + 'motion-motion-cpd'" [cssClass]="'form-control undraggable'" [enableSearch]="true" [multiple]="true" [disableMultipleSelection]="true" [data]="motionTitleOptions" (selected)="titleSelect($event)"></select2>
                            </div>
                        </div>

                        <div class="spacer"></div>
                        <div class="row nopadding">
                            <div class="form-group col-md-5 nopadding">
                                <span>Date</span>
                                <date-picker [id]="sectionIndex + '-' + groupIndex + '-' + index + '-date'" [IncludeTime]="false" [initialValue]="item.Date" (onValueChange)="dateChange($event)"></date-picker>
                            </div>
                        </div>

                        <div class="spacer"></div>
                        <div class="row nopadding">
                            <div class="form-group col-md-5 nopadding">
                                <span>Speeches</span>
                                <textarea class="form-control undraggable" [(ngModel)]="item.Speeches" cols="30" rows="5"></textarea>
                            </div>
                            <div class="form-group col-md-1">
                            </div>
                            <div class="form-group col-md-5 nopadding">
                                <span>Details</span>
                                <input type="text" class="form-control undraggable" [(ngModel)]="item.Details" />
                            </div>
                        </div>
                    </div>
                </div>
                `,
    styles: [],
    providers: []
})
export class ItemMotionComponent extends ItemComponent implements OnInit, AfterViewInit{
    @Input()
    item: MotionItem;
    @Input()
    index: number;
    isExpand: boolean;
    @Input()
    isGroupChild: boolean = false;
    @Input()
    groupIndex: number;
    motionTitleOptions: any;
    @Input()
    sectionIndex: number;

    constructor() {
        super();
    }
    ngOnInit() {
        this.motionTitleOptions = [{ id: "monday", text: "monday" }, { id: "tuesday", text: "tuesday" }];

        if (this.isGroupChild) {
            this.toggleId = this.sectionIndex + '-' + this.index + '-' + this.groupIndex + '-motion';
        }
        else {
            this.toggleId = this.sectionIndex + '-' + this.index + '-motion';
        }
    }

    ngAfterViewInit() {
        $('.undraggable')
            .on('focus', function (e) {
                $('.item-li').attr("draggable", "false");
            })
            .on('blur', function (e) {
                $('.item-li').attr("draggable", "true");
            });
    }

    toggle(element: any, eleId: string) {
        element.preventDefault();

        this.isExpand = !this.isExpand;
        var eleId = "#" + eleId;
        $(eleId).slideToggle();
    }

    dateChange = (value: string) => {
        this.item.Date = value;
    }
}