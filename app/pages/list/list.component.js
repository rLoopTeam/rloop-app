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
var core_1 = require("@angular/core");
var router_deprecated_1 = require("@angular/router-deprecated");
var color_1 = require("color");
var dialogs_1 = require("ui/dialogs");
var page_1 = require("ui/page");
var config_1 = require("../../shared/config");
var grocery_list_component_1 = require("../list/grocery-list.component");
var grocery_list_service_1 = require("../../shared/grocery/grocery-list.service");
var dialog_util_1 = require("../../utils/dialog-util");
var hint_util_1 = require("../../utils/hint-util");
var socialShare = require("nativescript-social-share");
var ListPage = (function () {
    function ListPage(_router, store, page) {
        this._router = _router;
        this.store = store;
        this.page = page;
        this.grocery = "";
        this.isShowingRecent = false;
        this.isLoading = false;
    }
    ListPage.prototype.ngOnInit = function () {
        this.isAndroid = !!this.page.android;
        this.page.actionBarHidden = true;
        this.page.className = "list-page";
        config_1.Config.setupConnectionMonitoring();
    };
    ListPage.prototype.setTextFieldHintColor = function (textField) {
        // TODO: Why is it necessary to defer this code on iOS?
        // It should work without the setTimeout like it does on Android.
        setTimeout(function () {
            hint_util_1.setHintColor({
                view: textField,
                color: new color_1.Color("white")
            });
        });
    };
    // Prevent the first textfield from receiving focus on Android
    // See http://stackoverflow.com/questions/5056734/android-force-edittext-to-remove-focus
    ListPage.prototype.handleAndroidFocus = function (textField, container) {
        if (container.android) {
            container.android.setFocusableInTouchMode(true);
            container.android.setFocusable(true);
            textField.android.clearFocus();
        }
    };
    ListPage.prototype.showActivityIndicator = function () {
        this.isLoading = true;
    };
    ListPage.prototype.hideActivityIndicator = function () {
        this.isLoading = false;
    };
    ListPage.prototype.add = function (target) {
        var textField = this.groceryTextField.nativeElement;
        // If showing recent groceries the add button should do nothing.
        if (this.isShowingRecent) {
            return;
        }
        if (this.grocery.trim() === "") {
            // If the user clicked the add button, and the textfield is empty,
            // focus the text field and return.
            if (target === "button") {
                textField.focus();
            }
            else {
                // If the user clicked return with an empty text field show an error.
                dialog_util_1.alert("Enter a grocery item");
            }
            return;
        }
        // Dismiss the keyboard
        // TODO: Is it better UX to dismiss the keyboard, or leave it up so the
        // user can continue to add more groceries?
        textField.dismissSoftInput();
        this.store.add(this.grocery)
            .catch(function () {
            dialog_util_1.alert("An error occurred while adding an item to your list.");
        });
        this.grocery = "";
    };
    ListPage.prototype.toggleRecent = function () {
        if (!this.isShowingRecent) {
            this.isShowingRecent = true;
            return;
        }
        this.store.restore()
            .catch(function () {
            dialog_util_1.alert("An error occurred while adding groceries to your list.");
        });
        this.isShowingRecent = false;
    };
    ListPage.prototype.delete = function (grocery) {
        this.store.setDeleteFlag(grocery)
            .catch(function () {
            dialog_util_1.alert("An error occurred while deleting an item from your list.");
        });
    };
    ListPage.prototype.showMenu = function () {
        var _this = this;
        dialogs_1.action({
            message: "What would you like to do?",
            actions: ["Share", "Log Off"],
            cancelButtonText: "Cancel"
        }).then(function (result) {
            if (result == "Share") {
                _this.share();
            }
            else if (result == "Log Off") {
                _this.logoff();
            }
        });
    };
    ListPage.prototype.share = function () {
        var items = this.store.getItems();
        var list = [];
        for (var i = 0, size = items.length; i < size; i++) {
            list.push(items[i].name);
        }
        socialShare.shareText(list.join(", ").trim());
    };
    ListPage.prototype.logoff = function () {
        config_1.Config.invalidateToken();
        this._router.navigate(["Login"]);
    };
    __decorate([
        core_1.ViewChild("groceryTextField"), 
        __metadata('design:type', core_1.ElementRef)
    ], ListPage.prototype, "groceryTextField", void 0);
    ListPage = __decorate([
        core_1.Component({
            selector: "list",
            directives: [grocery_list_component_1.GroceryList],
            templateUrl: "pages/list/list.html",
            styleUrls: ["pages/list/list-common.css", "pages/list/list.css"],
            providers: [grocery_list_service_1.GroceryStore]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, grocery_list_service_1.GroceryStore, page_1.Page])
    ], ListPage);
    return ListPage;
}());
exports.ListPage = ListPage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQTRFLGVBQWUsQ0FBQyxDQUFBO0FBQzVGLGtDQUFxQiw0QkFBNEIsQ0FBQyxDQUFBO0FBQ2xELHNCQUFvQixPQUFPLENBQUMsQ0FBQTtBQUM1Qix3QkFBcUIsWUFBWSxDQUFDLENBQUE7QUFDbEMscUJBQW1CLFNBQVMsQ0FBQyxDQUFBO0FBRTdCLHVCQUFxQixxQkFBcUIsQ0FBQyxDQUFBO0FBRTNDLHVDQUEwQixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQzNELHFDQUEyQiwyQ0FBMkMsQ0FBQyxDQUFBO0FBQ3ZFLDRCQUFvQix5QkFBeUIsQ0FBQyxDQUFBO0FBQzlDLDBCQUEyQix1QkFBdUIsQ0FBQyxDQUFBO0FBQ25ELElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBU3ZEO0lBUUUsa0JBQW9CLE9BQWUsRUFDekIsS0FBbUIsRUFDbkIsSUFBVTtRQUZBLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDekIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUNuQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBVHBCLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFFckIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsY0FBUyxHQUFHLEtBQUssQ0FBQztJQU1LLENBQUM7SUFFeEIsMkJBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7UUFDbEMsZUFBTSxDQUFDLHlCQUF5QixFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELHdDQUFx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