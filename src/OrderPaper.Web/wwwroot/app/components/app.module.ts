import { NgModule }                                     from '@angular/core';
import { BrowserModule }                                from '@angular/platform-browser';
import { FormsModule }                                  from '@angular/forms';
import { HttpModule, Response }                         from '@angular/http';
import { LocationStrategy, HashLocationStrategy }       from '@angular/common';
import { Select2Component }                             from '../directives/select2';
import { DatePickerComponent }                          from '../directives/datepicker';
import { MODAL_DIRECTIVES, ModalComponent }             from '../directives/modal/modal';
import { Tabs }                                         from '../directives/tabs/tabs';
import { Tab }                                          from '../directives/tabs/tab';
import { Dragula }                                      from '../directives/dragula/dragula.directive';
import { VerticalMenuComponent }                        from '../directives/vertical-menu/vertical-menu';
import { DND_DIRECTIVES }                               from '../directives/dnd/ng2-dnd';
import { FroalaEditorDirective, FroalaViewDirective }   from '../directives/froala-editor/froala.directives';
import { routing }                                      from './app.routes';
import { MasterComponent }                              from './master.component';
import { HomeComponent }                                from './home.component';
import { OrderPaperDetailsComponent }                   from './orderpaper.details.component';
import { OrderPaperSectionDetailsComponent }            from './orderpaper.section.details.component';
import { OrderPaperSectionOverviewComponent }           from './orderpaper.section.overview.component';
import { ItemBillComponent }                            from './items/item.bill.component';
import { ItemLineComponent }                            from './items/item.line.component';
import { ItemReportComponent }                          from './items/item.report.component';
import { ItemMotionComponent }                          from './items/item.motion.component';

@NgModule({
    imports:
    [
        BrowserModule,
        HttpModule,
        FormsModule,
        routing
    ],
    declarations:
    [
        DND_DIRECTIVES,
        Select2Component,
        DatePickerComponent,
        OrderPaperSectionOverviewComponent,
        MODAL_DIRECTIVES,
        ModalComponent,
        Tabs,
        Tab,
        Dragula,
        FroalaEditorDirective,
        VerticalMenuComponent,
        MasterComponent,
        HomeComponent,
        OrderPaperDetailsComponent,
        OrderPaperSectionDetailsComponent,
        OrderPaperSectionOverviewComponent,
        ItemBillComponent,
        ItemLineComponent,
        ItemReportComponent,
        ItemMotionComponent
    ],
    bootstrap:
    [
        MasterComponent
    ],
    providers:
    [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ]
})
export class AppModule { }