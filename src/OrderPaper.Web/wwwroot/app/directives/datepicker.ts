import { Component, Input, Output, EventEmitter, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Component({
    selector: 'date-picker',
    template: `<div class="input-group date" style="max-width: 250px" id="{{id}}">
                    <input type="text" [(ngModel)]="selectedDate" class="form-control" id="{{id}}-dateValue" >
                    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
                </div>`,
    styles: [],
    providers: []
})
export class DatePickerComponent implements AfterViewInit {
    @Input()
    id: string;
    @Input()
    IncludeTime: boolean;
    @Output()
    onValueChange = new EventEmitter<Date>();

    selectedDate: string;

    ngAfterViewInit() {
        var options = {
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
}