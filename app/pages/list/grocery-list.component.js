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
var grocery_list_service_1 = require("../../shared/grocery/grocery-list.service");
var dialog_util_1 = require("../../utils/dialog-util");
var ItemStatusPipe = (function () {
    function ItemStatusPipe(_ref) {
        this._ref = _ref;
        this.value = [];
    }
    ItemStatusPipe.prototype.transform = function (items, deleted) {
        if (items && items.length) {
            this.value = items.filter(function (grocery) {
                return grocery.deleted == deleted;
            });
            this._ref.markForCheck();
        }
        return this.value;
    };
    ItemStatusPipe = __decorate([
        core_1.Pipe({
            name: "itemStatus"
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
    ], ItemStatusPipe);
    return ItemStatusPipe;
}());
exports.ItemStatusPipe = ItemStatusPipe;
var GroceryList = (function () {
    function GroceryList(store) {
        var _this = this;
        this.store = store;
        this.loading = new core_1.EventEmitter();
        this.loaded = new core_1.EventEmitter();
        this.listLoaded = false;
        // TODO: This is hacky. Why do I need to defer the call to load()
        // to get the appropriate events to fire?
        setTimeout(function () {
            _this.load();
        });
    }
    GroceryList.prototype.load = function () {
        var _this = this;
        this.loading.next("");
        this.store.load()
            .then(function () {
            _this.loaded.next("");
            _this.listLoaded = true;
        })
            .catch(function () {
            dialog_util_1.alert("An error occurred loading your grocery list.");
        });
    };
    // The following trick makes the background color of each cell
    // in the UITableView transparent as it’s created.
    GroceryList.prototype.makeBackgroundTransparent = function (args) {
        var cell = args.ios;
        if (cell) {
            cell.backgroundColor = UIColor.clearColor();
        }
    };
    GroceryList.prototype.imageSource = function (grocery) {
        if (grocery.deleted) {
            return grocery.done ? "res://selected" : "res://nonselected";
        }
        return grocery.done ? "res://checked" : "res://unchecked";
    };
    GroceryList.prototype.toggleDone = function (grocery) {
        if (grocery.deleted) {
            grocery.done = !grocery.done;
            return;
        }
        this.store.toggleDoneFlag(grocery)
            .catch(function () {
            dialog_util_1.alert("An error occurred managing your grocery list.");
        });
    };
    GroceryList.prototype.delete = function (grocery) {
        this.store.setDeleteFlag(grocery)
            .catch(function () {
            dialog_util_1.alert("An error occurred while deleting an item from your list.");
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], GroceryList.prototype, "showDeleted", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GroceryList.prototype, "row", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GroceryList.prototype, "loading", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GroceryList.prototype, "loaded", void 0);
    GroceryList = __decorate([
        core_1.Component({
            selector: "GroceryList",
            templateUrl: "pages/list/grocery-list.html",
            styleUrls: ["pages/list/grocery-list.css"],
            pipes: [ItemStatusPipe],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [grocery_list_service_1.GroceryStore])
    ], GroceryList);
    return GroceryList;
}());
exports.GroceryList = GroceryList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvY2VyeS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdyb2NlcnktbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUE4SCxlQUFlLENBQUMsQ0FBQTtBQUU5SSxxQ0FBMkIsMkNBQTJDLENBQUMsQ0FBQTtBQUV2RSw0QkFBb0IseUJBQXlCLENBQUMsQ0FBQTtBQU85QztJQUVFLHdCQUFvQixJQUF1QjtRQUF2QixTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUQzQyxVQUFLLEdBQW1CLEVBQUUsQ0FBQztJQUNtQixDQUFDO0lBQy9DLGtDQUFTLEdBQVQsVUFBVSxLQUFxQixFQUFFLE9BQWdCO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQyxPQUFnQjtnQkFDekMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQWRIO1FBQUMsV0FBSSxDQUFDO1lBQ0osSUFBSSxFQUFFLFlBQVk7U0FDbkIsQ0FBQzs7c0JBQUE7SUFhRixxQkFBQztBQUFELENBQUMsQUFaRCxJQVlDO0FBWlksc0JBQWMsaUJBWTFCLENBQUE7QUFTRDtJQVFFLHFCQUFvQixLQUFtQjtRQVJ6QyxpQkE4REM7UUF0RHFCLFVBQUssR0FBTCxLQUFLLENBQWM7UUFMN0IsWUFBTyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQzdCLFdBQU0sR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUV0QyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBR2pCLGlFQUFpRTtRQUNqRSx5Q0FBeUM7UUFDekMsVUFBVSxDQUFDO1lBQ1QsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsMEJBQUksR0FBSjtRQUFBLGlCQVVDO1FBVEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7YUFDZCxJQUFJLENBQUM7WUFDSixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQixLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN6QixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUM7WUFDTCxtQkFBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsOERBQThEO0lBQzlELGtEQUFrRDtJQUNsRCwrQ0FBeUIsR0FBekIsVUFBMEIsSUFBSTtRQUM1QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDVCxJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM5QyxDQUFDO0lBQ0gsQ0FBQztJQUVELGlDQUFXLEdBQVgsVUFBWSxPQUFPO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLGdCQUFnQixHQUFHLG1CQUFtQixDQUFBO1FBQzlELENBQUM7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxlQUFlLEdBQUcsaUJBQWlCLENBQUM7SUFDNUQsQ0FBQztJQUVELGdDQUFVLEdBQVYsVUFBVyxPQUFnQjtRQUN6QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNwQixPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUM3QixNQUFNLENBQUM7UUFDVCxDQUFDO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO2FBQy9CLEtBQUssQ0FBQztZQUNMLG1CQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw0QkFBTSxHQUFOLFVBQU8sT0FBZ0I7UUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO2FBQzlCLEtBQUssQ0FBQztZQUNMLG1CQUFLLENBQUMsMERBQTBELENBQUMsQ0FBQztRQUNwRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUE1REQ7UUFBQyxZQUFLLEVBQUU7O29EQUFBO0lBQ1I7UUFBQyxZQUFLLEVBQUU7OzRDQUFBO0lBQ1I7UUFBQyxhQUFNLEVBQUU7O2dEQUFBO0lBQ1Q7UUFBQyxhQUFNLEVBQUU7OytDQUFBO0lBWFg7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztZQUMxQyxLQUFLLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDdkIsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzs7bUJBQUE7SUErREYsa0JBQUM7QUFBRCxDQUFDLEFBOURELElBOERDO0FBOURZLG1CQUFXLGNBOER2QixDQUFBIn0=