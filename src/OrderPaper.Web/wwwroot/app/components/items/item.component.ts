import {
    Component,
    OnInit,
    ViewChild,
    Input,
    AfterViewInit,
    Output,
    EventEmitter
}                               from '@angular/core';

export class ItemComponent implements OnInit, AfterViewInit {
    undraggableId: string;
    ngOnInit() {
    }
    ngAfterViewInit() {
        var myTextInput = document.getElementById('textInput'); //target any DOM element here

        myTextInput.addEventListener('ondragenter', this.preventDrag);
        myTextInput.addEventListener('ondragover', this.preventDrag);
        myTextInput.addEventListener('ondrop', this.preventDrag);
    }
    private preventDrag = (event: any) => {
        if (event.type == 'dragenter' || event.type == 'dragover' || //if drag over event -- allows for drop event to be captured, in case default for this is to not allow drag over target
            event.type == 'drop') //prevent text dragging -- IE and new Mozilla (like Firefox 3.5+)
        {
            if (event.stopPropagation) //(Mozilla)
            {
                event.preventDefault();
                event.stopPropagation(); //prevent drag operation from bubbling up and causing text to be modified on old Mozilla (before Firefox 3.5, which doesn't have drop event -- this avoids having to capture old dragdrop event)
            }
            return false; //(IE)
        }
    }
}