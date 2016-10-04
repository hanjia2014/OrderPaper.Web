import {
    Component,
    OnInit,
    ViewChild,
    Input,
    AfterViewInit
}                               from '@angular/core';
import { ReportItem }             from '../../models/items';

@Component({
    selector: 'item-report',
    template: `
                <div class="report">
                    <div class="row">
                        <div class="col-md-8">
                            <h1>Report (Sequence -- {{item.Sequence}})</h1>
                        </div>
                    </div>
                </div>
                `,
    styles: [],
    providers: []
})
export class ItemReportComponent implements OnInit, AfterViewInit{
    @Input()
    item: ReportItem;
    @Input()
    index: number;
    isExpand: boolean;

    constructor() {
    }
    ngOnInit() {
    }

    ngAfterViewInit() {
        $('.undraggable')
            .on('focus', function (e) {
                $('.item-li').attr("draggable", "false");
            })
            .on('blur', function (e) {
                $('.item-li').attr("draggable", "true");
            });
    }

    toggle(element: any, eleId: string) {
        element.preventDefault();

        this.isExpand = !this.isExpand;
        var eleId = "#" + eleId;
        $(eleId).slideToggle();
    }
}