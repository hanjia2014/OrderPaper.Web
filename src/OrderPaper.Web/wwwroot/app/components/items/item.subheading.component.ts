import {
    Component,
    OnInit,
    ViewChild,
    Input,
    AfterViewInit
}                           from '@angular/core';
import { SubHeadingItem }   from '../../models/items';
import { ItemComponent }    from './item.component';

@Component({
    selector: 'item-subheading',
    template: `
                <div class="subheading">
                    <div class="row" style="cursor: move;">
                        <div class="col-md-12">
                            Sub heading
                            <div class="pull-right">
                                <img src="{{imagesPath + 'dragndrop.png'}}" height="23" [style.visibility]="item.hoverVisible ? 'visible' : 'hidden'">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="subheading-col-lable">Full line</div> <input type="text" class="form-control undraggable" [(ngModel)]="item.FullLine" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="subheading-col-lable">Column 1a</div> <input type="text" class="form-control undraggable" [(ngModel)]="item.Col1a" />
                        </div>
                        <div class="col-md-3">
                            <div class="subheading-col-lable">Column 2a</div> <input type="text" class="form-control undraggable" [(ngModel)]="item.Col2a" />
                        </div>
                        <div class="col-md-3">
                            <div class="subheading-col-lable">Column 3a</div> <input type="text" class="form-control undraggable" [(ngModel)]="item.Col3a" />
                        </div>
                        <div class="col-md-3">
                            <div class="subheading-col-lable">Column 4a</div> <input type="text" class="form-control undraggable" [(ngModel)]="item.Col4a" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="subheading-col-lable">Column 1b</div> <input type="text" class="form-control undraggable" [(ngModel)]="item.Col1b" />
                        </div>
                        <div class="col-md-3">
                            <div class="subheading-col-lable">Column 2b</div> <input type="text" class="form-control undraggable" [(ngModel)]="item.Col2b" />
                        </div>
                        <div class="col-md-3">
                            <div class="subheading-col-lable">Column 3b</div> <input type="text" class="form-control undraggable" [(ngModel)]="item.Col3b" />
                        </div>
                        <div class="col-md-3">
                            <div class="subheading-col-lable">Column 4b</div> <input type="text" class="form-control undraggable" [(ngModel)]="item.Col4b" />
                        </div>
                    </div>
                </div>
                `,
    styles: [],
    providers: []
})
export class ItemSubheadingComponent extends ItemComponent implements OnInit, AfterViewInit {
    @Input()
    item: SubHeadingItem;
    @Input()
    index: number;
    @Input()
    sectionIndex: number;
    isExpand: boolean;

    constructor() {
        super();
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