import { Component, Input, Output, EventEmitter }       from '@angular/core';
import { ReportItem, MotionItem, BillItem, GroupItem  } from '../../models/items';
import { ItemComponent }                                from './item.component';

@Component({
    selector: 'item-group',
    template: `
                <div class="group">
                    <p>
                        <span>
                            Group
                        </span>
                        <a class="pull-right" style="cursor: pointer;">
                            <img (click)="removeGroup()" src="{{imagesPath + 'delete.png'}}">
                        </a>
                    </p>
                    <div class="row">
                        <div class="col-md-2">
                            <input [(ngModel)]="group.From" class="form-control input-sm" placeholder="From" />
                        </div>
                        <div class="col-md-2">
                            <input [(ngModel)]="group.To" class="form-control input-sm" placeholder="To" />
                        </div>
                        <a (click)="addItems()">
                            Select
                        </a>
                    </div>
                    <div class="row">
                        <div dnd-sortable-container [dropZones]="['drop-zone']" [sortableData]="group.Items">
                            <ol class="list-sortable">
                                <li class="panel panel-default item-li group-child" *ngFor="let item of group.Items; let i = index" dnd-sortable [sortableIndex]="i">
                                    <div class="panel-body">
                                        <span *ngIf="item.Type == 'Bill'">
                                            <item-bill [index]="i" [item]="item" [isGroupChild]="true" (onAddGroup)="addGroup($event, i)"></item-bill>
                                        </span>
                                        <span *ngIf="item.Type == 'Report'">
                                            <item-report [index]="i" [item]="item" [isGroupChild]="true"></item-report>
                                        </span>
                                        <span *ngIf="item.Type == 'Motion'">
                                            <item-motion [index]="i" [item]="item" [isGroupChild]="true"></item-motion>
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
                `,
    styles: [`
                .group-child{
                    margin: 15px;
                }
                a{
                    cursor: pointer;
                }
            `],
    providers: []
})
export class ItemGroupComponent extends ItemComponent {
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
    sequenceOptions: [{ id: "1", text: "1" }, { id: "2", text: "2" }];

    constructor() {
        super();
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

    sequenceFromChange = (e: string) => {
        if (e != null)
            this.group.From = Number(e);
    }
}