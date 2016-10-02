import { Component, OnInit, Input }         from '@angular/core';
import { BaseComponent }                    from './base.component';
import { OrderPaper }                       from '../models/orderpaper';
import { Section }                          from '../models/section';
import { DND_PROVIDERS, DND_DIRECTIVES }    from '../directives/dnd/ng2-dnd';

@Component({
    selector: 'order-paper-section-details',
    template: `<div id="spinner"></div>
                <div *ngIf="section">
                    <div class="row container" dnd-sortable-container [dropZones]="['items-drop-zone']" [sortableData]="section.Items">
                        <div *ngFor="let item of section.Items; let i = index" dnd-sortable [sortableIndex]="i" class="item-li">
                            <div class="panel panel-info">
                                <div class="panel-heading">
                                </div>
                                <div class="panel-body">
                                    <span *ngIf="item.Type == 'Bill'">
                                        <item-bill [index]="i" [item]="item"></item-bill>
                                    </span>
                                </div>
                            </div>
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

    constructor() {
        super();
    }
    ngOnInit() {
        this.spinner.spin(this.spinnerElm);
    }

    updateSequence(oldIndex: number, newIndex: number) { }
}