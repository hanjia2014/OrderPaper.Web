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
    templateUrl: `app/template/item-bill.html`,
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