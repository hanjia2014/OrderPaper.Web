﻿import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { Tab } from './tab';

@Component({
    selector: 'tabs',
    template: `
        <nav class="nav-black">
            <ul class="nav nav-tabs container">
                <li>
                    <img src="/content/images/icons/OP logo.png" width="70" style="margin-left: -110px; margin-right: 20px;">
                </li>
                <li *ngFor="let tab of tabs" (click)="selectTab(tab)">
                    <a class="list-unstyled" style="color:white">{{tab.title}}
                    </a>
                    <span [style.background-color]="tab.active ? '#ffffff' : '#3b3b3b'" [class.active-span]="tab.active" [class.non-active-span]="!tab.active" class="mega-close" style="display: block; cursor: pointer;">&nbsp;</span>
                </li>
            </ul>
        </nav>
        <ng-content></ng-content>
    `,
    styles: [`a {cursor: pointer; cursor: hand;}
            .active-span { 
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAALCAYAAACQy8Z9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAABZSURBVDhPrc9JCgAhDERR71T3P5uNYjVOMeXwVwGTB4YoBqBMfhJKUIVdtIcUeIlagAebqHe4ep+iyhdT1t6AqiCb7TfoLsj6ux89BVl9n9FbkNEJr0AGIH5ckGZedwonSQAAAABJRU5ErkJggg==) no-repeat scroll center center;
            }
            .non-active-span:hover {
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAALAQMAAACqBVQ+AAAABlBMVEX///8zMzM4VIyRAAAAAXRSTlMAQObYZgAAACpJREFUCB0FwTERACAIAMDHc2AkAlGMYCRGY/tvpKO0Vo40drAWsfFw0T5KfwL3FCp0KAAAAABJRU5ErkJggg==) no-repeat scroll center center;
            }
            .nav-black{
                background-color: #3b3b3b;
            }
            .nav-tabs {
                border-bottom: none;
            }
            .nav-tabs > li > a:hover{
                border-color: none;
            }
            .nav > li > a:focus, .nav > li > a:hover {
                text-decoration: none;
                background-color: #3b3b3b;
            }
            .nav-tabs > li > a{
                border: 1px solid #3b3b3b;
            }`]
})
export class Tabs implements AfterContentInit {
    @ContentChildren(Tab) tabs: QueryList<Tab>;
    // contentChildren are set
    ngAfterContentInit() {
        // get all active tabs
        let activeTabs = this.tabs.filter((tab) => tab.active);
        // if there is no active tab set, activate the first
        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    }

    selectTab(tab: Tab) {
        if (tab.active) {
            tab.active = false;
        }
        else {
            // deactivate all tabs
            this.tabs.forEach(tab => tab.active = false);
            // activate the tab the user has clicked on.
            tab.active = true;

            tab.onActiveChange.next(tab.title);
        }
    }
}