"use strict";
var user_1 = require("../../../shared/user/user");
describe("Email validation", function () {
    var user = new user_1.User();
    it("Should reject an empty email address", function () {
        user.email = "";
        expect(user.isValidEmail()).toBe(false);
    });
    it("Should reject a malformed email addresses", function () {
        user.email = "nativescript";
        expect(user.isValidEmail()).toBe(false);
        user.email = "nativescript@";
        expect(user.isValidEmail()).toBe(false);
        user.email = "nativescript@isawesome";
        expect(user.isValidEmail()).toBe(false);
    });
    it("Should accept valid email addresses", function () {
        user.email = "nativescript@isawesome.com";
        expect(user.isValidEmail()).toBe(true);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQkFBbUIsMkJBQTJCLENBQUMsQ0FBQTtBQU0vQyxRQUFRLENBQUMsa0JBQWtCLEVBQUU7SUFDM0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxXQUFJLEVBQUUsQ0FBQztJQUV0QixFQUFFLENBQUMsc0NBQXNDLEVBQUU7UUFDekMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywyQ0FBMkMsRUFBRTtRQUM5QyxJQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQztRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEMsSUFBSSxDQUFDLEtBQUssR0FBRyx3QkFBd0IsQ0FBQztRQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHFDQUFxQyxFQUFFO1FBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsNEJBQTRCLENBQUM7UUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=