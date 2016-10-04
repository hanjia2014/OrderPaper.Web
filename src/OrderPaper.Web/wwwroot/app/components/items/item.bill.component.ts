﻿import {
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
                        <div class="col-md-8">
                            <h1>Bill (Sequence -- {{item.Sequence}})</h1>
                            <input type="checkbox" [ngModel]="item.IsGrouppedItem" (change)="addGroup()"/>
                        </div>
                        <div class="col-md-2">
                            <a href="#" (click)="toggle($event, index + 'bill')" class="pull-right">{{isExpand ? 'Expand' : 'Collapse'}}</a>
                        </div>
                    </div>
                    <div id="{{index + 'bill'}}">                     
                        <div class="row">
                            <div class="col-md-2">
                                Title:
                            </div>
                            <div class="col-md-8">
                                <input class="undraggable" [(ngModel)] = "item.Title" placeholder="Title" />
                            </div>
                        </div>    
                        <div class="row">
                            <div class="col-md-2">
                                Speeches:
                            </div>
                            <div class="col-md-8">
                                <input class="undraggable" [(ngModel)] = "item.Speeches" placeholder="Speeches" />
                            </div>
                        </div>   
                        <div class="row">
                            <div class="col-md-2">
                                Member:
                            </div>
                            <div class="col-md-8">
                                <input class="undraggable" [(ngModel)] = "item.Member" placeholder="Member" />
                            </div>
                        </div>   
                        <div class="row">
                            <div class="col-md-2">
                                Latest event:
                            </div>
                            <div class="col-md-8">
                                <input class="undraggable" [(ngModel)] = "item.LatestEvent" placeholder="Latest Event" />
                            </div>
                        </div>
                    </div>
                </div>
                `,
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

    constructor() {
    }
    ngOnInit() {
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
}