import {
    Component,
    OnInit,
    ViewChild,
    Input,
    AfterViewInit
}                           from '@angular/core';
import { ReportItem }       from '../../models/items';
import { ItemComponent }    from './item.component';

@Component({
    selector: 'item-report',
    template: `
                <div class="report">
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
                                <select2 [id]="sectionIndex + '-' + groupIndex + '-' + index + 'report-title-cpd'" [cssClass]="'form-control undraggable'" [enableSearch]="true" [multiple]="true" [disableMultipleSelection]="true" [data]="reportTitleOptions" (selected)="titleSelect($event)"></select2>
                            </div>
                        </div>
                        <div class="spacer"></div>
                        <div class="row nopadding">
                            <div class="form-group col-md-5 nopadding">
                                <span>Shoulder</span>
                                <input type="text" class="form-control undraggable" [(ngModel)]="item.Shoulder" />
                            </div>
                            <div class="form-group col-md-1">
                                <label>&nbsp;</label>
                                <img class="undraggable nopadding noborder" height="10" src="{{imagesPath + 'CPD arrow.png'}}" />
                            </div>
                            <div class="form-group col-md-5 nopadding">
                                <span>CPD</span>
                                <select2 [id]="sectionIndex + '-' + groupIndex + '-' + index + 'report-shoulder-cpd'" [cssClass]="'form-control undraggable'" [enableSearch]="true" [multiple]="true" [disableMultipleSelection]="true" [data]="reportTitleOptions" (selected)="titleSelect($event)"></select2>
                            </div>
                        </div>
                        <div class="spacer"></div>
                        <div class="row nopadding">
                            <div class="form-group col-md-5 nopadding">
                                <span>Committee</span>
                                <input type="text" class="form-control undraggable" [(ngModel)]="item.Committee" />
                            </div>
                            <div class="form-group col-md-1">
                                <label>&nbsp;</label>
                                <img class="undraggable nopadding noborder" height="10" src="{{imagesPath + 'CPD arrow.png'}}" />
                            </div>
                            <div class="form-group col-md-5 nopadding">
                                <span>CPD</span>
                                <select2 [id]="sectionIndex + '-' + groupIndex + '-' + index + 'report-committee-cpd'" [cssClass]="'form-control undraggable'" [enableSearch]="true" [multiple]="true" [disableMultipleSelection]="true" [data]="reportTitleOptions" (selected)="titleSelect($event)"></select2>
                            </div>
                        </div>
                        <div class="spacer"></div>
                        <div class="row nopadding">
                            <div class="form-group col-md-5 nopadding">
                                <span>Latest event</span>
                                <input type="text" class="form-control undraggable" [(ngModel)]="item.LatestEvent" />
                            </div>
                            <div class="form-group col-md-1">
                                <label>&nbsp;</label>
                                <img class="undraggable nopadding noborder" height="10" src="{{imagesPath + 'CPD arrow.png'}}" />
                            </div>
                            <div class="form-group col-md-5 nopadding">
                                <span>CPD</span>
                                <select2 [id]="sectionIndex + '-' + groupIndex + '-' + index + 'report-latestevent-cpd'" [cssClass]="'form-control undraggable'" [enableSearch]="true" [multiple]="true" [disableMultipleSelection]="true" [data]="reportTitleOptions" (selected)="titleSelect($event)"></select2>
                            </div>
                        </div>
                        <div class="spacer"></div>
                        <div class="row nopadding">
                            <div class="form-group col-md-5 nopadding">
                                <span>Details</span>
                                <textarea class="form-control undraggable" [(ngModel)]="item.Details" cols="30" rows="5"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                `,
    styles: [],
    providers: []
})
export class ItemReportComponent extends ItemComponent implements OnInit, AfterViewInit{
    @Input()
    item: ReportItem;
    @Input()
    index: number;
    isExpand: boolean;
    @Input()
    isGroupChild: boolean = false;
    @Input()
    groupIndex: number;
    reportTitleOptions: any;
    @Input()
    sectionIndex: number;

    constructor() {
        super();
    }
    ngOnInit() {
        this.reportTitleOptions = [{ id: "monday", text: "monday" }, { id: "tuesday", text: "tuesday" }];

        if (this.isGroupChild) {
            this.toggleId = this.sectionIndex + '-' + this.index + '-' + this.groupIndex + '-report';
        }
        else {
            this.toggleId = this.sectionIndex + '-' + this.index + '-report';
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
}