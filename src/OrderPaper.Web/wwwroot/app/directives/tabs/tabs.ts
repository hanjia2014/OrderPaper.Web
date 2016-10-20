﻿import {
    Component,
    ContentChildren,
    QueryList,
    AfterContentInit,
    Output,
    EventEmitter
}                       from '@angular/core';
import { Tab }          from './tab';
import { AppSettings }  from '../../settings/app.settings';

@Component({
    selector: 'tabs',
    template: `
        <nav class="nav-black">
            <ul class="nav nav-tabs container" style="padding-left: 10%">
                <li>
                    <img src="{{imagePath + 'OP logo.png'}}" width="70" style="margin-left: -110px; margin-right: 20px;">
                </li>
                <li *ngFor="let tab of tabs" (click)="selectTab(tab)">
                    <a class="list-unstyled content-tab" style="color:white">{{tab.title}}
                    </a>
                    <span [style.background-color]="tab.active ? '#263a55' : '#142840'" [class.active-span]="tab.active" [class.non-active-span]="!tab.active" class="mega-close" style="display: block; cursor: pointer;">&nbsp;</span>
                </li>
                <li id="test" class="pull-right" style="padding-right: 30%">
                    <a class="btn btn-parliament new-order-paper" (click)="createNewOrderPaper()">New Order Paper</a>
                </li>
            </ul>
        </nav>
        <ng-content></ng-content>
    `,
    styles: [`a {cursor: pointer; cursor: hand;}
            .active-span { 
                background: url('../../../content/images/icons/white up arrow.png') no-repeat scroll center center;
            }
            .non-active-span:hover {
                background: url('../../../content/images/icons/white down arrow.png') no-repeat scroll center center;
            }
            .nav-black{
                background-color: #142840;
            }
            .nav-tabs {
                border-bottom: none;
            }
            .nav-tabs > li > a:hover{
                border-color: none;
            }
            
            .nav > li > a:focus, .nav > li > a:hover {
                text-decoration: none;
                background-color: #142840;
            }

            .nav-tabs > li > a{
                border: 1px solid #142840;
            }
            .nav > li > a {
                padding-bottom: 6px;
            }
            .new-order-paper {
                margin-top:10px; 
                border-radius: 4px;
                border-color: #abded2 !important;
            }
            a.btn.btn-parliament.new-order-paper:hover {
                border-color: #abded2 !important;
                color: #333 !important;
                background-color: #abded2 !important;
            }
            `]
})
export class Tabs implements AfterContentInit {
    imagePath: string = AppSettings.IMAGE_PATH;
    @Output()
    onCreateNewOrderPaper = new EventEmitter();
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

    createNewOrderPaper = () => {
        this.tabs.forEach(tab => tab.active = tab.title == 'History');
        this.onCreateNewOrderPaper.emit();
    }
}