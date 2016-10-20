import {
    AUTO_STYLE,
    trigger,
    state,
    animate,
    transition,
    style,
    HostBinding,
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    AfterViewInit
}                           from '@angular/core';
import { BaseComponent }    from './base.component';
import { OrderPaper }       from '../models/orderpaper';
import { Section }          from '../models/section';
import { Item,
    LineItem,
    MotionItem,
    GroupItem,
    ReportItem,
    BillItem
}                           from '../models/items';
import { AppSettings }      from '../settings/app.settings';

@Component({
    selector: 'order-paper-section',
    template: `
                <div class="row" (mouseover)="hoverVisible = true" (mouseleave)="hoverVisible = false">
                    <div class="col-md-8 panel panel-default margin-left-15">
                        <div class="panel-body no-padding-left">
                            <div class="drag-handle">
                                <a (click)="toggle($event, index + '-section', true)">{{section.Name}}</a>
                                <div class="pull-right">
                                    <a>
                                        <img (click)="section.IsIncluded = !section.IsIncluded" style="height: 20px; margin-right: 10px;" src="{{section.IsIncluded ? imagesPath + 'included.png' : imagesPath + 'excluded.png'}}">
                                    </a>
                                    <img src="{{imagesPath + 'dragndrop.png'}}" height="23" [style.visibility]="hoverVisible ? 'visible' : 'hidden'">
                                    <a data-placement="left" data-toggle="tooltip" data-original-title="Tooltip on top">
                                        <img (click)="section.IsFrontPage = !section.IsFrontPage" style="height: 20px; margin-left: 10px;" src="{{section.IsFrontPage ? imagesPath + 'flag - section on front cover.png' : imagesPath + 'Not on front cover.png'}}">
                                    </a>
                                </div>
                            </div>
                            <div id="{{index + '-section'}}" class="initially-hidden">
                                <order-paper-section-details [index]="index" [section]="section"></order-paper-section-details>
                            </div>
                        </div>
                    </div>
                    <a [style.visibility]="hoverVisible ? 'visible' : 'hidden'" (click)="deleteSection()">
                        <img style="padding: 15px;" src="{{imagesPath + 'delete.png'}}">
                    </a>
                </div>
                `,
    styles: [`
               a{
                    cursor: pointer;
                }
                .collapsable {
                    display: inline-block;
                    overflow: hidden;
                    height: 0;
                    transition: height 1s ease;
                    -webkit-transition: height 1s;        
                    -moz-transition: height 1s;        
                    -o-transition: height 1s;         
                }
            `],
    animations: [
        trigger('openClose', [
            state('false', style({ height: '0px' })),
            state('true', style({ height: AUTO_STYLE })),
            transition('false <=> true', [ animate(100000) ])
        ])
    ],
})
export class OrderPaperSectionComponent implements OnInit, AfterViewInit {
    @Input()
    section: Section;
    hoverVisible: boolean;
    @Input()
    isSelected: boolean;
    @Input()
    index: number;
    @Output()
    onSelectSection: EventEmitter<Section> = new EventEmitter<Section>();
    @Output()
    onDeleteSection: EventEmitter<number> = new EventEmitter<number>();
    imagesPath: string = AppSettings.IMAGE_PATH;

    constructor() {
    }
    ngOnInit() {

    }

    ngAfterViewInit() {
        //$('[data-toggle="tooltip"]').tooltip();
    }

    selectSection = () => {
        this.onSelectSection.next(this.section);
    }

    deleteSection = () => {
        this.onDeleteSection.next(this.index);
    }

    toggle(element: any, eleId: string, isCallbackRequired: boolean) {
        //element.preventDefault();
        this.isSelected = !this.isSelected;
        if(isCallbackRequired)
            this.selectSection();
        var eleId = "#" + eleId;
        $(eleId).slideToggle();
    }
}