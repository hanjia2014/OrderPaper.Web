﻿import { Component, AfterViewInit, OnInit, Input, ViewChild }   from '@angular/core';
import { BaseComponent }                                        from './base.component';
import { OrderPaper }                                           from '../models/orderpaper';
import { Section }                                              from '../models/section';
import { DND_PROVIDERS, DND_DIRECTIVES }                        from '../directives/dnd/ng2-dnd';
import { ModalComponent }                                       from '../directives/modal/modal';

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
                                <select2 [id]="'orderPaperStatus'" [enableSearch]="false" [initialValue]="orderPaper.Status" [multiple]="false" [data]="statusOptions" (selected)="statusChange($event)"></select2>
                            </div>             
                            <div class="col-md-3">
                                <input placeholder="Number" [(ngModel)]="orderPaper.OrderPaperNumber" />
                            </div>
                        </div>
                        <div class="container row">
                            <div *ngFor="let section of orderPaper.Sections; let i = index" dnd-sortable-container [dropZones]="['sections-drop-zone']" dnd-sortable [sortableIndex]="i" [sortableData]="orderPaper.Sections">
                                <div class="input-group">
                                    <a [class.bold]="selectedSection != null && section.Name == selectedSection.Name" class="form-control undraggable" (click)="selectedSection = section">{{section.Name}}</a>
                                    <span class="input-group-addon" style="cursor: move">Move</span>
                                    <span class="input-group-addon" style="cursor: pointer" (click)="removeSection(section, i)">Remove</span>
                                </div>
                            </div>  
                        </div>
                    </div>
                    <order-paper-section-details [section]="selectedSection"></order-paper-section-details>
                </div>

                <modal [animation]="animation" [keyboard]="keyboard" [backdrop]="backdrop" (onClose)="closed()" (onDismiss)="dismissed()"
                       (onOpen)="opened()" [cssClass]="cssClass" #modal>
                    <modal-header [show-close]="true">
                        <h4 class="modal-title">I'm a modal!</h4>
                    </modal-header>
                    <modal-body>
                        
                    </modal-body>
                    <modal-footer [show-default-buttons]="true"></modal-footer>
                </modal>
                `,
    styles: [`a{cursor:pointer}
                .bold{font-weight:bold}`],
    providers: [DND_PROVIDERS]
})
export class OrderPaperDetailsComponent extends BaseComponent implements OnInit, AfterViewInit {
    @Input()
    orderPaper: OrderPaper;
    selectedSection: Section;
    spinnerElm: any = document.getElementById("spinner");
    error: any;
    statusOptions = [{ id: "Provisional", text: "Provisional" }, { id: "Final", text: "Final" }];
    //modal
    @ViewChild('modals')
    modal: ModalComponent;

    constructor() {
        super();
    }
    ngOnInit() {
        this.spinner.spin(this.spinnerElm);
    }

    ngAfterViewInit() {
        $('.undraggable')
            .on('focus', function (e) {
                $('.input-group').attr("draggable", "false");
            })
            .on('blur', function (e) {
                $('.input-group').attr("draggable", "true");
            });
    }

    dateChange = (value: Date) => {
        this.orderPaper.Date = value;
    }

    statusChange = (e: string) => {
        this.orderPaper.Status = e;
    }

    removeSection = (section: Section, index: number) => {
        this.orderPaper.Sections.splice(index, 1);
    }

    updateSequence(oldIndex: number, newIndex: number) { }

    
}