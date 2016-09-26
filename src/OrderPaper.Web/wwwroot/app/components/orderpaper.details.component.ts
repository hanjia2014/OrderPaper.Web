import { Component, OnInit, Input }         from '@angular/core';
import { BaseComponent }                    from './base.component';
import { OrderPaper }                       from '../models/orderpaper';
import { Section }                          from '../models/section';
import { DND_PROVIDERS, DND_DIRECTIVES }    from '../directives/dnd/ng2-dnd';

@Component({
    selector: 'order-paper-details',
    template: `<div id="spinner"></div>
                <div>
                    <div *ngIf="orderPaper">
                        <div class="row">
                            <div class="col-md-3">
                                Date
                            </div>
                            <div class="col-md-3">
                                Setting Hours
                            </div>
                            <div class="col-md-3">
                                Status
                            </div>
                            <div class="col-md-3">
                                Number
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <date-picker [id]="'orderPaperDate'" [IncludeTime]="false" [initialValue]="orderPaper.Date" (onValueChange)="dateChange($event)"></date-picker>
                            </div>             
                            <div class="col-md-3">
                                <input placeholder="Setting Hours" [(ngModel)]="orderPaper.SittingHours" />
                            </div>             
                            <div class="col-md-3">
                                <select2 [id]="'orderPaperStatus'" [enableSearch]="false" [multiple]="false" [data]="statusOptions" (selected)="selected($event)"></select2>
                            </div>             
                            <div class="col-md-3">
                                <input placeholder="Number" [(ngModel)]="orderPaper.OrderPaperNumber" />
                            </div>
                        </div>
                        <div class="row">
                            <div *ngFor="let section of orderPaper.Sections; let i = index" dnd-sortable-container [dropZones]="['sections-drop-zone']" [sortableData]="orderPaper.Sections" dnd-sortable [sortableIndex]="i">
                                <div class="panel panel-info">
                                    <div class="panel-heading">
                                    </div>
                                    <div class="panel-body">
                                        <a [class.bold]="selectedSection != null && section.Name == selectedSection.Name" (click)="selectedSection = section">{{section.Name}}</a>
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>
                    <order-paper-section-details [section]="selectedSection"></order-paper-section-details>
                </div>
                `,
    styles: [`a{cursor:pointer}
                .bold{font-weight:bold}`],
    providers: [DND_PROVIDERS]
})
export class OrderPaperDetailsComponent extends BaseComponent implements OnInit {
    @Input()
    orderPaper: OrderPaper;
    selectedSection: Section;
    spinnerElm: any = document.getElementById("spinner");
    error: any;
    statusOptions = [{ id: "Provisional", text: "Provisional" }, { id: "Final", text: "Final" }];
    constructor() {
        super();
    }
    ngOnInit() {
        this.spinner.spin(this.spinnerElm);
        var paper = this.orderPaper;
    }

    updateSequence(oldIndex: number, newIndex: number) { }
}