import {
    Component,
    OnInit,
    ViewChild,
    Input,
    AfterViewInit,
    Output,
    EventEmitter
}                           from '@angular/core';
import { BillItem }         from '../../models/items';
import { ItemComponent }    from './item.component';

@Component({
    selector: 'item-bill',
    template: `
            <div class="bill">
                <div class="row">
                    <div class="col-md-10">
                        <a href="#" (click)="toggle($event, index + '-bill')">{{item.Title}}</a>
                    </div>
                    <div class="col-md-2">
                        <div class="pull-right">
                            <img src="{{imagesPath + 'dragndrop.png'}}" height="23" [style.visibility]="item.hoverVisible ? 'visible' : 'hidden'">
                            <span>{{item.Type}}</span>
                        </div>
                    </div>
                </div>
                <div id="{{index + '-bill'}}" class="initially-hidden">
                    <div class="row nopadding">
                        <div class="form-group col-md-5 nopadding">
                            <label>Title</label>
                            <input type="text" class="form-control undraggable" [(ngModel)]="item.Title" />
                        </div>
                        <div class="form-group col-md-1">
                            <label>&nbsp;</label>
                            <img class="form-control undraggable nopadding noborder" height="10" src="{{imagesPath + 'left-arrow.png'}}" />
                        </div>
                        <div class="form-group col-md-5 nopadding">
                            <label>CPD</label>
                            <select2 [id]="index + 'bill-title-cpd'" [cssClass]="'form-control undraggable'" [enableSearch]="true" [multiple]="true" [disableMultipleSelection]="true" [data]="billTitleOptions" (selected)="titleSelect($event)"></select2>
                        </div>
                    </div>
                    <div class="row nopadding">
                        <div class="form-group col-md-12 nopadding">
                            <div class="row nopadding">
                                <input type="checkbox" [(ngModel)]="item.IsCurrentSittingWeek" id="{{index + '-option1'}}" value="Bill's committee stage indicated for current sitting week" />
                                <span>Bill's committee stage indicated for current sitting week</span>
                            </div>
                            <div class="row nopadding">
                                <input type="checkbox" [(ngModel)]="item.IsFollowingSittingWeek" id="{{index + '-option2'}}" name="Bill's committee stage indicated for following sitting week" value="Bill's committee stage indicated for following sitting week" />
                                <span>Bill's committee stage indicated for following sitting week</span>
                            </div>
                            <div class="row nopadding">
                                <input type="checkbox" [(ngModel)]="item.IsMajorityAmendments" id="{{index + '-option3'}}" name="Bill contains majority amendments" value="Bill contains majority amendments" />
                                <span>Bill contains majority amendments</span>
                            </div>
                            <div class="row nopadding">
                                <input type="checkbox" [(ngModel)]="item.IsConsiderationItem" id="{{index + '-option4'}}" name="Item for consideration during extended" value="Item for consideration during extended" />
                                <span>Item for consideration during extended</span>
                            </div>
                            <div class="row nopadding">
                                <input type="checkbox" [(ngModel)]="item.IsBlank" id="{{index + '-option5'}}" name="Blank (stage not showen on Order Paper)" value="Blank (stage not showen on Order Paper)" />
                                <span>Blank (stage not showen on Order Paper)</span>
                            </div>
                        </div>
                    </div>
                    <div class="row nopadding">
                        <div class="form-group col-md-5 nopadding">
                            <label>Times of debate (Speeches)</label>
                            <input type="text" class="form-control undraggable" [(ngModel)]="item.Speeches" />
                        </div>
                        <div class="form-group col-md-1">
                            
                        </div>
                        <div class="form-group col-md-5 nopadding">
                            <label>Latest details</label>
                            <textarea class="form-control undraggable" [(ngModel)]="item.LatestEvent" cols="30" rows="5"></textarea>
                        </div>
                    </div>
                </div>
            </div>`,
    styles: [],
    providers: []
})
export class ItemBillComponent extends ItemComponent implements OnInit, AfterViewInit{
    @Input()
    item: BillItem;
    @Input()
    index: number;
    isExpand: boolean;
    @Output()
    onAddGroup = new EventEmitter<BillItem>();
    billTitleOptions: any;
    constructor() {
        super();
    }
    ngOnInit() {
        this.billTitleOptions = [{ id: "monday", text: "monday" }, { id: "tuesday", text: "tuesday" }];
    }

    addGroup() {
        this.onAddGroup.next(this.item);
    }

    ngAfterViewInit() {
        //var billDiv = $(".bill");
        //billDiv.mousedown((e: JQueryMouseEventObject) => {
        //    if (e.target.tagName != "INPUT")
        //        return false;
        //});

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

    titleSelect = (e: string) => {
    }
}