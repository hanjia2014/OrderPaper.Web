import { Component, Input, Output, EventEmitter }       from '@angular/core';
import { ReportItem, MotionItem, BillItem, GroupItem  } from '../../models/items';

@Component({
    selector: 'item-group',
    template: `
                <div class="group">
                    <div class="row">
                        <div class="panel-body">
                            <input [(ngModel)]="group.From" placeholder="From" />
                            <input [(ngModel)]="group.To" placeholder="To" />
                            <button class="btn btn-primary" [disabled]="validateSequences()" (click)="addItems()">Add</button>
                            <button class="btn btn-danger pull-right" (click)="removeGroup()">Remove</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="panel-body" dnd-sortable-container [dropZones]="['drop-zone']" [sortableData]="group.Items">
                            <ol class="list-sortable">
                                <li *ngFor="let item of group.Items; let i = index" dnd-sortable [sortableIndex]="i" class="item-li">
                                    <div class="panel panel-info">
                                        <div class="panel-heading"></div>
                                        <div class="panel-body">
                                            <span *ngIf="item.Type == 'Motion'">motion</span>
                                            <span *ngIf="item.Type == 'Bill'">bill</span>
                                            <span *ngIf="item.Type == 'Report'">report</span>
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
                `,
    styles: [],
    providers: []
})
export class ItemGroupComponent {
    @Input()
    group: GroupItem;
    @Input()
    groupIndex: number;
    @Input()
    dropZone: string;
    @Output()
    onAddItems = new EventEmitter<GroupItem>();
    @Output()
    onRemoveGroup = new EventEmitter<GroupItem>();

    constructor() {
    }

    addItems = () => {
        this.onAddItems.next(this.group);
    }

    removeGroup = () => {
        this.onRemoveGroup.next(this.group);
    }

    validateSequences() {
        if (this.group.From == null) return true;
        if (this.group.To == null) return true;
        if (this.group.From >= this.group.To) return true;
        return false;
    }
}