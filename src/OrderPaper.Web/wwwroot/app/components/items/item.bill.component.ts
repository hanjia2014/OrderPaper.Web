import {
    Component,
    OnInit,
    ViewChild,
    Input,
    AfterViewInit,
    Output,
    EventEmitter
}                               from '@angular/core';
import { BillItem }             from '../../models/items';
import { CpdBillItem }          from '../../models/items';
import { ItemComponent }        from './item.component';
import { OrderPaperService }    from '../../services/app.services';
import { AppConstants }         from '../../settings/app.constants';

@Component({
    selector: 'item-bill',
    template: `
            <div class="bill">
                <div class="row">
                    <div class="col-md-9">
                        <a href="#" (click)="toggle($event, toggleId)">{{item.Title}}</a>
                    </div>
                    <div class="col-md-3">
                        <div class="pull-right">
                            <span *ngIf="isExpand" class="pointer" (click)="toggle($event, toggleId)">
                                <img title="collapse" src="{{imagesPath + 'chevron collapsing.png'}}">
                            </span>
                            <span>{{item.Type}}</span>
                            <img *ngIf="isGroupChild == false" src="{{imagesPath + 'dragndrop.png'}}" height="23" [style.visibility]="item.hoverVisible ? 'visible' : 'hidden'">
                        </div>
                    </div>
                </div>
                <div id="{{toggleId}}" class="initially-hidden">
                    <div class="spacer"></div>
                    <div class="row nopadding">
                        <div class="form-group col-md-5 nopadding" style="width: 45%">
                            <span>Title</span>
                            <input type="text" class="form-control undraggable" [(ngModel)]="item.Title" />
                        </div>
                        <div class="form-group col-md-1">
                            <label>&nbsp;</label>
                            <img class="undraggable nopadding noborder" height="10" src="{{imagesPath + 'CPD arrow.png'}}" />
                        </div>
                        <div class="form-group col-md-5 nopadding" style="width: 45%">
                            <span>CPD</span>
                            <!--<input type="text" class="form-control undraggable" [(ngModel)]="item.CpdTitle" />-->
                            <select2 [id]="sectionIndex + '-' + groupIndex + '-' + index + '-bill-title-cpd'" [initialValue]="item.CpdTitle" [cssClass]="'form-control undraggable'" [enableSearch]="true" [data]="billOptions" (selected)="titleSelect($event)"></select2>
                        </div>
                    </div>
                    <div class="spacer"></div>
                    <div class="row nopadding">
                        <div class="form-group col-md-5 nopadding" style="width: 45%">
                            <span>Number</span>
                            <input type="text" class="form-control undraggable" [(ngModel)]="item.Number" />
                        </div>
                        <div class="form-group col-md-1">
                            <label>&nbsp;</label>
                            <img class="undraggable nopadding noborder" height="10" src="{{imagesPath + 'CPD arrow.png'}}" />
                        </div>
                        <div class="form-group col-md-5 nopadding" style="width: 45%">
                            <span>CPD</span>
                            <input type="text" readonly class="form-control undraggable" [(ngModel)]="item.CpdNumber" />
                        </div>
                    </div>
                    <div class="spacer"></div>
                    <div class="row nopadding">
                        <div class="form-group col-md-5 nopadding" style="width: 45%">
                            <span>Member</span>
                            <input type="text" class="form-control undraggable" [(ngModel)]="item.Member" />
                        </div>
                        <div class="form-group col-md-1">
                            <label>&nbsp;</label>
                            <img class="undraggable nopadding noborder" height="10" src="{{imagesPath + 'CPD arrow.png'}}" />
                        </div>
                        <div class="form-group col-md-5 nopadding" style="width: 45%">
                            <span>CPD</span>
                            <input type="text" readonly class="form-control undraggable" [(ngModel)]="item.CpdNumber" />
                        </div>
                    </div>
                    <div class="spacer"></div>
                    <div class="row nopadding">
                        <div class="form-group col-md-5 nopadding" style="width: 45%">
                            <span>Stage</span>
                            <textarea class="form-control undraggable" [(ngModel)]="item.Stage" cols="30" rows="5"></textarea>
                        </div>
                        <div class="form-group col-md-1">
                        </div>
                        <div class="form-group col-md-5 nopadding" style="width: 45%">
                            <span>Details</span>
                            <textarea class="form-control undraggable" [(ngModel)]="item.Details" cols="30" rows="5"></textarea>
                        </div>
                    </div>
                    <div class="spacer"></div>
                    <div class="row nopadding">
                        <div class="form-group col-md-12 nopadding">
                            <div class="row nopadding">
                                <input type="checkbox" class="pointer" [(ngModel)]="item.IsCurrentSittingWeek" id="{{index + '-option1'}}" value="Committee stage indicated for current sitting week" />
                                <span>Committee stage indicated for current sitting week</span>
                            </div>
                            <div class="row nopadding">
                                <input type="checkbox" class="pointer" [(ngModel)]="item.IsFollowingSittingWeek" id="{{index + '-option2'}}" name="Committee stage indicated for following sitting week" value="Committee stage indicated for following sitting week" />
                                <span>Committee stage indicated for following sitting week</span>
                            </div>
                            <div class="row nopadding">
                                <input type="checkbox" class="pointer" [(ngModel)]="item.IsMajorityAmendments" id="{{index + '-option3'}}" name="Bill contains majority amendments" value="Bill contains majority amendments" />
                                <span>Bill contains majority amendments</span>
                            </div>
                            <div class="row nopadding">
                                <input type="checkbox" class="pointer" [(ngModel)]="item.IsConsiderationItem" id="{{index + '-option4'}}" name="Available for consideration during extended" value="Available for consideration during extended" />
                                <span>Available for consideration during extended sitting hours</span>
                            </div>
                        </div>
                    </div>
                    <div class="spacer"></div>
                    <div class="row nopadding">
                        <div class="form-group col-md-5 nopadding" style="width: 45%">
                            <span>Speeches</span>
                            <textarea class="form-control undraggable" [(ngModel)]="item.Speeches" cols="30" rows="5"></textarea>
                        </div>
                        <div class="form-group col-md-1">
                            
                        </div>
                        <div class="form-group col-md-5 nopadding" style="width: 45%">
                            <span>Latest event</span>
                            <textarea class="form-control undraggable" [(ngModel)]="item.LatestEvent" cols="30" rows="5"></textarea>
                        </div>
                    </div>
                </div>
            </div>`,
    styles: [],
    providers: [OrderPaperService]
})
export class ItemBillComponent extends ItemComponent implements OnInit, AfterViewInit{
    @Input()
    item: BillItem;
    @Input()
    index: number;
    isExpand: boolean;
    @Output()
    onAddGroup = new EventEmitter<BillItem>();
    billTitleOptions: any;
    @Input()
    isGroupChild: boolean = false;
    @Input()
    groupIndex: number;
    @Input()
    sectionIndex: number;
    billOptions = [];

