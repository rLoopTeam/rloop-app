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
var config_1 = require("../config");
var grocery_1 = require("./grocery");
var Rx_1 = require("rxjs/Rx");
var GroceryStore = (function () {
    function GroceryStore() {
        this.items = new Rx_1.BehaviorSubject([]);
        this._allItems = [];
    }
    GroceryStore.prototype.load = function () {
        var _this = this;
        config_1.Config.el.authentication.setAuthorization(config_1.Config.token, "bearer");
        return config_1.Config.el.data("Groceries")
            .withHeaders({ "X-Everlive-Sort": JSON.stringify({ ModifiedAt: -1 }) })
            .get()
            .then(function (data) {
            data.result.forEach(function (grocery) {
                _this._allItems.push(new grocery_1.Grocery(grocery.Id, grocery.Name, grocery.Done || false, grocery.Deleted || false));
                _this.publishUpdates();
            });
            return Promise.resolve(_this._allItems);
        })
            .catch(this.handleErrors);
    };
    GroceryStore.prototype.add = function (name) {
        var newGrocery = new grocery_1.Grocery("", name, false, false);
        this._allItems.unshift(newGrocery);
        this.publishUpdates();
        return config_1.Config.el.data("Groceries")
            .create({ Name: name })
            .then(function (data) {
            newGrocery.id = data.result.Id;
            return Promise.resolve(newGrocery);
        })
            .catch(this.handleErrors);
    };
    GroceryStore.prototype.getItems = function () {
        return this._allItems;
    };
    GroceryStore.prototype.setDeleteFlag = function (item) {
        item.deleted = true;
        item.done = false;
        this.publishUpdates();
        return config_1.Config.el.data("Groceries")
            .updateSingle({ Id: item.id, Deleted: true, Done: true })
            .catch(this.handleErrors);
    };
    GroceryStore.prototype.toggleDoneFlag = function (item) {
        item.done = !item.done;
        this.publishUpdates();
        return config_1.Config.el.data("Groceries")
            .updateSingle({ Id: item.id, Done: !item.done })
            .catch(this.handleErrors);
    };
    GroceryStore.prototype.restore = function () {
        var indeces = [];
        this._allItems.forEach(function (grocery) {
            if (grocery.deleted && grocery.done) {
                grocery.done = false;
                grocery.deleted = false;
                indeces.push(grocery.id);
            }
        });
        var headers = {
            "X-Everlive-Filter": JSON.stringify({
                "Id": { "$in": indeces }
            })
        };
        this.publishUpdates();
        return config_1.Config.el.data("Groceries")
            .withHeaders(headers)
            .update({ Deleted: false, Done: false })
            .catch(this.handleErrors);
    };
    GroceryStore.prototype.publishUpdates = function () {
        // must emit a *new* value (immutability!)
        this.items.next(this._allItems.slice());
    };
    GroceryStore.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error));
        return Promise.reject(error.message);
    };
    GroceryStore = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], GroceryStore);
    return GroceryStore;
}());
exports.GroceryStore = GroceryStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvY2VyeS1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJncm9jZXJ5LWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUJBQXlCLGVBQWUsQ0FBQyxDQUFBO0FBQ3pDLHVCQUFxQixXQUFXLENBQUMsQ0FBQTtBQUNqQyx3QkFBc0IsV0FBVyxDQUFDLENBQUE7QUFDbEMsbUJBQTBDLFNBQVMsQ0FBQyxDQUFBO0FBR3BEO0lBQUE7UUFFRSxVQUFLLEdBQW9DLElBQUksb0JBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6RCxjQUFTLEdBQW1CLEVBQUUsQ0FBQztJQTBGekMsQ0FBQztJQXhGQywyQkFBSSxHQUFKO1FBQUEsaUJBb0JDO1FBbkJDLGVBQU0sQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLGVBQU0sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbEUsTUFBTSxDQUFDLGVBQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzthQUMvQixXQUFXLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ3RFLEdBQUcsRUFBRTthQUNMLElBQUksQ0FBQyxVQUFDLElBQUk7WUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU87Z0JBQzFCLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUNqQixJQUFJLGlCQUFPLENBQ1QsT0FBTyxDQUFDLEVBQUUsRUFDVixPQUFPLENBQUMsSUFBSSxFQUNaLE9BQU8sQ0FBQyxJQUFJLElBQUksS0FBSyxFQUNyQixPQUFPLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FDekIsQ0FDRixDQUFDO2dCQUNGLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN4QixDQUFD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