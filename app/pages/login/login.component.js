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
var connectivity_1 = require("connectivity");
var animation_1 = require("ui/animation");
var dialogs_1 = require("ui/dialogs");
var page_1 = require("ui/page");
var user_1 = require("../../shared/user/user");
var user_service_1 = require("../../shared/user/user.service");
var dialog_util_1 = require("../../utils/dialog-util");
var LoginPage = (function () {
    function LoginPage(_router, _userService, page) {
        this._router = _router;
        this._userService = _userService;
        this.page = page;
        this.isLoggingIn = true;
        this.isAuthenticating = false;
        this.user = new user_1.User();
        this.user.email = "ngconf@telerik33.com";
        this.user.password = "password";
    }
    LoginPage.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
    };
    LoginPage.prototype.focusPassword = function () {
        this.password.nativeElement.focus();
    };
    LoginPage.prototype.submit = function () {
        if (!this.user.isValidEmail()) {
            dialog_util_1.alert("Enter a valid email address.");
            return;
        }
        this.isAuthenticating = true;
        if (this.isLoggingIn) {
            this.login();
        }
        else {
            this.signUp();
        }
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        if (connectivity_1.getConnectionType() == connectivity_1.connectionType.none) {
            dialog_util_1.alert("rLoop requires an internet connection to log in.");
            return;
        }
        this._userService.login(this.user)
            .then(function () {
            _this.isAuthenticating = false;
            _this._router.navigate(["List"]);
        })
            .catch(function () {
            dialog_util_1.alert("Unfortunately we could not find your account.");
            _this.isAuthenticating = false;
        });
    };
    LoginPage.prototype.goMainPage = function () {
        this._router.navigate(["List"]);
    };
    LoginPage.prototype.signUp = function () {
        var _this = this;
        if (connectivity_1.getConnectionType() == connectivity_1.connectionType.none) {
            dialog_util_1.alert("Groceries requires an internet connection to register.");
            return;
        }
        this._userService.register(this.user)
            .then(function () {
            dialog_util_1.alert("Your account was successfully created.");
            _this.isAuthenticating = false;
            _this.toggleDisplay();
        })
            .catch(function (message) {
            if (message.match(/same user/)) {
                dialog_util_1.alert("This email address is already in use.");
            }
            else {
                dialog_util_1.alert("Unfortunately we were unable to create your account.");
            }
            _this.isAuthenticating = false;
        });
    };
    LoginPage.prototype.forgotPassword = function () {
        var _this = this;
        dialogs_1.prompt({
            title: "Forgot Password",
            message: "Enter the email address you used to register for rLoop to reset your password.",
            defaultText: "",
            okButtonText: "Ok",
            cancelButtonText: "Cancel"
        }).then(function (data) {
            if (data.result) {
                _this._userService.resetPassword(data.text.trim())
                    .then(function () {
                    dialog_util_1.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
                })
                    .catch(function () {
                    dialog_util_1.alert("Unfortunately, an error occurred resetting your password.");
                });
            }
        });
    };
    LoginPage.prototype.toggleDisplay = function () {
        this.isLoggingIn = !this.isLoggingIn;
        var mainContainer = this.mainContainer.nativeElement;
        mainContainer.animate({
            backgroundColor: this.isLoggingIn ? new color_1.Color("white") : new color_1.Color("#301217"),
            duration: 200
        });
    };
    LoginPage.prototype.startBackgroundAnimation = function (background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    };
    LoginPage.prototype.showMainContent = function () {
        var initialContainer = this.initialContainer.nativeElement;
        var mainContainer = this.mainContainer.nativeElement;
        var formControls = this.formControls.nativeElement;
        var signUpStack = this.signUpStack.nativeElement;
        var animations = [];
        // Fade out the initial content over one half second
        initialContainer.animate({
            opacity: 0,
            duration: 500
        }).then(function () {
            // After the animation completes, hide the initial container and
            // show the main container and logo. The main container and logo will
            // not immediately appear because their opacity is set to 0 in CSS.
            initialContainer.style.visibility = "collapse";
            mainContainer.style.visibility = "visible";
            // Fade in the main container and logo over one half second.
            animations.push({ target: mainContainer, opacity: 1, duration: 500 });
            // Slide up the form controls and sign up container.
            animations.push({ target: signUpStack, translate: { x: 0, y: 0 }, opacity: 1, delay: 500, duration: 150 });
            animations.push({ target: formControls, translate: { x: 0, y: 0 }, opacity: 1, delay: 650, duration: 150 });
            // Kick off the animation queue
            new animation_1.Animation(animations, false).play();
        });
    };
    __decorate([
        core_1.ViewChild("initialContainer"), 
        __metadata('design:type', core_1.ElementRef)
    ], LoginPage.prototype, "initialContainer", void 0);
    __decorate([
        core_1.ViewChild("mainContainer"), 
        __metadata('design:type', core_1.ElementRef)
    ], LoginPage.prototype, "mainContainer", void 0);
    __decorate([
        core_1.ViewChild("formControls"), 
        __metadata('design:type', core_1.ElementRef)
    ], LoginPage.prototype, "formControls", void 0);
    __decorate([
        core_1.ViewChild("signUpStack"), 
        __metadata('design:type', core_1.ElementRef)
    ], LoginPage.prototype, "signUpStack", void 0);
    __decorate([
        core_1.ViewChild("email"), 
        __metadata('design:type', core_1.ElementRef)
    ], LoginPage.prototype, "email", void 0);
    __decorate([
        core_1.ViewChild("password"), 
        __metadata('design:type', core_1.ElementRef)
    ], LoginPage.prototype, "password", void 0);
    LoginPage = __decorate([
        core_1.Component({
            selector: "my-app",
            providers: [user_service_1.UserService],
            templateUrl: "pages/login/login.html",
            styleUrls: ["pages/login/login-common.css", "pages/login/login.css"],
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, user_service_1.UserService, page_1.Page])
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBdUQsZUFBZSxDQUFDLENBQUE7QUFDdkUsa0NBQXFCLDRCQUE0QixDQUFDLENBQUE7QUFDbEQsc0JBQW9CLE9BQU8sQ0FBQyxDQUFBO0FBQzVCLDZCQUFnRCxjQUFjLENBQUMsQ0FBQTtBQUMvRCwwQkFBd0IsY0FBYyxDQUFDLENBQUE7QUFFdkMsd0JBQXFCLFlBQVksQ0FBQyxDQUFBO0FBQ2xDLHFCQUFtQixTQUFTLENBQUMsQ0FBQTtBQUU3QixxQkFBbUIsd0JBQXdCLENBQUMsQ0FBQTtBQUM1Qyw2QkFBMEIsZ0NBQWdDLENBQUMsQ0FBQTtBQUUzRCw0QkFBb0IseUJBQXlCLENBQUMsQ0FBQTtBQVE5QztJQVlFLG1CQUFvQixPQUFlLEVBQ3pCLFlBQXlCLEVBQ3pCLElBQVU7UUFGQSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ3pCLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQ3pCLFNBQUksR0FBSixJQUFJLENBQU07UUFacEIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBWXZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxzQkFBc0IsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDbEMsQ0FBQztJQUVELDRCQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQUVELGlDQUFhLEdBQWI7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQsMEJBQU0sR0FBTjtRQUNFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDOUIsbUJBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sQ0FBQztRQUNULENBQUM7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNmLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQixDQUFDO0lBQ0gsQ0FBQztJQUVELHlCQUFLLEdBQUw7UUFBQSxpQkFlQztRQWRDLEVBQUUsQ0FBQyxDQUFDLGdDQUFpQixFQUFFLElBQUksNkJBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQy9DLG1CQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQztZQUMxRCxNQUFNLENBQUM7UUFDVCxDQUFDO1FBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUMvQixJQUFJLENBQUM7WUFDSixLQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBQzlCLEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUM7WUFDTCxtQkFBSyxDQUFDLCtDQUErQyxDQUFDLENBQUM7WUFDdkQsS0FBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw4QkFBVSxHQUFWO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCwwQkFBTSxHQUFOO1FBQUEsaUJBb0JDO1FBbkJDLEVBQUUsQ0FBQyxDQUFDLGdDQUFpQixFQUFFLElBQUksNkJBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQy9DLG1CQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQztZQUNoRSxNQUFNLENBQUM7UUFDVCxDQUFDO1FBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNsQyxJQUFJLENBQUM7WUFDSixtQkFBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7WUFDaEQsS0FBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztZQUM5QixLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUMsT0FBTztZQUNiLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixtQkFBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7WUFDakQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLG1CQUFLLENBQUMsc0RBQXNELENBQUMsQ0FBQztZQUNoRSxDQUFDO1lBQ0QsS0FBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxrQ0FBYyxHQUFkO1FBQUEsaUJBa0JDO1FBakJDLGdCQUFNLENBQUM7WUFDTCxLQUFLLEVBQUUsaUJBQWlCO1lBQ3hCLE9BQU8sRUFBRSxnRkFBZ0Y7WUFDekYsV0FBVyxFQUFFLEVBQUU7WUFDZixZQUFZLEVBQUUsSUFBSTtZQUNsQixnQkFBZ0IsRUFBRSxRQUFRO1NBQzNCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJO1lBQ1gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLEtBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7cUJBQzlDLElBQUksQ0FBQztvQkFDSixtQkFBSyxDQUFDLDRHQUE0RyxDQUFDLENBQUM7Z0JBQ3RILENBQUMsQ0FBQztxQkFDRCxLQUFLLENBQUM7b0JBQ0wsbUJBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFDO2dCQUNyRSxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxpQ0FBYSxHQUFiO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDckMsSUFBSSxhQUFhLEdBQVMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7UUFDM0QsYUFBYSxDQUFDLE9BQU8sQ0FBQztZQUNwQixlQUFlLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLGFBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLGFBQUssQ0FBQyxTQUFTLENBQUM7WUFDN0UsUUFBUSxFQUFFLEdBQUc7U0FDZCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsNENBQXdCLEdBQXhCLFVBQXlCLFVBQVU7UUFDakMsVUFBVSxDQUFDLE9BQU8sQ0FBQztZQUNqQixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUU7WUFDekIsUUFBUSxFQUFFLEtBQUs7U0FDaEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG1DQUFlLEdBQWY7UUFDRSxJQUFJLGdCQUFnQixHQUFTLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7UUFDakUsSUFBSSxhQUFhLEdBQVMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7UUFDM0QsSUFBSSxZQUFZLEdBQVMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFDekQsSUFBSSxXQUFXLEdBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7UUFDdkQsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBRXBCLG9EQUFvRDtRQUNwRCxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7WUFDdkIsT0FBTyxFQUFFLENBQUM7WUFDVixRQUFRLEVBQUUsR0FBRztTQUNkLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDTixnRUFBZ0U7WUFDaEUscUVBQXFFO1lBQ3JFLG1FQUFtRTtZQUNuRSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUMvQyxhQUFhLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFFM0MsNERBQTREO1lBQzVELFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFFdEUsb0RBQW9EO1lBQ3BELFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUMzRyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFFNUcsK0JBQStCO1lBQy9CLElBQUkscUJBQVMsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBaEpEO1FBQUMsZ0JBQVMsQ0FBQyxrQkFBa0IsQ0FBQzs7dURBQUE7SUFDOUI7UUFBQyxnQkFBUyxDQUFDLGVBQWUsQ0FBQzs7b0RBQUE7SUFDM0I7UUFBQyxnQkFBUyxDQUFDLGNBQWMsQ0FBQzs7bURBQUE7SUFDMUI7UUFBQyxnQkFBUyxDQUFDLGFBQWEsQ0FBQzs7a0RBQUE7SUFDekI7UUFBQyxnQkFBUyxDQUFDLE9BQU8sQ0FBQzs7NENBQUE7SUFDbkI7UUFBQyxnQkFBUyxDQUFDLFVBQVUsQ0FBQzs7K0NBQUE7SUFoQnhCO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFNBQVMsRUFBRSxDQUFDLDBCQUFXLENBQUM7WUFDeEIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsRUFBRSx1QkFBdUIsQ0FBQztTQUNyRSxDQUFDOztpQkFBQTtJQXVKRixnQkFBQztBQUFELENBQUMsQUF0SkQsSUFzSkM7QUF0SlksaUJBQVMsWUFzSnJCLENBQUEifQ==