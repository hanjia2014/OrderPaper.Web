import { Component,
    AfterViewInit,
    OnInit,
    Input,
    ViewChild,
    ViewChildren,
    QueryList
}                                               from '@angular/core';
import { BaseComponent }                        from './base.component';
import { OrderPaperSectionOverviewComponent }   from './orderpaper.section.overview.component';
import { OrderPaper }                           from '../models/orderpaper';
import { Section }                              from '../models/section';
import { DND_PROVIDERS, DND_DIRECTIVES }        from '../directives/dnd/ng2-dnd';
import { ModalComponent }                       from '../directives/modal/modal';

@Component({
    selector: 'order-paper-details',
    template: `<div id="spinner"></div>
                <div>
                    <div *ngIf="orderPaper">
                        <hr />
                        <div class="row">
                            <div class="col-md-3">
                                <h3>Order paper details</h3>
                                <br/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2">
                                Date
                            </div>
                            <div class="col-md-3">
                                Setting Hours
                            </div>
                            <div class="col-md-3">
                                Status
                            </div>
                            <div class="col-md-1">
                                Number
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2">
                                <date-picker [id]="'orderPaperDate'" [IncludeTime]="false" [initialValue]="orderPaper.Date" (onValueChange)="dateChange($event)"></date-picker>
                            </div>             
                            <div class="col-md-3">
                                <select2 [id]="'orderPaperSittingHours'" [enableSearch]="false" [initialValue]="orderPaper.SittingHours" [multiple]="false" [data]="sittingHoursOptions" (selected)="sittingHoursChange($event)"></select2>
                                <img src="/content/images/icons/time.png">
                            </div>             
                            <div class="col-md-3">
                                <select2 [id]="'orderPaperStatus'" [enableSearch]="false" [initialValue]="orderPaper.Status" [multiple]="false" [data]="statusOptions" (selected)="statusChange($event)"></select2>
                            </div>             
                            <div class="col-md-1">
                                <input placeholder="Number" class="form-control input-sm" [(ngModel)]="orderPaper.OrderPaperNumber" />
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-md-9">
                                <div class="pull-right">
                                    <a class="btn btn-parliament">Save</a>
                                    <a class="btn btn-parliament">Generate preview Order Papers</a>
                                </div>
                            </div>
                        </div>
                        <div class="container row" style="margin-top: 30px;">
                            <ul dnd-sortable-container [dropZones]="['sections-drop-zone']" [sortableData]="orderPaper.Sections">
                                <li *ngFor="let section of orderPaper.Sections; let i = index" dnd-sortable [sortableIndex]="i" class="item-li">
                                    <order-paper-section-overview [section]="section" [index]="i" [isSelected]="selectedSection != null && section.Name == selectedSection.Name" (onSelectSection)="selectSection($event)" (onDeleteSection)="deleteSection($event)"></order-paper-section-overview>
                                </li>  
                            </ul>
                        </div>
                    </div>
                    
                    <div id="order-paper-section-details">
                        <order-paper-section-details [section]="selectedSection"></order-paper-section-details>
                    </div>
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
    styles: [],
    providers: [DND_PROVIDERS]
})
export class OrderPaperDetailsComponent extends BaseComponent implements OnInit, AfterViewInit {
    @Input()
    orderPaper: OrderPaper;
    selectedSection: Section;
    spinnerElm: any = document.getElementById("spinner");
    error: any;
    statusOptions = [{ id: "Provisional", text: "Provisional" }, { id: "Final", text: "Final" }];
    sittingHoursOptions = [{ id: "2pm - 6pm", text: "2pm - 6pm" }, { id: "7:30pm - 10pm", text: "7:30pm - 10pm" }];
    sectionDeleteIndex: number;
    isRemoveVisible: boolean;
    //modal
    @ViewChild('modal')
    modal: ModalComponent;
    //froala
    options: Object = {
        placeholderText: 'Edit Your Content Here!',
        charCounterCount: false
    }
    editorContent: string = 'My Document\'s Title'

    @ViewChildren(OrderPaperSectionOverviewComponent)
    childrenSectionComponents: QueryList<OrderPaperSectionOverviewComponent>;

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

    selectSection = (value: Section) => {
        this.selectedSection = value;
    }

    deleteSection = (value: number) => {
        this.sectionDeleteIndex = value;
        this.modal.open();
    }

    statusChange = (e: string) => {
        this.orderPaper.Status = e;
    }

    sittingHoursChange = (e: string) => {
        this.orderPaper.SittingHours = e;
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
        if (this.selectedSection != null && this.orderPaper.Sections[this.sectionDeleteIndex].Name == this.selectedSection.Name) {
            if (this.selectedSection != null)
                this.selectedSection = null;
        }
        this.orderPaper.Sections.splice(this.sectionDeleteIndex, 1);
    }
    dismissed() {

    }
}