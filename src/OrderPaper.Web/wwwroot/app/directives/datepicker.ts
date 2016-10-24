/// <reference path="../../typings/bootstrap.v3.datetimepicker.d.ts" />
import { Component, Input, Output, EventEmitter, ElementRef, OnInit, AfterViewInit, SimpleChanges } from '@angular/core';
import { AppSettings }                                                                              from '../settings/app.settings';

@Component({
    selector: 'date-picker',
    template: `<div class="input-group date" style="max-width: 250px" id="{{id}}">
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
    initialValue: Date;
    @Output()
    onValueChange = new EventEmitter<Date>();
    imagePath: string = AppSettings.IMAGE_PATH;
    selectedDate: string;

    ngAfterViewInit() {
        if (this.initialValue) {
            this.setDateValue();
        }

        var options = {
            format: this.IncludeTime ? 'YYYY-MMM-DD HH:mm:ss' : 'YYYY-MMM-DD',
            pick12HourFormat: true,
            pickTime: this.IncludeTime,
        };

        var elem = $("#" + this.id);
        elem.datetimepicker(options).on("change", (e: any) => {
            var date = e.delegateTarget.children[0].value;


            this.onValueChange.next(new Date(date));
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

    private setDateValue() {
        var date = new Date(this.initialValue.toString());
        var dateStr = this.IncludeTime ? date.toLocaleString() : date.toLocaleDateString();
        this.selectedDate = this.getFormattedDate(date);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['initialValue'].currentValue == undefined)
            this.selectedDate = null;
        else {
            this.setDateValue();
        }
    }
}