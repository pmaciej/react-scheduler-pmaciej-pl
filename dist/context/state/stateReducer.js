var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var stateReducer = function (state, action) {
    var _a;
    switch (action.type) {
        case "updateProps":
            return __assign(__assign({}, state), action.payload);
        case "set":
            var _b = action.payload, name_1 = _b.name, value = _b.value;
            return __assign(__assign({}, state), (_a = {}, _a[name_1] = value, _a));
        case "triggerDialog":
            var selected = action.payload.selected;
            return __assign(__assign({}, state), { dialog: action.payload.status, selectedRange: (selected === null || selected === void 0 ? void 0 : selected.event_id) ? null : selected, selectedEvent: (selected === null || selected === void 0 ? void 0 : selected.event_id) ? selected : null });
        case "triggerLoading":
            return __assign(__assign({}, state), { loading: action.payload });
        default:
            return state;
    }
};
export { stateReducer };
