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
                    <div class="row container" dnd-sortable-container [dropZones]="['items-drop-zone']" [sortableData]="section.Items">
                        <div *ngFor="let item of section.Items; let i = index" dnd-sortable [sortableIndex]="i" [dropEnabled]="true" (onDragEnd)="sortingItems()" (onDragOver)="sortingItems()" (onDropSuccess)="sortingItems()" class="item-li">
                            <div *ngIf="item.Type != 'Line'" class="{{item.Type == 'Group' ? 'panel panel-warning' : 'panel panel-success'}}" [class.new-item]="item.IsNew && item.Type != 'Group'">
                                <div class="panel-heading">
                                </div>
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

    addItemsToGroup = (group: GroupItem, index: number) => {
        var originalIndex = index;
        var existingItems = group.Items;
        this.section.Items.splice(index, 1);    //remove group first
        existingItems.forEach((item) => {
            this.section.Items.splice(index++, 0, item);
        });

        var newGroup = new GroupItem();
        newGroup.From = group.From;
        newGroup.To = group.To;

        for (var i = this.section.Items.length - 1; i >= 0 ; i--) {
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