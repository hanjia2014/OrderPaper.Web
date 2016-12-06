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
                    <div class="row">
                        <div class="col-md-12">
                            Sub heading
                            <div class="pull-right">
                                <img src="{{imagesPath + 'dragndrop.png'}}" height="23" [style.visibility]="item.hoverVisible ? 'visible' : 'hidden'">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            Full line <input type="text" class="form-control undraggable" [(ngModel)]="item.FullLine" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            Col 1a <input type="text" class="form-control undraggable" [(ngModel)]="item.Col1a" />
                        </div>
                        <div class="col-md-3">
                            Col 2a <input type="text" class="form-control undraggable" [(ngModel)]="item.Col2a" />
                        </div>
                        <div class="col-md-3">
                            Col 3a <input type="text" class="form-control undraggable" [(ngModel)]="item.Col3a" />
                        </div>
                        <div class="col-md-3">
                            Col 4a <input type="text" class="form-control undraggable" [(ngModel)]="item.Col4a" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            Col 1b <input type="text" class="form-control undraggable" [(ngModel)]="item.Col1b" />
                        </div>
                        <div class="col-md-3">
                            Col 2b <input type="text" class="form-control undraggable" [(ngModel)]="item.Col2b" />
                        </div>
                        <div class="col-md-3">
                            Col 3b <input type="text" class="form-control undraggable" [(ngModel)]="item.Col3b" />
                        </div>
                        <div class="col-md-3">
                            Col 4b <input type="text" class="form-control undraggable" [(ngModel)]="item.Col4b" />
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