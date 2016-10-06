import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit }    from '@angular/core';
import { BaseComponent }                                                    from './base.component';
import { OrderPaper }                                                       from '../models/orderpaper';
import { Section }                                                          from '../models/section';
import { DND_PROVIDERS, DND_DIRECTIVES }                                    from '../directives/dnd/ng2-dnd';

@Component({
    selector: 'order-paper-section-overview',
    template: `
                <div class="row" (mouseover)="hoverVisible = true" (mouseleave)="hoverVisible = false">
                    <div class="col-md-11">
                        <div class="form-control">
                            <a [class.bold]="isSelected" (click)="selectSection(section)">{{index + 1 + '. ' + section.Name}}</a>
                            <div class="pull-right">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAATCAIAAAAvYqvDAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAxSURBVDhPY/gPBsHBwcbGxkASDxuqFMiHADxs0k0lBpCuFJelyOxRb416i2i3/v8PAJM4KtHpFC3YAAAAAElFTkSuQmCC">
                                <a data-placement="left" data-toggle="tooltip" data-original-title="Tooltip on top">
                                    <img (click)="section.IsFrontPage = !section.IsFrontPage" style="height: 20px; margin-left: 10px;" src="{{section.IsFrontPage ? '/content/images/icons/flag - section on front cover.png' : '/content/images/icons/flag - section not on front cover.png'}}">
                                </a>
                            </div>
                        </div>
                    </div>
                    <!--<span class="input-group-addon" style="cursor: pointer;" [style.visibility]="hoverVisible ? 'visible' : 'hidden'" (click)="deleteSection()">Remove</span>-->
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
        $('[data-toggle="tooltip"]').tooltip();
    }

    selectSection = () => {
        this.onSelectSection.next(this.section);
    }

    deleteSection = () => {
        this.onDeleteSection.next(this.index);
    }
}