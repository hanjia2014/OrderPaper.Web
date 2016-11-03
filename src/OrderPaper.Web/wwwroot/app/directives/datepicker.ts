/// <reference path="../../typings/bootstrap.v3.datetimepicker.d.ts" />
import { Component, Input, Output, EventEmitter, ElementRef, OnInit, AfterViewInit, SimpleChanges } from '@angular/core';
import { AppSettings }                                                                              from '../settings/app.settings';

@Component({
    selector: 'date-picker',
    template: `<div class="input-group date" [style.width]="width" style="max-width: 250px" id="{{id}}">
                    <input type="text" [(ngModel)]="selectedDate" class="form-control" id="{{id}}-dateValue" >
                    <span class="input-group-addon" style="background-color: white"><img src="{{imagePath + 'calendar.png'}}" width="15"></span>
                </div>`,
    styles: [],
    providers: []
})
export class DatePickerComponent implements AfterViewInit {
    @Input()
    id: string;
    @Input()
    IncludeTime: boolean;
    @Input()
    initialValue: string;
    @Input()
    width: string;
    @Output()
    onValueChange = new EventEmitter<string>();
    imagePath: string = AppSettings.IMAGE_PATH;
    selectedDate: string;

    ngAfterViewInit() {
        if (this.initialValue) {
            this.selectedDate = this.initialValue;
        }

        var options = {
            format: this.IncludeTime ? 'DD-MMM-YYYY HH:mm:ss' : 'DD-MMM-YYYY',
            pick12HourFormat: true,
            pickTime: this.IncludeTime,
        };

        var elem = $("#" + this.id);
        elem.datetimepicker(options).on("change", (e: any) => {
            var date = e.delegateTarget.children[0].value;
            this.onValueChange.next(date);
        });
    }
    constructor() {
        
    }

    private getFormattedDate = (input: Date) : string => {
        var year = input.getFullYear();
        var month = input.getMonth();
        var day = input.getDate();
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return year + '-' + months[month - 1] + '-' + day;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['initialValue'] != null) {
            if (changes['initialValue'].currentValue == undefined)
                this.selectedDate = null;
            else {
                this.selectedDate = this.initialValue;
            }
        }
    }
}