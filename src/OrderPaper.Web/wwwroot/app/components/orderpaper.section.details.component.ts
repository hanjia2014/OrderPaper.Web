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
                        <div *ngFor="let item of section.Items; let i = index" dnd-sortable [sortableIndex]="i" [dropEnabled]="true" (onDragEnd)="dragEnd()" (onDragOver)="dragOver()" (onDropSuccess)="dropSuccess()" class="item-li">
                            <div *ngIf="item.Type != 'Line' && item.Type != 'Group'" class="panel panel-info" [class.new-item]="item.IsNew">
                                <div class="panel-heading">
                                </div>
                                <div class="panel-body">
                                    <span *ngIf="item.Type == 'Bill'">
                                        <item-bill [index]="i" [item]="item"></item-bill>
                                    </span>
                                    <span *ngIf="item.Type == 'Report'">
                                        <item-report [index]="i" [item]="item"></item-report>
                                    </span>
                                    <span *ngIf="item.Type == 'Motion'">
                                        <item-motion [index]="i" [item]="item"></item-motion>
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

    dropSuccess(e: any) {
        var sequence = 1;
        this.section.Items.forEach((item) => {
            if (item.Type != 'Line') {
                item.Sequence = sequence++;
            }
        });
    }

    dragEnd(e: any){
        var sequence = 1;
        this.section.Items.forEach((item) => {
            if (item.Type != 'Line') {
                item.Sequence = sequence++;
            }
        });
    }

    dragOver() {
        var sequence = 1;
        this.section.Items.forEach((item) => {
            if (item.Type != 'Line') {
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

    itemSelect = (e: string) => {
        this.selectedItemType = e;
    }
}