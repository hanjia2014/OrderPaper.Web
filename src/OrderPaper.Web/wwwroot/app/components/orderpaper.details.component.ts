import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent }             from './base.component';
import { OrderPaper }                from '../models/orderpaper';
import { OrderPaperSummary }         from '../models/orderpapersummary';

@Component({
    selector: 'order-paper-details',
    template: `<div id="spinner"></div>
                <div *ngIf="orderPaper">
                {{orderPaper.Id}}
                </div>
                `,
    styles: [],
    providers: []
})
export class OrderPaperDetailsComponent extends BaseComponent implements OnInit {
    @Input()
    orderPaper: OrderPaper;
    spinnerElm: any = document.getElementById("spinner");
    error: any;

    constructor() {
        super();
    }
    ngOnInit() {
        this.spinner.spin(this.spinnerElm);
        
    }

    updateSequence(oldIndex: number, newIndex: number) { }
}