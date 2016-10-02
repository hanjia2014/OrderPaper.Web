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
                            <div class="col-md-2">
                                <input placeholder="Number" [(ngModel)]="orderPaper.OrderPaperNumber" />
                            </div>
                            <div class="col-md-1">
                                <div class="col-md-2">
                                    <a href="#" (click)="toggle($event, 'order-paper-section-details')">{{isExpand ? 'Expand' : 'Collapse'}}</a>
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
                    
                    <!--<div [froalaEditor]="options" [(froalaModel)]="editorContent"></div>-->
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