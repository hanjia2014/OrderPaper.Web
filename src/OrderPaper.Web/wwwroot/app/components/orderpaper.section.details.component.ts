import { Component, OnInit, Input }         from '@angular/core';
import { BaseComponent }                    from './base.component';
import { OrderPaper }                       from '../models/orderpaper';
import { Section }                          from '../models/section';
import { LineItem }                         from '../models/items';
import { DND_PROVIDERS, DND_DIRECTIVES }    from '../directives/dnd/ng2-dnd';

@Component({
    selector: 'order-paper-section-details',
    template: `<div id="spinner"></div>
                <button *ngIf="section" [disabled]="hasLine" (click)="addLine()">Add Line</button>
                <div *ngIf="section">
                    <div class="row container" dnd-sortable-container [dropZones]="['items-drop-zone']" [sortableData]="section.Items">
                        <div *ngFor="let item of section.Items; let i = index" dnd-sortable [sortableIndex]="i" [dropEnabled]="true" (onDragEnd)="dragEnd()" (onDragOver)="dragOver()" (onDropSuccess)="dropSuccess()" class="item-li" [style.border-style]="item.IsNew ? 'dashed' : 'none'">
                            <div *ngIf="item.Type != 'Line' && item.Type != 'Group'" class="panel panel-info">
                                <div class="panel-heading">
                                </div>
                                <div class="panel-body">
                                    <span *ngIf="item.Type == 'Bill'">
                                        <item-bill [index]="i" [item]="item"></item-bill>
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
    styles: [],
    providers: [DND_PROVIDERS]
})
export class OrderPaperSectionDetailsComponent extends BaseComponent implements OnInit {
    @Input()
    section: Section;
    spinnerElm: any = document.getElementById("spinner");
    error: any;
    hasLine: boolean;

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

    addLine() {
        var lineItem = new LineItem();
        this.section.Items.push(lineItem);
        this.hasLine = true;
    }
    deleteLine = (line: LineItem, index: number) => {
        this.section.Items.splice(index, 1);
        this.hasLine = false;
    }
}