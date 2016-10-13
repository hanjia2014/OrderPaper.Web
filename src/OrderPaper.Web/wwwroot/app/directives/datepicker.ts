import { Component, Input, Output, EventEmitter, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Component({
    selector: 'date-picker',
    template: `<div class="input-group date" style="max-width: 250px" id="{{id}}">
                    <input type="text" [(ngModel)]="selectedDate" class="form-control" id="{{id}}-dateValue" >

                    <span class="input-group-addon" style="background-color: white"><img src="/content/images/icons/calendar.png" width="15"></span>
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

    selectedDate: string;

    ngAfterViewInit() {
        if (this.initialValue) {
            var date = new Date(this.initialValue.toString());
            var dateStr = this.IncludeTime ? date.toLocaleString() : date.toLocaleDateString();
            this.selectedDate = this.getFormattedDate(dateStr);
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

    private getFormattedDate = (input: string) : string => {
        var pattern = /(.*?)\/(.*?)\/(.*?)$/;
        var result = ""
        var result = input.replace(pattern, (match, p1, p2, p3) => {
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            result = p3 + "-" + months[(p1 - 1)] + "-" + (p2 < 10 ? "0" + p2 : p2);
            return result;
        });

        return result;
    }
}