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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Grid, useTheme, useMediaQuery, } from "@mui/material";
import { randomBytes } from "crypto";
import { addMinutes, differenceInMinutes } from "date-fns";
import { EditorDatePicker } from "../components/inputs/DatePicker";
import { EditorInput } from "../components/inputs/Input";
import { useAppState } from "../hooks/useAppState";
import { EditorSelect } from "../components/inputs/SelectInput";
import { arraytizeFieldVal } from "../helpers/generals";
var initialState = function (fields, event) {
    var _a;
    var customFields = {};
    for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
        var field = fields_1[_i];
        var defVal = arraytizeFieldVal(field, field.default, event);
        var eveVal = arraytizeFieldVal(field, event === null || event === void 0 ? void 0 : event[field.name], event);
        customFields[field.name] = {
            value: eveVal.value || defVal.value || "",
            validity: ((_a = field.config) === null || _a === void 0 ? void 0 : _a.required)
                ? !!eveVal.validity || !!defVal.validity
                : true,
            type: field.type,
            config: field.config,
        };
    }
    return __assign({ event_id: {
            value: (event === null || event === void 0 ? void 0 : event.event_id) || null,
            validity: true,
            type: "hidden",
        }, title: {
            value: (event === null || event === void 0 ? void 0 : event.title) || "",
            validity: !!(event === null || event === void 0 ? void 0 : event.title),
            type: "input",
            config: { label: "Title", required: true, min: 3 },
        }, start: {
            value: (event === null || event === void 0 ? void 0 : event.start) || new Date(),
            validity: true,
            type: "date",
            config: { label: "Start", sm: 6 },
        }, end: {
            value: (event === null || event === void 0 ? void 0 : event.end) || new Date(),
            validity: true,
            type: "date",
            config: { label: "End", sm: 6 },
        } }, customFields);
};
var Editor = function () {
    var _a = useAppState(), fields = _a.fields, dialog = _a.dialog, triggerDialog = _a.triggerDialog, selectedRange = _a.selectedRange, selectedEvent = _a.selectedEvent, triggerLoading = _a.triggerLoading, onConfirm = _a.onConfirm, customEditor = _a.customEditor, confirmEvent = _a.confirmEvent, dialogMaxWidth = _a.dialogMaxWidth;
    var _b = useState(initialState(fields, selectedEvent || selectedRange)), state = _b[0], setState = _b[1];
    var _c = useState(false), touched = _c[0], setTouched = _c[1];
    var theme = useTheme();
    var isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    var handleEditorState = function (name, value, validity) {
        setState(function (prev) {
            var _a;
            return __assign(__assign({}, prev), (_a = {}, _a[name] = __assign(__assign({}, prev[name]), { value: value, validity: validity }), _a));
        });
    };
    var handleClose = function (clearState) {
        if (clearState) {
            setState(initialState(fields));
        }
        triggerDialog(false);
    };
    var handleConfirm = function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, key, action, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = {};
                    for (key in state) {
                        body[key] = state[key].value;
                        if (!customEditor && !state[key].validity) {
                            return [2 /*return*/, setTouched(true)];
                        }
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    triggerLoading(true);
                    // Auto fix date
                    body.end =
                        body.start >= body.end
                            ? addMinutes(body.start, differenceInMinutes(selectedRange === null || selectedRange === void 0 ? void 0 : selectedRange.end, selectedRange === null || selectedRange === void 0 ? void 0 : selectedRange.start))
                            : body.end;
                    action = (selectedEvent === null || selectedEvent === void 0 ? void 0 : selectedEvent.event_id) ? "edit" : "create";
                    if (!onConfirm) return [3 /*break*/, 3];
                    return [4 /*yield*/, onConfirm(body, action)];
                case 2:
                    body = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    // Create/Edit local data
                    body.event_id =
                        (selectedEvent === null || selectedEvent === void 0 ? void 0 : selectedEvent.event_id) || randomBytes(6).toString("hex");
                    _a.label = 4;
                case 4:
                    confirmEvent(body, action);
                    handleClose(true);
                    return [3 /*break*/, 7];
                case 5:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 7];
                case 6:
                    triggerLoading(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var renderInputs = function (key) {
        var stateItem = state[key];
        switch (stateItem.type) {
            case "input":
                return (_jsx(EditorInput, __assign({ value: stateItem.value, name: key, onChange: handleEditorState, touched: touched }, stateItem.config), void 0));
            case "date":
                return (_jsx(EditorDatePicker, __assign({ value: stateItem.value, name: key, onChange: function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return handleEditorState.apply(void 0, __spreadArray(__spreadArray([], args, false), [true], false));
                    } }, stateItem.config), void 0));
            case "select":
                var field = fields.find(function (f) { return f.name === key; });
                return (_jsx(EditorSelect, __assign({ value: stateItem.value, name: key, options: (field === null || field === void 0 ? void 0 : field.options) || [], onChange: handleEditorState, touched: touched }, stateItem.config), void 0));
            default:
                return "";
        }
    };
    var renderEditor = function () {
        if (customEditor) {
            var schedulerHelpers = {
                state: state,
                close: function () { return triggerDialog(false); },
                loading: function (load) { return triggerLoading(load); },
                edited: selectedEvent,
                onConfirm: confirmEvent,
            };
            return customEditor(schedulerHelpers);
        }
        return (_jsxs(Fragment, { children: [_jsx(DialogTitle, { children: selectedEvent ? "Edit Event" : "Add Event" }, void 0), _jsx(DialogContent, __assign({ style: { overflowX: "hidden" } }, { children: _jsx(Grid, __assign({ container: true, spacing: 1 }, { children: Object.keys(state).map(function (key) {
                            var _a;
                            var item = state[key];
                            return (_jsx(Grid, __assign({ item: true, sm: (_a = item.config) === null || _a === void 0 ? void 0 : _a.sm, xs: 12 }, { children: renderInputs(key) }), key));
                        }) }), void 0) }), void 0), _jsxs(DialogActions, { children: [_jsx(Button, __assign({ color: "inherit", fullWidth: true, onClick: function () { return handleClose(); } }, { children: "Cancel" }), void 0), _jsx(Button, __assign({ color: "primary", fullWidth: true, onClick: handleConfirm }, { children: "Confirm" }), void 0)] }, void 0)] }, void 0));
    };
    return (_jsx(Dialog, __assign({ open: dialog, fullScreen: isMobile, maxWidth: dialogMaxWidth }, { children: renderEditor() }), void 0));
};
export default Editor;
