"use strict";
var BaseComponent = (function () {
    function BaseComponent() {
        this.spinner = new Spinner({ radius: 10 });
        this.IsNumberedList = true;
    }
    BaseComponent.prototype.SortableConfig = function () {
        var _this = this;
        var eleId = '#' + this.SortableListId;
        (function ($) {
            var panelList = $(eleId);
            panelList.sortable({
                // Only make the .panel-heading child elements support dragging.
                // Omit this to make then entire <li>...</li> draggable.
                placeholder: "sortable-hightlight",
                handle: '.panel-heading',
                start: function (e, ui) {
                    //Before all other events
                    //Only occurs once each time sorting begins
                    _this.zone.runOutsideAngular(function () {
                        _this.zone.run(function () {
                            ui.placeholder.height(ui.item.height());
                            $(_this).attr('data-previndex', ui.item.index());
                        });
                    });
                },
                activate: function (e, ui) {
                    //After the start event and before all other events
                    //Occurs once for each connected list each time sorting begins
                },
                change: function (e, ui) {
                    //After start/active but before over/sort/out events
                    //Occurs every time the item position changes
                    //Does not occur when item is outside of a connected list
                },
                over: function (e, ui) {
                    //After change but before sort/out events
                    //Occurs while the item is hovering over a connected list
                },
                sort: function (e, ui) {
                    //After over but before out event
                    //Occurs during sorting
                    //Does not matter if the item is outside of a connected list or not
                },
                out: function (e, ui) {
                    //This one is unique
                    //After sort event before all drop/ending events unless **see NOTE
                    //Occurs, only once, the moment an item leaves a connected list
                    //NOTE: Occurs again when the item is dropped/sorting stops 
                    //--> EVEN IF the item never left the list
                    //--> Called just before the stop event but after all other ending events
                },
                beforeStop: function (e, ui) {
                    //Before all other ending events: update,remove,receive,deactivate,stop
                    //Occurs only once at the last possible moment before sorting stops
                },
                remove: function (e, ui) {
                    //After beforeStop and before all other ending events
                    //Occurs only once when an item is removed from a list
                },
                receive: function (e, ui) {
                    //After remove and before all other ending events
                    //Occurs only once when an item is added to a list
                },
                update: function (e, ui) {
                    //After receive and before all other ending events
                    //Occurs when the DOM changes for each connected list
                    //This can fire twice because two lists can change (remove from one
                    //list but add to another)
                    _this.zone.runOutsideAngular(function () {
                        _this.zone.run(function () {
                            var updatedIndex = ui.item.index();
                            var oldIndex = $(_this).attr('data-previndex');
                            _this.updateSequence(oldIndex, updatedIndex);
                            $(_this).removeAttr('data-previndex');
                            $('.panel', panelList).each(function (index, elem) {
                                var $listItem = $(elem), newIndex = $listItem.index();
                                var motionElem = elem.children[1].childNodes[1].childNodes[0];
                                // Persist the new indices.
                            });
                        });
                    });
                },
                deactivate: function (e, ui) {
                    //After all other events but before out (kinda) and stop
                    //Occurs once for each connected list each time sorting ends
                },
                stop: function (e, ui) {
                    //After all other events
                    //Occurs only once when sorting ends
                }
            });
        })(jQuery);
    };
    BaseComponent.prototype.ngAfterViewInit = function () {
        this.SortableConfig();
    };
    BaseComponent.prototype.toggle = function (element, eleId) {
        element.preventDefault();
        this.isExpand = !this.isExpand;
        var eleId = "#" + eleId;
        $(eleId).slideToggle();
    };
    BaseComponent.prototype.toggleItemOfBusiness = function (e, id) {
        e.preventDefault();
        this.isExpand = !this.isExpand;
        var eleId = "#" + this.SortableListId;
        $(eleId).toggle("fade", {
            direction: 'up'
        }, 500);
    };
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
//# sourceMappingURL=base.component.js.map