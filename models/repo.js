"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRepository = (function () {
    function ApplicationRepository() {
        this.lists = [];
        this.lists_missions = new Map();
    }
    ApplicationRepository.prototype.getListFromId = function (id) {
        for (var _i = 0, _a = this.lists; _i < _a.length; _i++) {
            var v = _a[_i];
            if (v.id == id) {
                return v;
            }
        }
        return null;
    };
    ApplicationRepository.prototype.putList = function (v) {
        for (var i in this.lists) {
            if (this.lists[i].group_id == v.group_id) {
                this.lists[i] == v;
                return;
            }
        }
        this.lists.push(v);
    };
    ApplicationRepository.prototype.getMissionsFromList = function (list_id) {
        var r = this.lists_missions.get(list_id);
        return r ? r : [];
    };
    ApplicationRepository.prototype.putMissionsForList = function (list_id, missions) {
        this.lists_missions.set(list_id, missions);
    };
    ApplicationRepository.prototype.getMissionFromListById = function (list_id, id) {
        var d = this.getMissionsFromList(list_id);
        for (var _i = 0, d_1 = d; _i < d_1.length; _i++) {
            var v = d_1[_i];
            if (v.id == id) {
                return v;
            }
        }
        return null;
    };
    ApplicationRepository.prototype.putMissionForList = function (list_id, mission) {
        var d = this.getMissionsFromList(list_id);
        var shouldPush = true;
        for (var i in d) {
            if (d[i].id == mission.id) {
                d[i] == mission;
                shouldPush = false;
                break;
            }
            shouldPush && d.push(mission);
            this.putMissionsForList(list_id, d);
        }
    };
    ApplicationRepository.prototype.getFromCache = function () {
        var data = wx.getStorageSync('app_repo');
        this.lists = data.lists;
        for (var _i = 0, _a = data.missions; _i < _a.length; _i++) {
            var item = _a[_i];
            this.lists_missions.set(item.list_id, item.list_missions);
        }
    };
    ApplicationRepository.prototype.storeCache = function () {
        var data = {
            lists: this.lists,
            missions: []
        };
        this.lists_missions.forEach(function (m, id) { data.missions.push({ list_id: id, list_missions: m }); });
        wx.setStorageSync('app_repo', data);
    };
    return ApplicationRepository;
}());
exports.ApplicationRepository = ApplicationRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFXQTtJQUFBO1FBQ0UsVUFBSyxHQUFpQixFQUFFLENBQUE7UUFDeEIsbUJBQWMsR0FBRyxJQUFJLEdBQUcsRUFBMkIsQ0FBQTtJQThEckQsQ0FBQztJQTVEQyw2Q0FBYSxHQUFiLFVBQWMsRUFBVTtRQUN0QixLQUFjLFVBQVUsRUFBVixLQUFBLElBQUksQ0FBQyxLQUFLLEVBQVYsY0FBVSxFQUFWLElBQVUsRUFBRTtZQUFyQixJQUFJLENBQUMsU0FBQTtZQUNSLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQUUsT0FBTyxDQUFDLENBQUE7YUFBRTtTQUM3QjtRQUNELE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUNELHVDQUFPLEdBQVAsVUFBUSxDQUFRO1FBQ2QsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3hCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRTtnQkFDeEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ2xCLE9BQU07YUFDUDtTQUNGO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDcEIsQ0FBQztJQUNELG1EQUFtQixHQUFuQixVQUFvQixPQUFlO1FBQ2pDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3hDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ0Qsa0RBQWtCLEdBQWxCLFVBQW1CLE9BQWUsRUFBRSxRQUFvQjtRQUN0RCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDNUMsQ0FBQztJQUNELHNEQUFzQixHQUF0QixVQUF1QixPQUFlLEVBQUUsRUFBVTtRQUNoRCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDekMsS0FBYyxVQUFDLEVBQUQsT0FBQyxFQUFELGVBQUMsRUFBRCxJQUFDLEVBQUU7WUFBWixJQUFJLENBQUMsVUFBQTtZQUNSLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQUUsT0FBTyxDQUFDLENBQUE7YUFBRTtTQUM3QjtRQUNELE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUNELGlEQUFpQixHQUFqQixVQUFrQixPQUFlLEVBQUUsT0FBaUI7UUFDbEQsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3pDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQTtRQUNyQixLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNmLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsRUFBRSxFQUFFO2dCQUN6QixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFBO2dCQUNmLFVBQVUsR0FBRyxLQUFLLENBQUE7Z0JBQ2xCLE1BQUs7YUFDTjtZQUNELFVBQVUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzdCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUE7U0FDcEM7SUFDSCxDQUFDO0lBR0QsNENBQVksR0FBWjtRQUVFLElBQUksSUFBSSxHQUEwQixFQUFFLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQy9ELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQTtRQUN2QixLQUFpQixVQUFhLEVBQWIsS0FBQSxJQUFJLENBQUMsUUFBUSxFQUFiLGNBQWEsRUFBYixJQUFhLEVBQUU7WUFBM0IsSUFBSSxJQUFJLFNBQUE7WUFDWCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtTQUMxRDtJQUNILENBQUM7SUFDRCwwQ0FBVSxHQUFWO1FBQ0UsSUFBSSxJQUFJLEdBQTBCO1lBQ2hDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixRQUFRLEVBQUUsRUFBRTtTQUNiLENBQUE7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQWtCLEVBQUUsRUFBRSxJQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2xILEVBQUUsQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3JDLENBQUM7SUFDSCw0QkFBQztBQUFELENBQUMsQUFoRUQsSUFnRUM7QUFoRVksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUxpc3QsIElNaXNzaW9uIH0gZnJvbSAnLi4vdXRpbHMvdHlwZXMnXG5cbmludGVyZmFjZSBJU2VyaWFsaXplZExpc3RNaXNzaW9ucyB7XG4gIGxpc3RfaWQ6IG51bWJlcixcbiAgbGlzdF9taXNzaW9uczogQXJyYXk8SU1pc3Npb24+XG59XG5pbnRlcmZhY2UgSVNlcmlhbGl6ZWRSZXBvc2l0b3J5IHtcbiAgbGlzdHM6IEFycmF5PElMaXN0PixcbiAgbWlzc2lvbnM6IEFycmF5PElTZXJpYWxpemVkTGlzdE1pc3Npb25zPlxufVxuXG5leHBvcnQgY2xhc3MgQXBwbGljYXRpb25SZXBvc2l0b3J5IHtcbiAgbGlzdHM6IEFycmF5PElMaXN0PiA9IFtdXG4gIGxpc3RzX21pc3Npb25zID0gbmV3IE1hcDxudW1iZXIsIEFycmF5PElNaXNzaW9uPj4oKVxuXG4gIGdldExpc3RGcm9tSWQoaWQ6IG51bWJlcik6IElMaXN0IHtcbiAgICBmb3IgKHZhciB2IG9mIHRoaXMubGlzdHMpIHtcbiAgICAgIGlmICh2LmlkID09IGlkKSB7IHJldHVybiB2IH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICBwdXRMaXN0KHY6IElMaXN0KSB7XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLmxpc3RzKSB7XG4gICAgICBpZiAodGhpcy5saXN0c1tpXS5ncm91cF9pZCA9PSB2Lmdyb3VwX2lkKSB7XG4gICAgICAgIHRoaXMubGlzdHNbaV0gPT0gdlxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5saXN0cy5wdXNoKHYpXG4gIH1cbiAgZ2V0TWlzc2lvbnNGcm9tTGlzdChsaXN0X2lkOiBudW1iZXIpOiBJTWlzc2lvbltdIHtcbiAgICB2YXIgciA9IHRoaXMubGlzdHNfbWlzc2lvbnMuZ2V0KGxpc3RfaWQpXG4gICAgcmV0dXJuIHIgPyByIDogW107XG4gIH1cbiAgcHV0TWlzc2lvbnNGb3JMaXN0KGxpc3RfaWQ6IG51bWJlciwgbWlzc2lvbnM6IElNaXNzaW9uW10pIHtcbiAgICB0aGlzLmxpc3RzX21pc3Npb25zLnNldChsaXN0X2lkLCBtaXNzaW9ucylcbiAgfVxuICBnZXRNaXNzaW9uRnJvbUxpc3RCeUlkKGxpc3RfaWQ6IG51bWJlciwgaWQ6IG51bWJlcik6IElNaXNzaW9uIHtcbiAgICB2YXIgZCA9IHRoaXMuZ2V0TWlzc2lvbnNGcm9tTGlzdChsaXN0X2lkKVxuICAgIGZvciAodmFyIHYgb2YgZCkge1xuICAgICAgaWYgKHYuaWQgPT0gaWQpIHsgcmV0dXJuIHYgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIHB1dE1pc3Npb25Gb3JMaXN0KGxpc3RfaWQ6IG51bWJlciwgbWlzc2lvbjogSU1pc3Npb24pIHtcbiAgICB2YXIgZCA9IHRoaXMuZ2V0TWlzc2lvbnNGcm9tTGlzdChsaXN0X2lkKVxuICAgIHZhciBzaG91bGRQdXNoID0gdHJ1ZVxuICAgIGZvciAodmFyIGkgaW4gZCkge1xuICAgICAgaWYgKGRbaV0uaWQgPT0gbWlzc2lvbi5pZCkge1xuICAgICAgICBkW2ldID09IG1pc3Npb25cbiAgICAgICAgc2hvdWxkUHVzaCA9IGZhbHNlXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBzaG91bGRQdXNoICYmIGQucHVzaChtaXNzaW9uKVxuICAgICAgdGhpcy5wdXRNaXNzaW9uc0Zvckxpc3QobGlzdF9pZCwgZClcbiAgICB9XG4gIH1cblxuICAvKiDlvq7kv6FTdG9yYWdl5L2c5Li657yT5a2YICovXG4gIGdldEZyb21DYWNoZSgpIHtcbiAgICAvKiDku4XmnInku7vliqHlkoznvqTnu4QgKi9cbiAgICB2YXIgZGF0YTogSVNlcmlhbGl6ZWRSZXBvc2l0b3J5ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2FwcF9yZXBvJylcbiAgICB0aGlzLmxpc3RzID0gZGF0YS5saXN0c1xuICAgIGZvciAodmFyIGl0ZW0gb2YgZGF0YS5taXNzaW9ucykge1xuICAgICAgdGhpcy5saXN0c19taXNzaW9ucy5zZXQoaXRlbS5saXN0X2lkLCBpdGVtLmxpc3RfbWlzc2lvbnMpXG4gICAgfVxuICB9XG4gIHN0b3JlQ2FjaGUoKSB7XG4gICAgdmFyIGRhdGE6IElTZXJpYWxpemVkUmVwb3NpdG9yeSA9IHtcbiAgICAgIGxpc3RzOiB0aGlzLmxpc3RzLFxuICAgICAgbWlzc2lvbnM6IFtdXG4gICAgfVxuICAgIHRoaXMubGlzdHNfbWlzc2lvbnMuZm9yRWFjaCgobTogQXJyYXk8SU1pc3Npb24+LCBpZCkgPT4geyBkYXRhLm1pc3Npb25zLnB1c2goeyBsaXN0X2lkOiBpZCwgbGlzdF9taXNzaW9uczogbSB9KSB9KVxuICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdhcHBfcmVwbycsIGRhdGEpXG4gIH1cbn0iXX0=