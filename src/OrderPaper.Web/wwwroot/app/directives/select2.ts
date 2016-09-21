import { Component, Input, Output, EventEmitter, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Component({
    selector: 'select2',
    template: `<input id="{{id}}"/>`,
    styles: [],
    providers: []
})
export class Select2Component implements AfterViewInit {
    @Input()
    multiple: boolean;
    @Input()
    data: any;
    @Input()
    id: string;
    @Input()
    enableSearch: boolean;
    @Input()
    placeholder: string;
    @Input()
    allowFreeText: boolean;
    @Input()
    disableMultipleSelection: boolean;

    @Output() selected = new EventEmitter();

    ngAfterViewInit() {
        var options = {
            placeholder: this.placeholder ? this.placeholder : "Please select",
            dropdownAutoWidth: true,
            allowClear: true,
            data: this.data,
            multiple: this.multiple,
            maximumInputLength: 30,
            width: 'resolve',
            //Allow manually entered text in drop down.
            createSearchChoice: (term, data) => {
                if (this.allowFreeText) {
                    if ($(data).filter(function () {
                        return this.text.localeCompare(term) === 0;
                    }).length === 0) {
                        return { id: term, text: term };
                    }
                }
            },
        };

        if (this.enableSearch == false) {
            options['minimumResultsForSearch'] = -1;
        }

        $("#" + this.id).select2(options).on("change", (e: any) => {
            this.selected.next(e.val);
        });

        if (this.disableMultipleSelection) {
            $("#" + this.id).select2(options).on("select2-opening", (e: any) => {
                if ($("#" + this.id).select2('val').length > 0) {
                    e.preventDefault();
                }
            });
        }
    }
    constructor() {
        
    }
}