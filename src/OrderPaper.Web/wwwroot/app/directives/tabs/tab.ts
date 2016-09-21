import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'tab',
    styles: [`
    .pane{
      padding: 1em;
    }
  `],
    template: `
    <div [hidden]="!active" class="pane">
      <ng-content></ng-content>
    </div>
  `
})
export class Tab {
    @Input() title: string;
    active: boolean = false;
    @Output()
    onActiveChange = new EventEmitter<string>();
}