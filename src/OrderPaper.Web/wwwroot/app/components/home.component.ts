﻿import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { BaseComponent }                        from './base.component';
import { Tabs }                                 from '../directives/tabs/tabs';
import { Section, SectionSummary }              from '../models/section';
import { OrderPaper }                           from '../models/orderpaper';
import { OrderPaperWrapper }                    from '../models/orderpaperwrapper';
import { OrderPaperService }                    from '../services/app.services';
import { ModalComponent }                       from '../directives/modal/modal';

@Component({
    selector: 'home',
    template: `
                <div class="navbar-fixed-top" style="position: relative; background-color: #263a55">
                    <tabs (onCreateNewOrderPaper)="createNewOrderPaper()">
                        <tab [title]="'History'" (onActiveChange)="onCheckTabMode($event)">
                            <div class="col-md-9 nopadding">
                                <div>
                                    <h3 class="header-green-text pull-left">Order Papers history</h3>
                                </div>
                                <table *ngIf="orderPaperSummary != null && orderPaperSummary.length > 0" id="orderpaper-history-list" class="table history-list">
                                    <thead>
                                        <tr class="header-green-text">
                                            <th>OP Number</th>
                                            <th>Sitting day</th>
                                            <th>Status</th>
                                            <th>Version</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr *ngFor="let summary of orderPaperSummary | paginate: { itemsPerPage: 15, currentPage: p }; let i = index" class="header-white-text" [class.header-select-highlight]="selectedOrderPaper != null && summary.Id == selectedOrderPaper.Id">
                                            <td>
                                                {{summary.Number}}
                                            </td>
                                            <td>
                                                <a class="header-table-link" (click)="selectOrderPaper(summary.Id)">
                                                    <span style="margin-right: 5px;">
                                                        <img src="{{imagesPath + 'open.png'}}">
                                                    </span>
                                                    {{summary.SittingDay}}
                                                </a>
                                            </td>
                                            <td>
                                                {{summary.Status}}
                                            </td>
                                            <td>
                                            </td>
                                            <td>
                                                <a>
                                                    <img src="{{imagesPath + 'delete.png'}}" (click)="deleteOrderPaper(summary, i)">
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div id="spinner"></div>
                                <div *ngIf="orderPaperSummary != null && orderPaperSummary.length > 0">
                                    <pagination-controls class="pull-right" (pageChange)="p = $event"></pagination-controls>
                                </div>
                            </div>
                        </tab>
                        <tab [title]="'Search'" (onActiveChange)="onCheckTabMode($event)">
                        </tab>
                    </tabs>
                    <div style="background-color: #edecec">
                        <div class="container" style="padding-left: 10%;">
                            <order-paper-details [orderPaper]="selectedOrderPaper" [sectionOptions]="sectionOptions"></order-paper-details>
                        </div>
                    </div>
                    <modal [animation]="animation" [keyboard]="keyboard" [backdrop]="backdrop" (onClose)="closed()" (onDismiss)="dismissed()"
                       (onOpen)="opened()" [cssClass]="cssClass" #modal>
                        <modal-header [show-close]="true">
                            <h4 class="modal-title">Confirm to delete</h4>
                        </modal-header>
                        <modal-body>
                            Are you sure to delete the Order Paper?
                        </modal-body>
                        <modal-footer [show-default-buttons]="true"></modal-footer>
                    </modal>
                </div>
                `,
    styles: [`
                a{
                    cursor:pointer
                }
                .header-select-highlight{
                    background-color: #142840;
                }
                .header-green-text{
                    color: #2ebcc5;
                }
                .header-white-text{
                    color: #fdfdfd;
                }
                .header-table-link{
                    color: #fdfdfd;
                }
                .header-table-link : hover{
                    color: #abded2;
                }
                .history-list > tbody > tr: hover {
                    background-color: #142840;
                }
                .history-list > tbody > tr > td {
                    border-top: none;
                    padding: 6px;
                }

                .history-list > thead > tr > th {
                    border-bottom: none;
                    font-weight: normal;
                }
            `],
    providers: [OrderPaperService]
})
export class HomeComponent extends BaseComponent implements OnInit {
    
    orderPaperStatus = [{ id: "Provisional", text: "Provisional" }, { id: "Final", text: "Final" }];
    isPreviewMode: boolean;
    selectedOrderPaper: OrderPaper;
    error: any;
    orderPaperSummary: Array<OrderPaperWrapper> = new Array<OrderPaperWrapper>();
    listElm: HTMLElement = document.getElementById("spinner");
    @ViewChild(Tabs)
    tabs: Tabs;
    //modal
    @ViewChild('modal')
    modal: ModalComponent;
    sectionOptions = [];
    deletedSummary: OrderPaperWrapper;
    deletedIndex: number;

    constructor(private orderPaperService: OrderPaperService) {
        super();
    }
    ngOnInit() {
        this.listElm = document.getElementById("spinner");
        this.getOrderPaperSummary();
        this.getSectionSummary();
    }

    getOrderPaperSummary = () => {
        this.spinner.spin(this.listElm);
        this.orderPaperService.getOrderPaperList().subscribe(
            (data: Array<OrderPaperWrapper>) => {
                (<any>Object).assign(this.orderPaperSummary, data);
                this.spinner.stop();
            },
            (err: any) => this.error = err);
    }

    getSectionSummary = () => {
        this.orderPaperService.getSectionSummaryList().subscribe(
            (data: Array<SectionSummary>) => {
                data.forEach((option: SectionSummary) => {
                    this.sectionOptions.push({id: option.Id, text: option.Text});
                });
                this.spinner.stop();
            },
            (err: any) => this.error = err);
    }

    onCheckTabMode = (value: string) => {
        this.isPreviewMode = value == 'Preview';
    }

    selectOrderPaper = (id: string) => {
        this.spinner.spin(this.listElm);
        this.orderPaperService.getOrderPaper(id).subscribe(
            (data: OrderPaperWrapper) => {
                this.selectedOrderPaper = new OrderPaper();
                var nextNumber = 0;
                if (data.OrderPaperJson != null && data.OrderPaperJson != "") {
                    var op = JSON.parse(data.OrderPaperJson);
                    (<any>Object).assign(this.selectedOrderPaper, op);
                    if (this.selectedOrderPaper != null) {
                        nextNumber = parseInt(this.selectedOrderPaper.Number.toString()) + 1;
                    }
                }
                this.selectedOrderPaper.Id = id == "-1" ? -1 : data.Id;
                if (id == "-1") {
                    this.selectedOrderPaper.SittingDay = data.SittingDay;
                    this.selectedOrderPaper.Status = "Provisional";
                    this.selectedOrderPaper.SittingHours = "2pm to 6pm and 7:30pm to 10pm";
                    this.selectedOrderPaper.Number = nextNumber == 0 ? 1 : nextNumber;
                }
                this.spinner.stop();
                this.tabs.collapseAll();
            },
            (err: any) => this.error = err);
    }

    createNewOrderPaper = () => {
        this.selectOrderPaper("-1");
    }

    deleteOrderPaper = (summary: OrderPaperWrapper, index: number) => {
        this.deletedSummary = summary;
        this.deletedIndex = index;
        this.modal.open();
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
        this.orderPaperService.delete(this.deletedSummary.Id.toString()).subscribe(
            (data: boolean) => {
                if (data) {
                    this.orderPaperSummary.splice(this.deletedIndex, 1);
                }
            },
            (err: any) => this.error = err
        );
    }
    dismissed() {

    }
}