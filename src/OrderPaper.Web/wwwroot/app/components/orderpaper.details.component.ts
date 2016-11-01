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
import { AppSettings }                      from '../settings/app.settings';
import { OrderPaper }                       from '../models/orderpaper';
import { Section, SectionSummary }          from '../models/section';
import { DND_PROVIDERS, DND_DIRECTIVES }    from '../directives/dnd/ng2-dnd';
import { ModalComponent }                   from '../directives/modal/modal';

@Component({
    selector: 'order-paper-details',
    template: `
                <div>
                    <div *ngIf="orderPaper">
                        <div class="row">
                            <div class="col-md-3">
                                <h3>Order Paper details</h3>
                                <br/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                Date
                            </div>
                            <div class="col-md-3">
                                Sitting hours
                            </div>
                            <div class="col-md-2">
                                Status
                            </div>
                            <div class="col-md-1">
                                OP Number
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <date-picker [id]="'orderPaperDate'" [IncludeTime]="false" [initialValue]="orderPaper.SittingDay" (onValueChange)="dateChange($event)"></date-picker>
                            </div>             
                            <div class="col-md-3">
                                <select2 [id]="'orderPaperSittingHours'" [initialValue]="orderPaper.SittingHours" [allowFreeText]="true" [disableMultipleSelection]="true" [multiple]="true" [data]="sittingHoursOptions" (selected)="sittingHoursChange($event)"></select2>
                                <!--<img src="{{imagesPath + 'time.png'}}">-->
                            </div>             
                            <div class="col-md-2">
                                <select2 [id]="'orderPaperStatus'" [enableSearch]="false" [initialValue]="orderPaper.Status" [width]="'125px'" [multiple]="false" [data]="statusOptions" (selected)="statusChange($event)"></select2>
                            </div>             
                            <div class="col-md-1">
                                <input class="form-control input-sm" type="number" onkeypress='return event.charCode >= 48 && event.charCode <= 57' [(ngModel)]="orderPaper.Number" />
                            </div>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-md-9">
                                <div *ngIf="orderPaper.Id != null" class="pull-left">
                                    <div style="display: inline">
                                        <img class="pointer" title="Preview" (click)="progress('Preview')" src="{{imagesPath + (orderPaper.Progress == 'Preview' ? 'preview highlighted with arrow.png' : 'preview not highlighted with arrow.png')}}">
                                    </div>
                                    <div style="display: inline">
                                        <img class="pointer" title="Word" (click)="progress('Word')" src="{{imagesPath + (orderPaper.Progress == 'Word' ? 'word highlighted with arrow.png' : 'word not highlighted with arrow.png')}}">
                                    </div>
                                    <div style="display: inline">
                                        <img class="pointer" title="Print" (click)="progress('Print')" src="{{imagesPath + (orderPaper.Progress == 'Print' ? 'print highlighted with arrow.png' : 'print not highlighted with arrow.png')}}">
                                    </div>
                                    <div style="display: inline">
                                        <img class="pointer" title="Publish" (click)="progress('Publish')" src="{{imagesPath + (orderPaper.Progress == 'Publish' ? 'publish highlighted with arrow.png' : 'publish not highlighted with arrow.png')}}">
                                    </div>
                                </div>
                                <div class="pull-right" style="padding-top: 10px;">
                                    <a class="btn btn-parliament" [ngClass]='{disabled: checkMandatory()}' (click)="save($event)">Save OP</a>
                                    <a class="btn btn-parliament" (click)="cancel()">Cancel</a>
                                </div>
                            </div>
                        </div>
                        <div id="saveSpinner"></div>
                        <div class="container row detail-block">
                            <span>
                                Sections
                            </span>
                            <br/>
                            <select2 [id]="'section-options-list'" [multiple]="true" [placeholder]="'Papers, Petitions, General debate'" [allowFreeText]="true" [data]="sectionOptions" [disableMultipleSelection]="true" (selected)="addSectionChange($event)"></select2>
                            <a (click)="addSelectedSection()">Add section</a>
                            <div class="spacer">
                            </div>
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
                        Are you sure to exist without saving changes?
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
    sittingHoursOptions = [{ id: "2pm to 6pm and 7:30pm to 10pm", text: "2pm to 6pm and 7:30pm to 10pm" }, { id: "2pm to 6pm", text: "2pm to 6pm" }];
    @Input()
    sectionOptions: any;
    sectionDeleteIndex: number;
    isRemoveVisible: boolean;
    addSection: string;
    spinElm: HTMLElement;
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
    dateChange = (value: string) => {
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

    addSectionChange = (e: Array<string>) => {
        if (e != null)
            this.addSection = e[0];
    }

    sittingHoursChange = (e: Array<string>) => {
        this.orderPaper.SittingHours = e != null && e.length > 0 ? e[0] : '';
    }

    addSelectedSection = () => {
        console.log(this.addSection);
        console.log(this.isFreeTextSection());
    }

    private isFreeTextSection = (): boolean => {
        var isFreeText = true;
        this.sectionOptions.forEach(item => {
            if (item.id == this.addSection)
                isFreeText = false;
        });
        return isFreeText;
    }

    checkMandatory(): boolean {
        return this.orderPaper.Number == null || this.orderPaper.Number.toString() == ''
            || this.orderPaper.SittingDay == null || this.orderPaper.SittingDay == ''
            || this.orderPaper.SittingHours == null || this.orderPaper.SittingHours == ''
            || this.orderPaper.Status == null || this.orderPaper.Status == '';
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
        this.spinElm = document.getElementById("saveSpinner");
        if (this.orderPaper.Id != null && this.orderPaper.Id != -1) {
            this.update(e);
            return;
        }
        this.spinner.spin(this.spinElm);
        this.orderPaper.Id = null;
        var paperString = JSON.stringify(this.orderPaper);
        e.preventDefault();
        this.orderPaperService.save(this.orderPaper).subscribe(
            (data: Response) => {
                this.spinner.stop();
            },
            (err: any) => this.error = err);
    }

    update = (e: any) => {
        var paperString = JSON.stringify(this.orderPaper);
        e.preventDefault();
        this.spinner.spin(this.spinElm);
        this.orderPaperService.update(this.orderPaper).subscribe(
            (data: Response) => {
                this.spinner.stop();
            },
            (err: any) => this.error = err);
    }

    cancel = () => {
        this.deletingType = "orderpaper";
        this.modal.open();
    }

    progress = (value: string) => {
        this.orderPaper.Progress = value;
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