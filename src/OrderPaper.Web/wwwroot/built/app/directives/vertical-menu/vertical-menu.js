"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var VerticalMenuComponent = (function () {
    function VerticalMenuComponent() {
        this.onValueChange = new core_1.EventEmitter();
    }
    VerticalMenuComponent.prototype.ngAfterViewInit = function () {
        $('#top-menu li.active').addClass('open').children('ul').show();
        $('#top-menu li.has-sub>a').on('click', function () {
            $(this).removeAttr('href');
            var element = $(this).parent('li');
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.find('li').removeClass('open');
                element.find('ul').slideUp();
            }
            else {
                element.addClass('open');
                element.children('ul').slideDown();
                element.siblings('li').children('ul').slideUp();
                element.siblings('li').removeClass('open');
                element.siblings('li').find('li').removeClass('open');
                element.siblings('li').find('ul').slideUp();
            }
        });
        $('#top-menu>ul>li.has-sub>a').append('<span class="holder"></span>');
        (function getColor() {
            var r, g, b;
            var textColor = $('#top-menu').css('color');
            textColor = textColor.slice(4);
            r = textColor.slice(0, textColor.indexOf(','));
            textColor = textColor.slice(textColor.indexOf(' ') + 1);
            g = textColor.slice(0, textColor.indexOf(','));
            textColor = textColor.slice(textColor.indexOf(' ') + 1);
            b = textColor.slice(0, textColor.indexOf(')'));
            var l = rgbToHsl(r, g, b);
            if (l > 0.7) {
                $('#top-menu>ul>li>a').css('text-shadow', '0 1px 1px rgba(0, 0, 0, .35)');
                $('#top-menu>ul>li>a>span').css('border-color', 'rgba(0, 0, 0, .35)');
            }
            else {
                $('#top-menu>ul>li>a').css('text-shadow', '0 1px 0 rgba(255, 255, 255, .35)');
                $('#top-menu>ul>li>a>span').css('border-color', 'rgba(255, 255, 255, .35)');
            }
        })();
        function rgbToHsl(r, g, b) {
            r /= 255, g /= 255, b /= 255;
            var max = Math.max(r, g, b), min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2;
            if (max == min) {
                h = s = 0;
            }
            else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }
            return l;
        }
    };
    VerticalMenuComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], VerticalMenuComponent.prototype, "id", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], VerticalMenuComponent.prototype, "onValueChange", void 0);
    VerticalMenuComponent = __decorate([
        core_1.Component({
            selector: 'vertical-menu',
            template: "\n                <!-- Icon Library -->\n                <!-- <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css\"> -->\n                <div id=\"top-menu\">\n                  <ul>\n                     <li class=\"active\"><a href=\"#\" target=\"_blank\" style=\"text-shadow: rgba(0, 0, 0, 0.34902) 0px 1px 1px;\"><span style=\"border-color: rgba(0, 0, 0, 0.34902);\"><i class=\"fa fa-fw fa-home\"></i> Home</span></a></li>\n                     <li class=\"has-sub\"><a style=\"text-shadow: rgba(0, 0, 0, 0.34902) 0px 1px 1px;\"><span style=\"border-color: rgba(0, 0, 0, 0.34902);\"><i class=\"fa fa-fw fa-bars\"></i> Menus</span><span class=\"holder\" style=\"border-color: rgba(0, 0, 0, 0.34902);\"></span></a>\n                        <ul style=\"display: none;\">\n                           <li class=\"has-sub\"><a><span>Menu 1</span></a>\n                              <ul style=\"display: none;\">\n                                 <li><a href=\"#\"><span>Menu 1.1</span></a></li>\n                                 <li><a href=\"#\"><span>Menu 1.2</span></a></li>\n                              </ul>\n                           </li>\n                           <li><a href=\"#\"><span>Menu 2</span></a></li>\n                        </ul>\n                     </li>\n                     <li><a href=\"#\" style=\"text-shadow: rgba(0, 0, 0, 0.34902) 0px 1px 1px;\"><span style=\"border-color: rgba(0, 0, 0, 0.34902);\"><i class=\"fa fa-fw fa-cog\"></i> Settings</span></a></li>\n                     <li><a href=\"#\" style=\"text-shadow: rgba(0, 0, 0, 0.34902) 0px 1px 1px;\"><span style=\"border-color: rgba(0, 0, 0, 0.34902);\"><i class=\"fa fa-fw fa-phone\"></i> Contact</span></a></li>\n                  </ul>\n                </div>",
            styles: ["\n            #top-menu, #top-menu ul, #top-menu ul li, #top-menu ul li a {\n                margin: 0;\n                padding: 0;\n                border: 0;\n                list-style: none;\n                line-height: 1;\n                display: block;\n                position: relative;\n                -webkit-box-sizing: border-box;\n                -moz-box-sizing: border-box;\n                box-sizing: border-box;\n            }\n            #top-menu > ul > li > a {\n                padding: 15px 20px;\n                border-left: 1px solid #1b390e;\n                border-right: 1px solid #1b390e;\n                border-top: 1px solid #1b390e;\n                cursor: pointer;\n                z-index: 2;\n                font-size: 14px;\n                font-weight: bold;\n                text-decoration: none;\n                color: #ffffff;\n                text-shadow: 0 1px 1px rgba(0, 0, 0, 0.35);\n                background: #38761d;\n                background: -webkit-linear-gradient(#38761d, #2e6218);\n                background: -moz-linear-gradient(#38761d, #2e6218);\n                background: -o-linear-gradient(#38761d, #2e6218);\n                background: -ms-linear-gradient(#38761d, #2e6218);\n                background: linear-gradient(#38761d, #2e6218);\n                box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);\n            }\n            #top-menu ul ul ul li:first-child > a {\n                box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);\n            }\n            #top-menu ul ul li:first-child > a {\n                box-shadow: none;\n            }\n            #top-menu ul ul ul li a {\n                padding-left: 30px;\n            }\n            #top-menu > ul > li.open > a {\n                box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.15);\n                border-bottom: 1px solid #1b390e;\n            }\n            #top-menu > ul > li > a:hover, #cssmenu > ul > li.active > a, #cssmenu > ul > li.open > a {\n                color: #eeeeee;\n                background: #2e6218;\n                background: -webkit-linear-gradient(#2e6218, #254d13);\n                background: -moz-linear-gradient(#2e6218, #254d13);\n                background: -o-linear-gradient(#2e6218, #254d13);\n                background: -ms-linear-gradient(#2e6218, #254d13);\n                background: linear-gradient(#2e6218, #254d13);\n            }\n            \n            #top-menu ul ul li a {\n                cursor: pointer;\n                border-bottom: 1px solid #4d4d4d;\n                border-left: 1px solid #4d4d4d;\n                border-right: 1px solid #4d4d4d;\n                padding: 10px 20px;\n                z-index: 1;\n                text-decoration: none;\n                font-size: 13px;\n                color: #eeeeee;\n                background: #666666;\n                box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);\n            }\n            #top-menu {\n                width: 200px;\n                font-family: Helvetica, Arial, sans-serif;\n                color: #ffffff;\n            }\n            .holder::after {\n                top: 17px;\n                border-top: 2px solid #ffffff;\n                border-left: 2px solid #ffffff;\n            }\n            .holder::before {\n                top: 18px;\n                border-top: 2px solid;\n                border-left: 2px solid;\n                border-top-color: inherit;\n                border-left-color: inherit;\n            }\n            .holder::after, .holder::before {\n                display: block;\n                position: absolute;\n                content: \"\";\n                width: 6px;\n                height: 6px;\n                right: 20px;\n                z-index: 10;\n                -webkit-transform: rotate(-135deg);\n                -moz-transform: rotate(-135deg);\n                -ms-transform: rotate(-135deg);\n                -o-transform: rotate(-135deg);\n                transform: rotate(-135deg);\n            }\n            #top-menu ul ul li.has-sub > a::after {\n                display: block;\n                position: absolute;\n                content: \"\";\n                width: 5px;\n                height: 5px;\n                right: 20px;\n                z-index: 10;\n                top: 11.5px;\n                border-top: 2px solid #eeeeee;\n                border-left: 2px solid #eeeeee;\n                -webkit-transform: rotate(-135deg);\n                -moz-transform: rotate(-135deg);\n                -ms-transform: rotate(-135deg);\n                -o-transform: rotate(-135deg);\n                transform: rotate(-135deg);\n            }\n            "],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], VerticalMenuComponent);
    return VerticalMenuComponent;
}());
exports.VerticalMenuComponent = VerticalMenuComponent;
//# sourceMappingURL=vertical-menu.js.map