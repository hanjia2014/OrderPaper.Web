import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { BaseComponent }                        from './base.component';
import { Tabs }                                 from '../directives/tabs/tabs';
import { Section, SectionSummary }              from '../models/section';
import { OrderPaper }                           from '../models/orderpaper';
import { SelectedOP }                           from '../models/selectedop';
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
                                            <th>
                                                <a class="pointer" (click)="sortByNumber()">Number</a>
                                            </th>
                                            <th>
                                                <a class="pointer" (click)="sortBySittingDay()">Sitting day</a>
                                            </th>
                                            <th>
                                                <a class="pointer" (click)="sortByStatus()">Status</a>
                                            </th>
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
                    <div style="background-color: #edecec;">
                        <div class="container" style="padding-left: 10%;">
                            <order-paper-details [orderPaper]="selectedOrderPaper" (onSave)="orderPaperSaveCallback()" [sectionOptions]="sectionOptions"></order-paper-details>
                        </div>
                    </div>
                    <modal [animation]="animation" [keyboard]="keyboard" [backdrop]="backdrop" (onClose)="closed()" (onDismiss)="dismissed()"
                       (onOpen)="opened()" [cssClass]="cssClass" #modal>
                        <modal-header [show-close]="true">
                            <h4 class="modal-title" *ngIf="modalType == modalType_Delete">Confirm to delete</h4>
                            <h4 class="modal-title" *ngIf="modalType == modalType_Save">Confirm to save</h4>
                        </modal-header>
                        <modal-body>
                            <div *ngIf="modalType == modalType_Delete">Are you sure to delete the Order Paper?</div>
                            <div *ngIf="modalType == modalType_Save">Are you sure to open another Order Paper without saving the current Order Paper?</div>
                        </modal-body>
                        <modal-footer [show-default-buttons]="true"></modal-footer>
                    </modal>
                </div>
                <!--<div class="footer">
                    <div style="margin-top: 40px;">
                        <img *ngIf="selectedOrderPaper != null" src="{{imagesPath + 'smiley.png'}}" height="23">
                    </div>
                </div>-->
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
                .header-green-text a{
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
    selectedop: SelectedOP = new SelectedOP();
    //modal
    modalType: string;
    modalType_Save: string = "Saving confirm";
    modalType_Delete: string = "Deleting confirm";
    modal_selected_id: string;
    //sorting
    sorting_number_descending: boolean;
    sorting_status_descending: boolean;
    sorting_sitting_day_descending: boolean;

    constructor(private orderPaperService: OrderPaperService) {
        super();
    }
    ngOnInit() {
        this.listElm = document.getElementById("spinner");
        this.getOrderPaperSummary();
        this.getSectionSummary();
    }

    orderPaperSaveCallback = () => {
        this.getOrderPaperSummary();
        this.selectedop.Saved = true;
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
        if (this.selectedOrderPaper != null && this.selectedop.Saved == false) {
            this.modalType = this.modalType_Save;
            this.modal_selected_id = id;
            this.modal.open();
        }
        else {
            this.downloadOrderPaper(id);
        }
    }

    private downloadOrderPaper = (id: string) => {
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

                this.selectedop.Id = this.selectedOrderPaper.Id;
                this.selectedop.Saved = false;
                //this.selectedop.Value = new OrderPaper();
                //var temp = <OrderPaper>(JSON.parse(data.OrderPaperJson));
                //this.selectedop.Value.Id = temp.Id;
                //this.selectedop.Value.Number = temp.Number;
                //this.selectedop.Value.Progress = temp.Progress;
                //this.selectedop.Value.Sections = temp.Sections;
                //this.selectedop.Value.SittingDay = temp.SittingDay;
                //this.selectedop.Value.SittingHours = temp.SittingHours;
                //this.selectedop.Value.Status = temp.Status;

                this.spinner.stop();
                this.tabs.collapseAll();
            },
            (err: any) => this.error = err);
    }

    createNewOrderPaper = () => {
        this.selectOrderPaper("-1");
    }

    deleteOrderPaper = (summary: OrderPaperWrapper, index: number) => {
        this.modalType = this.modalType_Delete;
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
        if (this.modalType == this.modalType_Delete) {
            this.orderPaperService.delete(this.deletedSummary.Id.toString()).subscribe(
                (data: boolean) => {
                    if (data) {
                        this.orderPaperSummary.splice(this.deletedIndex, 1);
                    }
                },
                (err: any) => this.error = err
            );
        }
        else if (this.modalType == this.modalType_Save) {
            this.downloadOrderPaper(this.modal_selected_id);
        }
    }
    dismissed() {

    }

    // op number sorting
    sortByNumber = () => {
        if (this.sorting_number_descending == null || this.sorting_number_descending == false) {
            this.orderPaperSummary.sort((a: OrderPaperWrapper, b: OrderPaperWrapper) => {
                if (a.Number > b.Number) return -1;
                else if (a.Number < b.Number) return 1;
                else return 0;
            });
        }
        if (this.sorting_number_descending) {
            this.orderPaperSummary.sort((a: OrderPaperWrapper, b: OrderPaperWrapper) => {
                if (a.Number < b.Number) return -1;
                else if (a.Number > b.Number) return 1;
                else return 0;
            });
        }

        this.sorting_number_descending = !this.sorting_number_descending;
    }

    sortByStatus = () => {
        if (this.sorting_status_descending == null || this.sorting_status_descending == false) {
            this.orderPaperSummary.sort((a: OrderPaperWrapper, b: OrderPaperWrapper) => {
                if (a.Status > b.Status) return -1;
                else if (a.Status < b.Status) return 1;
                else return 0;
            });
        }
        if (this.sorting_status_descending) {
            this.orderPaperSummary.sort((a: OrderPaperWrapper, b: OrderPaperWrapper) => {
                if (a.Status < b.Status) return -1;
                else if (a.Status > b.Status) return 1;
                else return 0;
            });
        }

        this.sorting_status_descending = !this.sorting_status_descending;
    }

    sortBySittingDay = () => {
        if (this.sorting_sitting_day_descending == null || this.sorting_sitting_day_descending == false) {
            this.orderPaperSummary.sort((a: OrderPaperWrapper, b: OrderPaperWrapper) => {
                var a_day = this.parseDate(a.SittingDay);
                var b_day = this.parseDate(b.SittingDay);
                if (a_day > b_day) return -1;
                else if (a_day < b_day) return 1;
                else return 0;
            });
        }
        if (this.sorting_sitting_day_descending) {
            this.orderPaperSummary.sort((a: OrderPaperWrapper, b: OrderPaperWrapper) => {
                var a_day = this.parseDate(a.SittingDay);
                var b_day = this.parseDate(b.SittingDay);
                if (a_day < b_day) return -1;
                else if (a_day > b_day) return 1;
                else return 0;
            });
        }

        this.sorting_sitting_day_descending = !this.sorting_sitting_day_descending;
    }

    private parseDate = (s: string): Date => {
        var months = {
            Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
            Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
        };
        var p = s.split('-');
        var year = parseInt(p[2]);
        var month = months[p[1]];
        var day = parseInt(p[0]);
        return new Date(year, month, day);
    }
}