import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    AfterViewInit
}                                           from '@angular/core';
import { BaseComponent }                    from './base.component';
import { OrderPaper }                       from '../models/orderpaper';
import { Section }                          from '../models/section';
import { Item,
    LineItem,
    MotionItem,
    GroupItem,
    ReportItem,
    BillItem
}                                           from '../models/items';

@Component({
    selector: 'order-paper-section',
    template: `
                <div class="row" (mouseover)="hoverVisible = true" (mouseleave)="hoverVisible = false">
                    <div class="col-md-9 panel panel-default">
                        <div class="panel-body">
                            <div class="section-handle">
                                <a [class.bold]="isSelected" (click)="toggle($event, index + '-section')">{{index + 1 + '. ' + section.Name}}</a>
                                <div class="pull-right">
                                    <img src="/content/images/icons/dragndrop.png" height="23" [style.visibility]="hoverVisible ? 'visible' : 'hidden'">
                                    <a data-placement="left" data-toggle="tooltip" data-original-title="Tooltip on top">
                                        <img (click)="section.IsFrontPage = !section.IsFrontPage" style="height: 20px; margin-left: 10px;" src="{{section.IsFrontPage ? '/content/images/icons/flag - section on front cover.png' : '/content/images/icons/flag - section not on front cover.png'}}">
                                    </a>
                                </div>
                            </div>
                            <div id="{{index + '-section'}}" [class.collapsable]="isSelected == false">
                                <order-paper-section-details [section]="section"></order-paper-section-details>
                            </div>
                        </div>
                    </div>
                    <a [style.visibility]="hoverVisible ? 'visible' : 'hidden'" (click)="deleteSection()">
                        <img style="padding: 15px;" src="/content/images/icons/delete.png">
                    </a>
                </div>
                `,
    styles: [`
               a{
                    cursor: pointer;
                }
                .bold{
                    font-weight: bold;
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
            `]
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

    constructor() {

    }
    ngOnInit() {

    }

    ngAfterViewInit() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    selectSection = () => {
        this.isSelected = !this.isSelected;
        this.onSelectSection.next(this.section);
    }

    deleteSection = () => {
        this.onDeleteSection.next(this.index);
    }

    toggle(element: any, eleId: string) {
        element.preventDefault();
        this.selectSection();
        //var eleId = "#" + eleId;
        //$(eleId).slideToggle();
    }
}