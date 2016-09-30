import { Component, OnInit, Input, Output, EventEmitter }   from '@angular/core';
import { BaseComponent }                                    from './base.component';
import { OrderPaper }                                       from '../models/orderpaper';
import { Section }                                          from '../models/section';
import { DND_PROVIDERS, DND_DIRECTIVES }                    from '../directives/dnd/ng2-dnd';

@Component({
    selector: 'order-paper-section-overview',
    template: `
                <div class="input-group" (mouseover)="hoverVisible = true" (mouseleave)="hoverVisible = false">
                    <div class="form-control">
                        <a [class.bold]="isSelected" (click)="selectSection(section)">{{index + 1 + '. ' + section.Name}}</a>
                        <div class="pull-right">
                            <img [style.visibility]="hoverVisible ? 'visible' : 'hidden'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAATCAIAAAAvYqvDAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAxSURBVDhPY/gPBsHBwcbGxkASDxuqFMiHADxs0k0lBpCuFJelyOxRb416i2i3/v8PAJM4KtHpFC3YAAAAAElFTkSuQmCC">
                        </div>
                    </div>
                    <span class="input-group-addon" style="cursor: pointer;" [style.visibility]="hoverVisible ? 'visible' : 'hidden'" (click)="deleteSection()">Remove</span>
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
export class OrderPaperSectionOverviewComponent implements OnInit {
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

    selectSection = () => {
        this.onSelectSection.next(this.section);
    }

    deleteSection = () => {
        this.onDeleteSection.next(this.index);
    }
}