import { Component, OnInit, Input }         from '@angular/core';
import { BaseComponent }                    from './base.component';
import { OrderPaper }                       from '../models/orderpaper';
import { Section }                          from '../models/section';
import { Item,
    LineItem,
    MotionItem,
    GroupItem,
    ReportItem,
    BillItem
}                                           from '../models/items';
import { DND_PROVIDERS, DND_DIRECTIVES }    from '../directives/dnd/ng2-dnd';

@Component({
    selector: 'order-paper-section-details',
    template: `<div id="spinner"></div>
                <div *ngIf="section">
                    <select2 [id]="'item-types'" [enableSearch]="false" [multiple]="false" [data]="itemTypes" (selected)="itemSelect($event)"></select2>
                    <button (click)="addItem()">Add Item</button>
                </div>
                <div *ngIf="section">
                    <div class="row" dnd-sortable-container [dropZones]="['items-drop-zone']" [sortableData]="section.Items">
                        <div *ngFor="let item of section.Items; let i = index" dnd-sortable [sortableIndex]="i" [dropEnabled]="true" (onDragEnd)="sortingItems()" (onDragOver)="sortingItems()" (onDropSuccess)="sortingItems()" class="item-li col-md-10">
                            <div class="row" style="margin-top:10px;" (mouseover)="item.hoverVisible = true" (mouseleave)="item.hoverVisible = false">
                                <div class="col-md-1 group-tick-box">
                                    <div *ngIf="item.Type != 'Group' && item.Type != 'Line'" class="group-tick-box">
                                        <img class="vcenter" src="content/images/icons/group tick.png" style="cursor: pointer" [style.visibility]="item.hoverVisible ? 'visible' : 'hidden'" (click)="addGroup(item, i)">
                                    </div>
                                </div>
                                <div class="col-md-1 vcenter">
                                    <div *ngIf="item.Type != 'Group' && item.Type != 'Line'" class="pull-right">
                                        {{item.Sequence}}
                                    </div>
                                </div>
                                <div *ngIf="item.Type != 'Line'" class="{{item.Type == 'Group' ? 'panel panel-warning nopadding col-md-8 item-box' : 'panel panel-default nopadding col-md-8 item-box'}}" [class.new-item]="item.IsNew && item.Type != 'Group'">
                                    <div *ngIf="item.Type == 'Group'" class="panel-heading">Panel Heading</div>
                                    <div class="panel-body">
                                        <span *ngIf="item.Type == 'Bill'">
                                            <item-bill [index]="i" [item]="item" (onAddGroup)="addGroup($event, i)"></item-bill>
                                        </span>
                                        <span *ngIf="item.Type == 'Report'">
                                            <item-report [index]="i" [item]="item"></item-report>
                                        </span>
                                        <span *ngIf="item.Type == 'Motion'">
                                            <item-motion [index]="i" [item]="item"></item-motion>
                                        </span>
                                        <span *ngIf="item.Type == 'Group'">
                                            <item-group [group]="item" [groupIndex]="i" (onRemoveGroup)="removeGroup($event, i)" (onAddItems)="addItemsToGroup($event, i)"></item-group>
                                        </span>
                                    </div>
                                </div>
                                <span *ngIf="item.Type == 'Line'">
                                    <item-line [line]="section" (onDeleteLine)="deleteLine($event, i)"></item-line>
                                </span>
                                <div class="col-md-1 trash-bin-box vcenter">
                                    <div *ngIf="item.Type != 'Group' && item.Type != 'Line'">
                                        <img (click)="removeItem(item, i)" [style.visibility]="item.hoverVisible ? 'visible' : 'hidden'" src="/content/images/icons/delete.png" style="cursor: pointer">
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
                `,
    styles: [`
               .new-item{
                    border-style: dashed;
                    border-color: gray;
                    border-width: 2px; 
                }
                .group-tick-box {
                    width: 2%;
                    margin-left: -20px;
                }
                .item-box {
                    width: 80%;
                }
                .trash-bin-box {
                    width: 3%;
                }
            `],
    providers: [DND_PROVIDERS]
})
export class OrderPaperSectionDetailsComponent extends BaseComponent implements OnInit {
    @Input()
    section: Section;
    spinnerElm: any = document.getElementById("spinner");
    error: any;
    hasLine: boolean;
    itemTypes = [{ id: "Motion", text: "Motion" }, { id: "Report", text: "Report" }, { id: "Bill", text: "Bill" }, { id: "Line", text: "Line" }];
    selectedItemType: string;

    constructor() {
        super();
    }
    ngOnInit() {
        this.spinner.spin(this.spinnerElm);
    }

    updateSequence(oldIndex: number, newIndex: number) { }

    sortingItems(e: any) {
        var sequence = 1;
        this.section.Items.forEach((item) => {
            if (item.Type != 'Line') {
                if (item.Type == "Group") {
                    var group = (item as GroupItem);
                    group.From = sequence;
                    for (var i = 0; i < group.Items.length; i++) {
                        var grouppedItem = group.Items[i];
                        grouppedItem.Sequence = i + sequence;
                    }
                    group.To = group.Items[group.Items.length - 1].Sequence;
                    sequence = sequence + group.Items.length - 1;
                }
                item.Sequence = sequence++;
            }
        });
    }

    addItem = () => {
        var item = null;
        switch (this.selectedItemType) {
            case "Line":
                item = new LineItem();
                this.hasLine = true;
                break;
            case "Bill":
                item = new BillItem();
                break;
            case "Report":
                item = new ReportItem();
                break;
            case "Motion":
                item = new MotionItem();
                break;
        }
        if (item != null) {
            this.section.Items.push(item);
        }
    }
    deleteLine = (line: LineItem, index: number) => {
        this.section.Items.splice(index, 1);
        this.hasLine = false;
    }

    addGroup = (item: Item, index: number) => {
        var group = new GroupItem();
        group.From = item.Sequence;
        group.To = item.Sequence;
        group.Items.push(item);
        this.section.Items.splice(index, 1);
        this.section.Items.splice(index, 0, group);
    }

    itemSelect = (e: string) => {
        this.selectedItemType = e;
    }

    removeGroup = (group: GroupItem, index: number) => {
        var existingItems = group.Items;
        this.section.Items.splice(index, 1);
        existingItems.forEach((item) => {
            this.section.Items.splice(index++, 0, item);
        });
    }

    removeItem = (item: Item, index: number) => {
        this.section.Items.splice(index, 1);
        this.sortingItems(null);
    }

    addItemsToGroup = (group: GroupItem, index: number) => {
        var originalIndex = index;

        this.removeGroup(group, index);

        var newGroup = new GroupItem();
        newGroup.From = group.From;
        newGroup.To = group.To;

        for (var i = this.section.Items.length - 1; i >= 0; i--) {
            var item = this.section.Items[i];
            if (item.Sequence >= newGroup.From && item.Sequence <= newGroup.To) {
                newGroup.Items.push(item);
                this.section.Items.splice(i, 1);
            }
        }

        newGroup.Items = newGroup.Items.reverse();

        this.section.Items.splice(originalIndex, 0, newGroup);
    }
}