    error: any;

    constructor(private orderPaperService: OrderPaperService) {
        super();
    }
    ngOnInit() {
        if (this.isGroupChild) {
            this.toggleId = this.sectionIndex + '-' + this.index + '-' + this.groupIndex + '-bill';
        }
        else {
            this.toggleId = this.sectionIndex + '-' + this.index + '-bill';
        }

        //disable the cpd data fetching for now
        //this.getBillOptions();
    }

    private getBillOptions = () => {
        this.orderPaperService.getBills(AppConstants.CPD_DATA_URL).subscribe(
            (data: any) => {
                if (data != null) {
                    data.value.forEach(bill => {
                        this.billOptions.push({ id: bill.business_item_id.toString(), text: bill.short_title });
                    });
                }
            },
            (err: any) => this.error = err);
    }

    addGroup() {
        this.onAddGroup.next(this.item);
    }

    ngAfterViewInit() {
        $('.undraggable')
            .on('focus', function (e) {
                $('.item-li').attr("draggable", "false");
            })
            .on('blur', function (e) {
                $('.item-li').attr("draggable", "true");
            });
    }

    toggle(element: any, eleId: string) {
        element.preventDefault();

        this.isExpand = !this.isExpand;
        var eleId = "#" + eleId;
        $(eleId).slideToggle();
    }

    titleSelect = (e: string) => {
        if (e != null) {
            this.item.CpdTitle = e;
            var text = this.findOption(this.billOptions, e);
            this.item.Title = text;
            if (e != '') {
                this.orderPaperService.getBill(AppConstants.CPD_DATA_URL, e).subscribe(
                    (data: any) => {

                        this.item.CpdMember = data.member_original_name;
                        this.item.CpdNumber = data.bill_number;
                    },
                    (err: any) => this.error = err);
            }
        }
    }
}