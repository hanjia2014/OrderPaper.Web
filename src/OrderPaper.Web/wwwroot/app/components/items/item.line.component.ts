import { Component, Input, Output, EventEmitter }   from '@angular/core';
import { LineItem }                                 from '../../models/items';

@Component({
    selector: 'item-line',
    template: ` <div class="red-line">
                    <!--<span class="pull-right" (click)="delete()">Delete</span>-->
                    <div class="row">
                        <hr/>
                    </div>
                </div>
                `,
    styles: [`.red-line hr{
                color: #f00; 
                background-color: #f00; 
                height: 10px;
                margin-top: 0px;
            }`],
    providers: []
})
export class ItemLineComponent {
    @Input()
    line: LineItem;
    @Output()
    onDeleteLine = new EventEmitter<LineItem>();

    constructor() {
    }
    delete = () => {
        this.onDeleteLine.next(this.line);
    }
}