import {
    Component,
    OnInit,
    ViewChild,
    Input,
    AfterViewInit,
    Output,
    EventEmitter
}                               from '@angular/core';
import { BillItem }             from '../../models/items';

@Component({
    selector: 'item-bill',
    template: `
                <div class="bill">
                    <div class="row">
                        <div class="col-md-11">
                            <a href="#" (click)="toggle($event, index + '-bill')">{{item.Title}}</a>
                        </div>
                        <div class="col-md-1">
                            <div class="pull-right">
                                <img src="/content/images/icons/dragndrop.png" height="23" [style.visibility]="item.hoverVisible ? 'visible' : 'hidden'">
                                <span>{{item.Type}}</span>
                            </div>
                        </div>
                    </div>
                    <div id="{{index + '-bill'}}" class="initially-hidden">
                        <br />
                        <div class="form-group col-md-5 nopadding">
                            <label>Title</label>
                            <input type="text" class="form-control undraggable" [(ngModel)]="item.Title"/>
                        </div>
                        <div class="form-group col-md-1">
                            <label>&nbsp;</label>
                            <img class="form-control undraggable nopadding noborder" src="/content/images/icons/left-arrow.png" />
                        </div>
                        <div class="form-group col-md-5 nopadding">
                            <label>CPD</label>
                            <select2 [id]="index + 'bill-title-cpd'" [cssClass]="'form-control undraggable'" [enableSearch]="true" [multiple]="true" [disableMultipleSelection]="true" [data]="billTitleOptions" (selected)="titleSelect($event)"></select2>
                        </div>
                    </div>
                </div>`,
    styles: [],
    providers: []
})
export class ItemBillComponent implements OnInit, AfterViewInit{
    @Input()
    item: BillItem;
    @Input()
    index: number;
    isExpand: boolean;
    @Output()
    onAddGroup = new EventEmitter<BillItem>();
    billTitleOptions: any;
    constructor() {
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