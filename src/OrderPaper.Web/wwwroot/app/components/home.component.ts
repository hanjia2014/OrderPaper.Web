import { Component, OnInit, NgZone } from '@angular/core';
import { BaseComponent }             from './base.component';
import { OrderPaper }                from '../models/orderpaper';
import { OrderPaperWrapper }         from '../models/orderpaperwrapper';
import { OrderPaperService }         from '../services/app.services';

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
                                            <th>Sitting day</th>
                                            <th>Status</th>
                                            <th>Number</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      <tr *ngFor="let summary of orderPaperSummary | paginate: { itemsPerPage: 15, currentPage: p }" class="header-white-text" [class.header-select-highlight]="selectedOrderPaper != null && summary.Id == selectedOrderPaper.Id">
                                        <td>
                                            <a class="header-table-link" (click)="selectOrderPaper(summary.Id)">
                                                <span style="margin-right: 5px;">
                                                    <img src="{{imagesPath + 'open.png'}}">
                                                </span>
                                                {{summary.SittingDay | date: 'dd-MMM-yyyy'}}
                                            </a>
                                        </td>
                                        <td>
                                            {{summary.Number}}
                                        </td>
                                        <td>
                                            {{summary.Status}}
                                        </td>
                                        <td>
                                            <a>
                                                <img src="{{imagesPath + 'delete.png'}}" (click)="deleteOrderPaper(summary.Id)">
                                            </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                </table>
                                
                                <div *ngIf="orderPaperSummary != null && orderPaperSummary.length > 0">
                                    <pagination-controls class="pull-right" (pageChange)="p = $event"></pagination-controls>
                                </div>
                            </div>
                        </tab>
                        <tab [title]="'Search'" (onActiveChange)="onCheckTabMode($event)">
                            <vertical-menu></vertical-menu>
                        </tab>
                        <tab [title]="'Preview'" (onActiveChange)="onCheckTabMode($event)">
                            <div class=" form row">
                                <a class="btn btn-lg save-button pull-right" (click)="printPreview($event)">
                                    <span class="glyphicon glyphicon-print"></span> Print
                                </a>
                                <a class="btn btn-lg save-button pull-left" (click)="openPreview($event)">
                                    <span class="glyphicon glyphicon-print"></span> Open
                                </a>
                            </div>
                        </tab>
                    </tabs>
                    <div style="background-color: #fdfdfd">
                        <div class="container" style="padding-left: 10%;">
                            <order-paper-details [orderPaper]="selectedOrderPaper"></order-paper-details>
                        </div>
                    </div>
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

    constructor(private orderPaperService: OrderPaperService) {
        super();
    }
    ngOnInit() {
        this.getOrderPaperSummary();
    }

    getOrderPaperSummary = () => {
        this.orderPaperService.getOrderPaperList().subscribe(
            (data: Array<OrderPaperWrapper>) => {
                (<any>Object).assign(this.orderPaperSummary, data);
            },
            (err: any) => this.error = err);
    }

    onCheckTabMode = (value: string) => {
        this.isPreviewMode = value == 'Preview';
    }

    selectOrderPaper = (id: string) => {
        this.orderPaperService.getOrderPaper(id).subscribe(
            (data: OrderPaperWrapper) => {
                if (this.selectedOrderPaper == null) {
                    this.selectedOrderPaper = new OrderPaper();
                }
                var op = JSON.parse(data.OrderPaperJson);
                (<any>Object).assign(this.selectedOrderPaper, op);
            },
            (err: any) => this.error = err);
    }

    createNewOrderPaper = () => {
        this.selectedOrderPaper = new OrderPaper();
    }

    updateSequence(oldIndex: number, newIndex: number) { }
}