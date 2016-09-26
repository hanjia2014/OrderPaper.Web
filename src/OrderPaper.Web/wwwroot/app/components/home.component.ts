﻿import { Component, OnInit, NgZone } from '@angular/core';
import { BaseComponent }             from './base.component';
import { OrderPaper }                from '../models/orderpaper';
import { OrderPaperService }         from '../services/app.services';
import { OrderPaperSummary }         from '../models/orderpapersummary';

@Component({
    selector: 'home',
    template: `<div id="spinner"></div>
                <div class="navbar-fixed-top" style="box-shadow: 0 14px 24px -14px gray; position: relative">
                    <tabs>
                        <tab [title]="'History'" (onActiveChange)="onCheckTabMode($event)">
                            <div class="form">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Number</th>
                                            <th>Status</th>
                                            <th></th>
                                            <th></th>
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
                                            <a class="btn btn-lg save-button" (click)="deleteOrderPaper(summary.Id)">
                                                Delete
                                            </a>
                                        </td>
                                        <td>
                                            <a class="btn btn-lg save-button" (click)="copyOrderPaper(summary.Id)">
                                                Copy
                                            </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                </table>
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
                    <order-paper-details [orderPaper]="selectedOrderPaper"></order-paper-details>
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

    updateSequence(oldIndex: number, newIndex: number) { }
}