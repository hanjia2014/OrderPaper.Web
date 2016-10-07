import { Component, OnInit, NgZone } from '@angular/core';
import { BaseComponent }             from './base.component';
import { OrderPaper }                from '../models/orderpaper';
import { OrderPaperService }         from '../services/app.services';
import { OrderPaperSummary }         from '../models/orderpapersummary';

@Component({
    selector: 'home',
    template: `<div id="spinner"></div>
                <div class="navbar-fixed-top" style="position: relative">
                    <tabs>
                        <tab [title]="'History'" (onActiveChange)="onCheckTabMode($event)">
                            <div class="col-md-9">
                                <h3>Order Papers history</h3>
                                <table *ngIf="orderPaperSummary != null && orderPaperSummary.length > 0" class="table history-list">
                                    <thead>
                                        <tr>
                                            <th>Sitting day</th>
                                            <th>Status</th>
                                            <th>Number</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      <tr *ngFor="let summary of orderPaperSummary">
                                        <td>
                                            <a [class.bold]="selectedOrderPaper != null && summary.Id == selectedOrderPaper.Id" (click)="selectOrderPaper(summary.Id)">{{summary.Date | date: 'dd-MMM-yyyy'}}</a>
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
                    <div class="container">
                        <order-paper-details [orderPaper]="selectedOrderPaper"></order-paper-details>
                    </div>
                </div>
                `,
    styles: [`a{cursor:pointer}
                .bold{font-weight:bold}`],
    providers: [OrderPaperService]
})
export class HomeComponent extends BaseComponent implements OnInit {
    spinnerElm: any = document.getElementById("spinner");
    orderPaperStatus = [{ id: "Provisional", text: "Provisional" }, { id: "Final", text: "Final" }];
    isPreviewMode: boolean;
    selectedOrderPaper: OrderPaper;
    error: any;
    orderPaperSummary: Array<OrderPaperSummary> = new Array<OrderPaperSummary>();

    constructor(private orderPaperService: OrderPaperService) {
        super();
    }
    ngOnInit() {
        this.spinner.spin(this.spinnerElm);
        this.getOrderPaperSummary();
    }

    getOrderPaperSummary = () => {
        this.orderPaperService.getOrderPaperList().subscribe(
            (data: Array<OrderPaperSummary>) => {
                Object.assign(this.orderPaperSummary, data);
                this.spinner.stop();
            },
            (err: any) => this.error = err);
    }

    onCheckTabMode = (value: string) => {
        this.isPreviewMode = value == 'Preview';
    }

    selectOrderPaper = (id: string) => {
        this.spinner.spin(this.spinnerElm);
        this.orderPaperService.getOrderPaper(id).subscribe(
            (data: OrderPaper) => {
                if (this.selectedOrderPaper == null) {
                    this.selectedOrderPaper = new OrderPaper();
                }
                Object.assign(this.selectedOrderPaper, data);
                this.spinner.stop();
            },
            (err: any) => this.error = err);
    }

    createNewOrderPaper = () => {
        this.selectedOrderPaper = new OrderPaper();
    }

    updateSequence(oldIndex: number, newIndex: number) { }
}