import { Component,
    AfterViewInit,
    OnInit,
    Input,
    ViewChild,
    ViewChildren,
    QueryList
}                                           from '@angular/core';
import { Response }                         from '@angular/http';
import { BaseComponent }                    from './base.component';
import { OrderPaperSectionComponent }       from './orderpaper.section.component';
import { OrderPaperService }                from '../services/app.services';
import { OrderPaper }                       from '../models/orderpaper';
import { Section }                          from '../models/section';
import { DND_PROVIDERS, DND_DIRECTIVES }    from '../directives/dnd/ng2-dnd';
import { ModalComponent }                   from '../directives/modal/modal';

@Component({
    selector: 'order-paper-details',
    template: `
                <div>
                    <div *ngIf="orderPaper">
                        <div class="row">
                            <div class="col-md-3">
                                <h3>Order paper details</h3>
                                <br/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                Date
                            </div>
                            <div class="col-md-3">
                                Sitting Hours
                            </div>
                            <div class="col-md-2">
                                Status
                            </div>
                            <div class="col-md-1">
                                Number
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <date-picker [id]="'orderPaperDate'" [IncludeTime]="false" [initialValue]="orderPaper.SittingDay" (onValueChange)="dateChange($event)"></date-picker>
                                <!--<datetime [timepicker]="false" [(ngModel)]="orderPaper.SittingDay" [initialValue]="orderPaper.SittingDay" [datepicker]="{ format: 'd M yyyy' }"></datetime>-->
                            </div>             
                            <div class="col-md-3">
                                <select2 [id]="'orderPaperSittingHours'" [enableSearch]="false" [initialValue]="orderPaper.SittingHours" [multiple]="false" [data]="sittingHoursOptions" (selected)="sittingHoursChange($event)"></select2>
                                <!--<img src="{{imagesPath + 'time.png'}}">-->
                            </div>             
                            <div class="col-md-2">
                                <select2 [id]="'orderPaperStatus'" [enableSearch]="false" [initialValue]="orderPaper.Status" [width]="'125px'" [multiple]="false" [data]="statusOptions" (selected)="statusChange($event)"></select2>
                            </div>             
                            <div class="col-md-1">
                                <input class="form-control input-sm" [(ngModel)]="orderPaper.Number" />
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-md-9">
                                <div *ngIf="orderPaper.Id == null" class="pull-left">
                                    <a class="btn btn-parliament" (click)="cancel()">Cancel</a>
                                </div>
                                <div *ngIf="orderPaper.Id != null" class="pull-left">
                                    <div style="display: inline">
                                        <img class="pointer" src="{{imagesPath + 'preview not highlighted with arrow.png'}}">
                                    </div>
                                    <div style="display: inline">
                                        <img class="pointer" src="{{imagesPath + 'word not highlighted with arrow.png'}}">
                                    </div>
                                    <div style="display: inline">
                                        <img class="pointer" src="{{imagesPath + 'print not highlighted with arrow.png'}}">
                                    </div>
                                    <div style="display: inline">
                                        <img class="pointer" src="{{imagesPath + 'publish not highlighted with arrow.png'}}">
                                    </div>
                                </div>
                                <div class="pull-right" style="padding-top: 10px;">
                                    <a class="btn btn-parliament" (click)="save($event)">Save</a>
                                </div>
                            </div>
                        </div>
                        <div class="container row" style="margin-top: 30px;">
                            <ul sortable id="sortable-section" (onStopSort)="stopSort($event)">
                                <li *ngFor="let section of orderPaper.Sections; let i = index" class="item-li">
                                    <order-paper-section [section]="section" [index]="i" [isSelected]="selectedSection != null && section.Name == selectedSection.Name" (onSelectSection)="selectSection($event, i)" (onDeleteSection)="deleteSection($event)"></order-paper-section>
                                </li>  
                            </ul>
                        </div>
                    </div>
                </div>
                <modal [animation]="animation" [keyboard]="keyboard" [backdrop]="backdrop" (onClose)="closed()" (onDismiss)="dismissed()"
                       (onOpen)="opened()" [cssClass]="cssClass" #modal>
                    <modal-header [show-close]="true">
                        <h4 class="modal-title">Confirm to delete</h4>
                    </modal-header>
                    <modal-body>
                        Are you sure to delete the {{deletingType=='section' ? 'section' : 'order paper'}}?
                    </modal-body>
                    <modal-footer [show-default-buttons]="true"></modal-footer>
                </modal>
                `,
    styles: [],
    providers: [OrderPaperService]
})
export class OrderPaperDetailsComponent extends BaseComponent implements OnInit, AfterViewInit {
    @Input()
    orderPaper: OrderPaper;
    selectedSection: Section;
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
    deletingType = '';

    @ViewChildren(OrderPaperSectionComponent)
    childrenSectionComponents: QueryList<OrderPaperSectionComponent>;

    constructor(private orderPaperService: OrderPaperService) {
        super();
    }
    ngOnInit() {
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

        //$('.item-li').draggable({ cancel: 'a' });
    }

    dateChange = (value: Date) => {
        this.orderPaper.SittingDay = value;
    }

    selectSection = (value: Section, index: number) => {
        //this.selectedSection = value;
        var children = this.childrenSectionComponents.toArray();
        for (var i = 0; i < children.length; i++) {
            if (i != index && children[i].isSelected) {
                children[i].toggle(children[i], i + '-section', false);
            }
        }
    }

    deleteSection = (value: number) => {
        this.sectionDeleteIndex = value;
        this.deletingType = "section";
        this.modal.open();
    }

    statusChange = (e: string) => {
        if(e != null)
            this.orderPaper.Status = e;
    }

    sittingHoursChange = (e: string) => {
        if (e != null)
            this.orderPaper.SittingHours = e;
    }

    updateSequence(oldIndex: number, newIndex: number) { }

    stopSort = (e: any) => {
        var original = e.original;
        var updated = e.updated;
        var updatedSection = this.orderPaper.Sections[original];
        //remove item from original index
        this.orderPaper.Sections.splice(original, 1);
        //add the item to updated index
        this.orderPaper.Sections.splice(updated, 0, updatedSection);

    }

    save = (e: any) => {
        var paperString = JSON.stringify(this.orderPaper);
        e.preventDefault();
        this.orderPaperService.save(this.orderPaper).subscribe(
            (data: Response) => {

            },
            (err: any) => this.error = err);
    }

    cancel = () => {
        this.deletingType = "orderpaper";
        this.modal.open();
    }
    //modal
    opened() {

    }

    navigate() {

    }

    open() {
        this.modal.open();
    }
    closed() {
        if (this.deletingType == "orderpaper") {
            this.orderPaper = null;
        }
        else {
            if (this.selectedSection != null && this.orderPaper.Sections[this.sectionDeleteIndex].Name == this.selectedSection.Name) {
                if (this.selectedSection != null)
                    this.selectedSection = null;
            }
            this.orderPaper.Sections.splice(this.sectionDeleteIndex, 1);
        }
    }
    dismissed() {

    }
}