import {
    Component,
    OnInit,
    ViewChild,
    Input,
    AfterViewInit
}                               from '@angular/core';
import { MotionItem }           from '../../models/items';
import { ItemComponent }        from './item.component';

@Component({
    selector: 'item-motion',
    template: `
                <div class="motion">
                    <div class="row">
                        <div class="col-md-10">
                            <a href="#" (click)="toggle($event, toggleId)">{{item.Title}}</a>
                        </div>
                        <div class="col-md-2">
                            <div class="pull-right">
                                <img *ngIf="isGroupChild == false" src="{{imagesPath + 'dragndrop.png'}}" height="23" [style.visibility]="item.hoverVisible ? 'visible' : 'hidden'">
                                <span>{{item.Type}}</span>
                            </div>
                        </div>
                    </div>
                    <div id="{{toggleId}}" class="initially-hidden">
                        <br />
                        <div class="form-group col-md-5 nopadding">
                            <label>Title</label>
                            <input type="text" class="form-control undraggable" [(ngModel)]="item.Title"/>
                        </div>
                    </div>
                </div>
                `,
    styles: [],
    providers: []
})
export class ItemMotionComponent extends ItemComponent implements OnInit, AfterViewInit{
    @Input()
    item: MotionItem;
    @Input()
    index: number;
    isExpand: boolean;
    @Input()
    isGroupChild: boolean = false;
    @Input()
    groupIndex: number;

    constructor() {
        super();
    }
    ngOnInit() {
        if (this.isGroupChild) {
            this.toggleId = this.index + '-' + this.groupIndex + '-motion';
        }
        else {
            this.toggleId = this.index + '-motion';
        }
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