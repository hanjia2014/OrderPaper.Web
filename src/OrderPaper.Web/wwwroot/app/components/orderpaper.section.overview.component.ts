import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit }    from '@angular/core';
import { BaseComponent }                                                    from './base.component';
import { OrderPaper }                                                       from '../models/orderpaper';
import { Section }                                                          from '../models/section';
import { DND_PROVIDERS, DND_DIRECTIVES }                                    from '../directives/dnd/ng2-dnd';

@Component({
    selector: 'order-paper-section-overview',
    template: `
                <div class="row" (mouseover)="hoverVisible = true" (mouseleave)="hoverVisible = false">
                    <div class="col-md-9">
                        <div class="form-control">
                            <a [class.bold]="isSelected" (click)="selectSection(section)">{{index + 1 + '. ' + section.Name}}</a>
                            <div class="pull-right">
                                <img src="../../content/images/icons/dragndrop.png" height="23" [style.visibility]="hoverVisible ? 'visible' : 'hidden'">
                                <a data-placement="left" data-toggle="tooltip" data-original-title="Tooltip on top">
                                    <img (click)="section.IsFrontPage = !section.IsFrontPage" style="height: 20px; margin-left: 10px;" src="{{section.IsFrontPage ? '/content/images/icons/flag - section on front cover.png' : '/content/images/icons/flag - section not on front cover.png'}}">
                                </a>
                            </div>
                        </div>
                    </div>
                    <a [style.visibility]="hoverVisible ? 'visible' : 'hidden'" (click)="deleteSection()">
                        <img style="padding: 6px 0px;" src="/content/images/icons/delete.png">
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
            `],
    providers: [DND_PROVIDERS]
})
export class OrderPaperSectionOverviewComponent implements OnInit, AfterViewInit {
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
        (<any>$('[data-toggle="tooltip"]')).tooltip();
    }

    selectSection = () => {
        this.onSelectSection.next(this.section);
    }

    deleteSection = () => {
        this.onDeleteSection.next(this.index);
    }
}