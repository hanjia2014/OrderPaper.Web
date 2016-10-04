import {
    Component,
    OnInit,
    ViewChild,
    Input,
    AfterViewInit
}                               from '@angular/core';
import { MotionItem }           from '../../models/items';

@Component({
    selector: 'item-motion',
    template: `
                <div class="report">
                    <div class="row">
                        <div class="col-md-8">
                            <h1>Motion (Sequence -- {{item.Sequence}})</h1>
                        </div>
                    </div>
                </div>
                `,
    styles: [],
    providers: []
})
export class ItemMotionComponent implements OnInit, AfterViewInit{
    @Input()
    item: MotionItem;
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