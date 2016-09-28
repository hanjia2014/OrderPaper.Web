import { Component, AfterViewInit, OnInit, Input, ViewChild }   from '@angular/core';
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
                        <div class="container row" style="margin-top: 30px;">
                            <ul dnd-sortable-container [dropZones]="['sections-drop-zone']" [sortableData]="orderPaper.Sections">
                                <li *ngFor="let section of orderPaper.Sections; let i = index" dnd-sortable [sortableIndex]="i" class="item-li">
                                    <div class="input-group">
                                        <div class="form-control">
                                            <a [class.bold]="selectedSection != null && section.Name == selectedSection.Name" (click)="selectedSection = section">{{section.Name}}</a>
                                        </div>
                                        <span class="input-group-addon" style="cursor: move">Move</span>
                                        <span class="input-group-addon undraggable" style="cursor: pointer" (click)="sectionDeleteIndex = i; modal.open()">Remove</span>
                                    </div>
                                </li>  
                            </ul>
                        </div>
                    </div>
                    <order-paper-section-details [section]="selectedSection"></order-paper-section-details>
                </div>
                <modal [animation]="animation" [keyboard]="keyboard" [backdrop]="backdrop" (onClose)="closed()" (onDismiss)="dismissed()"
                       (onOpen)="opened()" [cssClass]="cssClass" #modal>
                    <modal-header [show-close]="true">
                        <h4 class="modal-title">Confirm to delete</h4>
                    </modal-header>
                    <modal-body>
                        Are you sure to delete the section?
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
    sectionDeleteIndex: number;
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
                $('.item-li').attr("draggable", "false");
                console.log("focus");
            })
            .on('blur', function (e) {
                $('.item-li').attr("draggable", "true");
                console.log("blur");
            });

        $('.item-li')
            .draggable({ cancel: 'a' });
    }

    dateChange = (value: Date) => {
        this.orderPaper.Date = value;
    }

    statusChange = (e: string) => {
        this.orderPaper.Status = e;
    }

    removeSection = (section: Section, index: number) => {
        this.modal.open();
        //this.orderPaper.Sections.splice(index, 1);
    }

    updateSequence(oldIndex: number, newIndex: number) { }

    //modal
    opened() {

    }

    navigate() {

    }

    open() {
        this.modal.open();
    }
    closed() {
        this.orderPaper.Sections.splice(this.sectionDeleteIndex, 1);
    }
    dismissed() {

    }
}