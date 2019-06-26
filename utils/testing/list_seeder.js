"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var seeder_1 = require("./seeder");
var SEED = "豫章故郡洪都新府星分翼轸地接衡庐襟三江而带五湖控蛮荆而引瓯越物华天宝龙光射牛斗之墟人杰地灵徐孺下陈蕃之榻雄州雾列俊采星驰台隍枕夷夏之交宾主尽东南之美都督阎公之雅望棨戟遥临宇文新州之懿范襜帷暂驻十旬休假胜友如云千里逢迎高朋满座腾蛟起凤孟学士之词宗紫电青霜王将军之武库家君作宰路出名区童子何知躬逢胜饯";
var ListSeeder = (function (_super) {
    __extends(ListSeeder, _super);
    function ListSeeder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 1;
        return _this;
    }
    ListSeeder.prototype.seedOnce = function () {
        var ac = seeder_1.seed.seedInt(30, 50);
        var pfc = seeder_1.seed.seedInt(0, 20);
        var fc = pfc + seeder_1.seed.seedInt(0, ac - pfc);
        var r = {
            id: this.id++,
            name: seeder_1.seed.seedStringWithLengthFrom(seeder_1.seed.seedInt(1, 8), SEED),
            text: seeder_1.seed.seedStringWithLengthFrom(seeder_1.seed.seedInt(0, 30), SEED),
            items_info: {
                personal_finished_count: pfc,
                finished_count: fc,
                all_count: ac
            },
            is_admin: seeder_1.seed.seedBool()
        };
        return [r];
    };
    return ListSeeder;
}(seeder_1.SeederHelper));
exports.ListSeeder = ListSeeder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdF9zZWVkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0X3NlZWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSxtQ0FBNkM7QUFFN0MsSUFBTSxJQUFJLEdBQUcsc0pBQXNKLENBQUE7QUFFbks7SUFBZ0MsOEJBQXlCO0lBQXpEO1FBQUEscUVBbUJDO1FBbEJDLFFBQUUsR0FBVyxDQUFDLENBQUE7O0lBa0JoQixDQUFDO0lBakJDLDZCQUFRLEdBQVI7UUFDRSxJQUFJLEVBQUUsR0FBRyxhQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUM3QixJQUFJLEdBQUcsR0FBRyxhQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUM3QixJQUFJLEVBQUUsR0FBRyxHQUFHLEdBQUcsYUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFBO1FBQ3hDLElBQUksQ0FBQyxHQUFVO1lBQ2IsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDYixJQUFJLEVBQUUsYUFBSSxDQUFDLHdCQUF3QixDQUFDLGFBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQztZQUM3RCxJQUFJLEVBQUUsYUFBSSxDQUFDLHdCQUF3QixDQUFDLGFBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQztZQUM5RCxVQUFVLEVBQUU7Z0JBQ1YsdUJBQXVCLEVBQUUsR0FBRztnQkFDNUIsY0FBYyxFQUFFLEVBQUU7Z0JBQ2xCLFNBQVMsRUFBRSxFQUFFO2FBQ2Q7WUFDRCxRQUFRLEVBQUUsYUFBSSxDQUFDLFFBQVEsRUFBRTtTQUMxQixDQUFBO1FBQ0QsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FBQyxBQW5CRCxDQUFnQyxxQkFBWSxHQW1CM0M7QUFuQlksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTGlzdCB9IGZyb20gJy4uL3R5cGVzJ1xuaW1wb3J0IHsgU2VlZGVySGVscGVyLCBzZWVkIH0gZnJvbSAnLi9zZWVkZXInXG5cbmNvbnN0IFNFRUQgPSBcIuixq+eroOaVhemDoea0qumDveaWsOW6nOaYn+WIhue/vOi9uOWcsOaOpeihoeW6kOiln+S4ieaxn+iAjOW4puS6lOa5luaOp+ibruiNhuiAjOW8leeTr+i2iueJqeWNjuWkqeWunem+meWFieWwhOeJm+aWl+S5i+Win+S6uuadsOWcsOeBteW+kOWtuuS4i+mZiOiVg+S5i+amu+mbhOW3numbvuWIl+S/iumHh+aYn+mpsOWPsOmajeaeleWkt+Wkj+S5i+S6pOWuvuS4u+WwveS4nOWNl+S5i+e+jumDveedo+mYjuWFrOS5i+mbheacm+ajqOaIn+mBpeS4tOWuh+aWh+aWsOW3nuS5i+aHv+iMg+ilnOW4t+aagumpu+WNgeaXrOS8keWBh+iDnOWPi+WmguS6keWNg+mHjOmAoui/jumrmOaci+a7oeW6p+iFvuibn+i1t+WHpOWtn+WtpuWjq+S5i+ivjeWul+e0q+eUtemdkumcnOeOi+WwhuWGm+S5i+atpuW6k+WutuWQm+S9nOWusOi3r+WHuuWQjeWMuuerpeWtkOS9leefpei6rOmAouiDnOmlr1wiXG5cbmV4cG9ydCBjbGFzcyBMaXN0U2VlZGVyIGV4dGVuZHMgU2VlZGVySGVscGVyPElMaXN0LCBudWxsPiB7XG4gIGlkOiBudW1iZXIgPSAxXG4gIHNlZWRPbmNlKCk6IEFycmF5PElMaXN0PiB7XG4gICAgdmFyIGFjID0gc2VlZC5zZWVkSW50KDMwLCA1MClcbiAgICB2YXIgcGZjID0gc2VlZC5zZWVkSW50KDAsIDIwKVxuICAgIHZhciBmYyA9IHBmYyArIHNlZWQuc2VlZEludCgwLCBhYyAtIHBmYylcbiAgICB2YXIgcjogSUxpc3QgPSB7XG4gICAgICBpZDogdGhpcy5pZCsrLFxuICAgICAgbmFtZTogc2VlZC5zZWVkU3RyaW5nV2l0aExlbmd0aEZyb20oc2VlZC5zZWVkSW50KDEsIDgpLCBTRUVEKSxcbiAgICAgIHRleHQ6IHNlZWQuc2VlZFN0cmluZ1dpdGhMZW5ndGhGcm9tKHNlZWQuc2VlZEludCgwLCAzMCksIFNFRUQpLFxuICAgICAgaXRlbXNfaW5mbzoge1xuICAgICAgICBwZXJzb25hbF9maW5pc2hlZF9jb3VudDogcGZjLFxuICAgICAgICBmaW5pc2hlZF9jb3VudDogZmMsXG4gICAgICAgIGFsbF9jb3VudDogYWNcbiAgICAgIH0sXG4gICAgICBpc19hZG1pbjogc2VlZC5zZWVkQm9vbCgpXG4gICAgfVxuICAgIHJldHVybiBbcl07XG4gIH1cbn0iXX0=