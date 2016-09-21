import { Component, OnInit, NgZone }    from '@angular/core';
import { BaseComponent }                from './base.component';

@Component({
    selector: 'home',
    template: `<h1>Order Paper</h1>`,
    styles: [],
    providers: []
})
export class HomeComponent extends BaseComponent implements OnInit {
    
    constructor() {
        super();
    }
    ngOnInit() {
        
    }

    updateSequence(oldIndex: number, newIndex: number) { }
}