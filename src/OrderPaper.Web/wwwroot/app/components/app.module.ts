import { NgModule }                                 from '@angular/core';
import { BrowserModule }                            from '@angular/platform-browser';
import { FormsModule }                              from '@angular/forms';
import { HttpModule, Response }                     from '@angular/http';
import { LocationStrategy, HashLocationStrategy }   from '@angular/common';
import { Select2Component }                         from '../directives/select2';
import { DatePickerComponent }                      from '../directives/datepicker';
import { MODAL_DIRECTIVES, ModalComponent }         from '../directives/modal/modal';
import { Tabs }                                     from '../directives/tabs/tabs';
import { Tab }                                      from '../directives/tabs/tab';
import { Dragula }                                  from '../directives/dragula/dragula.directive';
import { VerticalMenuComponent }                    from '../directives/vertical-menu/vertical-menu';
import { DND_DIRECTIVES }                           from '../directives/dnd/ng2-dnd';
import { routing }                                  from './app.routes';
import { MasterComponent }                          from './master.component';
import { HomeComponent }                            from './home.component';

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule, routing],
    declarations: [DND_DIRECTIVES, Select2Component, DatePickerComponent, MODAL_DIRECTIVES, Tabs, Tab, Dragula, VerticalMenuComponent, MasterComponent, HomeComponent],
    bootstrap: [MasterComponent],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppModule { }