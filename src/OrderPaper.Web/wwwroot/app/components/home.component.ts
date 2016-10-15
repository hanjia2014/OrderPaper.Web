import { Component, OnInit, NgZone } from '@angular/core';
import { BaseComponent }             from './base.component';
import { OrderPaper }                from '../models/orderpaper';
import { OrderPaperService }         from '../services/app.services';
import { OrderPaperSummary }         from '../models/orderpapersummary';

@Component({
    selector: 'home',
    template: `
                <div class="navbar-fixed-top" style="position: relative; background-color: #263a55">
                    <tabs>
                        <tab [title]="'History'" (onActiveChange)="onCheckTabMode($event)">
                            <div class="col-md-9 nopadding">
                                <h3 class="header-green-text">Order Papers history</h3>
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
                                      <tr *ngFor="let summary of orderPaperSummary" class="header-white-text">
                                        <td >
                                            <a class="header-table-link" [class.bold]="selectedOrderPaper != null && summary.Id == selectedOrderPaper.Id" (click)="selectOrderPaper(summary.Id)">
                                                <span>
                                                    <img src="/content/images/icons/open.png">
                                                </span>
                                                {{summary.Date | date: 'dd-MMM-yyyy'}}
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
                                                <img src="/content/images/icons/delete.png" (click)="deleteOrderPaper(summary.Id)">
                                            </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                </table>
                                <div *ngIf="orderPaperSummary == null || orderPaperSummary.length == 0">
                                    <a class="btn btn-parliament" (click)="createNewOrderPaper()">New Order Paper</a>
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
                        <div class="container">
                            <order-paper-details [orderPaper]="selectedOrderPaper"></order-paper-details>
                        </div>
                    </div>
                </div>
                `,
    styles: [`
                a{
                    cursor:pointer
                }
                .bold{
                    font-weight:bold
                }
                .table > tbody > tr > td, .table > tbody > tr > th, .table > tfoot > tr > td, .table > tfoot > tr > th, .table > thead > tr > td, .table > thead > tr > th {
                    padding: 0px;
                }
                .header-green-text{
                    color: #abded2;
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
            `],
    providers: [OrderPaperService]
})
export class HomeComponent extends BaseComponent implements OnInit {
    
    orderPaperStatus = [{ id: "Provisional", text: "Provisional" }, { id: "Final", text: "Final" }];
    isPreviewMode: boolean;
    selectedOrderPaper: OrderPaper;
    error: any;
    orderPaperSummary: Array<OrderPaperSummary> = new Array<OrderPaperSummary>();

    constructor(private orderPaperService: OrderPaperService) {
        super();
    }
    ngOnInit() {
        this.getOrderPaperSummary();
    }

    getOrderPaperSummary = () => {
        this.orderPaperService.getOrderPaperList().subscribe(
            (data: Array<OrderPaperSummary>) => {
                (<any>Object).assign(this.orderPaperSummary, data);
            },
            (err: any) => this.error = err);
    }

    onCheckTabMode = (value: string) => {
        this.isPreviewMode = value == 'Preview';
    }

    selectOrderPaper = (id: string) => {
        this.orderPaperService.getOrderPaper(id).subscribe(
            (data: OrderPaper) => {
                if (this.selectedOrderPaper == null) {
                    this.selectedOrderPaper = new OrderPaper();
                }
                (<any>Object).assign(this.selectedOrderPaper, data);
            },
            (err: any) => this.error = err);
    }

    createNewOrderPaper = () => {
        this.selectedOrderPaper = new OrderPaper();
    }

    updateSequence(oldIndex: number, newIndex: number) { }
}