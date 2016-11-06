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
                    <div class="col-md-11 panel panel-default margin-left-15" style="margin-bottom: 5px;" [class.highlight-section]="isSelected">
                        <div class="panel-body no-padding-left">
                            <div class="drag-handle">
                                <a *ngIf="isSelected == false" (click)="toggle($event, index + '-section', true)">{{section.Name}}</a>
                                <select2 *ngIf="isSelected" [id]="index + '-section-list'" [enableSearch]="false" [multiple]="false" [initialValue]="section.Id" [data]="availableSections" (selected)="sectionChange($event)">
                                </select2>
                                <div class="pull-right">
                                    <a *ngIf="isSelected" (click)="toggle($event, index + '-section', true)">
                                        <img title="collapse" src="{{imagesPath + 'chevron collapsing.png'}}">
                                    </a>
                                    <span title="Include in order paper" style="cursor: pointer; cursor: hand;">
                                        <img (click)="section.IsIncluded = !section.IsIncluded" style="height: 20px; margin-right: 10px;" src="{{section.IsIncluded ? imagesPath + 'included.png' : imagesPath + 'excluded.png'}}">
                                    </span>
                                    <img style="cursor: move;" src="{{imagesPath + 'dragndrop.png'}}" height="23" [style.visibility]="hoverVisible ? 'visible' : 'hidden'">
                                    <a title="Show on front page">
                                        <img (click)="section.IsFrontPage = !section.IsFrontPage" style="height: 20px; margin-left: 10px;" src="{{section.IsFrontPage ? imagesPath + 'on front cover.png' : imagesPath + 'Not on front cover.png'}}">
                                    </a>
                                </div>
                            </div>
                            <div id="{{index + '-section'}}" class="initially-hidden" style="width: 100%; margin-top: 15px;">
                                <order-paper-section-details [index]="index" [section]="section"></order-paper-section-details>
                            </div>
                        </div>
                    </div>
                    <a [style.visibility]="hoverVisible ? 'visible' : 'hidden'" (click)="deleteSection()">
                        <img style="padding: 15px;" title="Delete section" src="{{imagesPath + 'delete.png'}}">
                    </a>
                </div>
                `,
    styles: [`
               a{
                    cursor: pointer;
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
    @Input()
    sectionOptions: any;
    @Output()
    onSelectSection: EventEmitter<Section> = new EventEmitter<Section>();
    @Output()
    onDeleteSection: EventEmitter<number> = new EventEmitter<number>();
    imagesPath: string = AppSettings.IMAGE_PATH;
    updatedSectionSelect: string;
    availableSections: any;
    spinElm: HTMLElement;
    spinner: Spinner = new Spinner({ radius: 10, color: '#2ebcc5' });
    error: any;

    constructor() {
    }
    ngOnInit() {
        if (this.section != null && this.sectionOptions != null) {
            this.availableSections = [];
            this.sectionOptions.forEach(option => {
                this.availableSections.push({ id: option.id, text: option.text });
            });
            if (this.isFreeTextSection())
                this.availableSections.push({ id: this.section.Name, text: this.section.Name });
        }
    }
    sectionChange = (e: string) => {
        if (e != null) {
            this.updatedSectionSelect = e;
            this.section.Id = e;
            this.availableSections.forEach(option => {
                if (option.id == e)
                    this.section.Name = option.text;
            });
        }
    }

    private isFreeTextSection = (): boolean => {
        var isFreeText = true;
        this.sectionOptions.forEach(item => {
            if (item.id == this.section.Id)
                isFreeText = false;
        });
        return isFreeText;
    }

    ngAfterViewInit() {
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