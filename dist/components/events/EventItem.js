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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment, useState } from "react";
import { Popover, Typography, ButtonBase, useTheme, IconButton, Button, Slide, Paper, } from "@mui/material";
import { format } from "date-fns";
import { useAppState } from "../../hooks/useAppState";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded";
import CSS from "../../assets/css/styles.module.css";
var EventItem = function (_a) {
    var event = _a.event, multiday = _a.multiday, hasPrev = _a.hasPrev, hasNext = _a.hasNext, showdate = _a.showdate;
    var _b = useAppState(), triggerDialog = _b.triggerDialog, onDelete = _b.onDelete, events = _b.events, handleState = _b.handleState, triggerLoading = _b.triggerLoading, viewerExtraComponent = _b.viewerExtraComponent, fields = _b.fields, direction = _b.direction, resources = _b.resources, resourceFields = _b.resourceFields, locale = _b.locale, viewerTitleComponent = _b.viewerTitleComponent;
    var _c = useState(null), anchorEl = _c[0], setAnchorEl = _c[1];
    var _d = useState(false), deleteConfirm = _d[0], setDeleteConfirm = _d[1];
    var theme = useTheme();
    var NextArrow = direction === "rtl" ? ArrowLeftRoundedIcon : ArrowRightRoundedIcon;
    var PrevArrow = direction === "rtl" ? ArrowRightRoundedIcon : ArrowLeftRoundedIcon;
    var triggerViewer = function (el) {
        if (!el && deleteConfirm) {
            setDeleteConfirm(false);
        }
        setAnchorEl(el || null);
    };
    var handleConfirmDelete = function () { return __awaiter(void 0, void 0, void 0, function () {
        var deletedId_1, remoteId, updatedEvents, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    triggerLoading(true);
                    deletedId_1 = event.event_id;
                    if (!onDelete) return [3 /*break*/, 2];
                    return [4 /*yield*/, onDelete(deletedId_1)];
                case 1:
                    remoteId = _a.sent();
                    if (remoteId) {
                        deletedId_1 = remoteId;
                    }
                    else {
                        deletedId_1 = "";
                    }
                    _a.label = 2;
                case 2:
                    if (deletedId_1) {
                        updatedEvents = events.filter(function (e) { return e.event_id !== deletedId_1; });
                        handleState(updatedEvents, "events");
                        triggerViewer();
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 5];
                case 4:
                    triggerLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var item = (_jsxs("div", __assign({ style: { padding: 2 } }, { children: [_jsx(Typography, __assign({ variant: "subtitle2", color: "#FFF", style: { fontSize: 12 }, noWrap: true }, { children: event.title }), void 0), showdate && (_jsx(Typography, __assign({ style: { fontSize: 11 }, noWrap: true }, { children: format(event.start, "hh:mm a", {
                    locale: locale,
                }) + " - " + format(event.end, "hh:mm a", { locale: locale }) }), void 0))] }), void 0));
    if (multiday) {
        item = (_jsxs("div", __assign({ style: {
                padding: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
            } }, { children: [_jsx(Typography, __assign({ style: { fontSize: 11 }, noWrap: true }, { children: hasPrev ? (_jsx(PrevArrow, { fontSize: "small", style: { display: "flex" } }, void 0)) : (showdate && format(event.start, "hh:mm a", { locale: locale })) }), void 0), _jsx(Typography, __assign({ variant: "subtitle2", align: "center", style: { fontSize: 12 }, noWrap: true }, { children: event.title }), void 0), _jsx(Typography, __assign({ style: { fontSize: 11 }, noWrap: true }, { children: hasNext ? (_jsx(NextArrow, { fontSize: "small", style: { display: "flex" } }, void 0)) : (showdate && format(event.end, "hh:mm a", { locale: locale })) }), void 0)] }), void 0));
    }
    var renderViewer = function () {
        var idKey = resourceFields.idField;
        var hasResource = resources.filter(function (res) {
            return Array.isArray(event[idKey])
                ? event[idKey].includes(res[idKey])
                : res[idKey] === event[idKey];
        });
        return (_jsxs("div", __assign({ className: CSS.cal__popper }, { children: [_jsxs("div", __assign({ style: {
                        background: event.color || theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                    }, className: CSS.popper__p }, { children: [_jsxs("div", __assign({ className: CSS.popper__actions }, { children: [_jsx("div", { children: _jsx(IconButton, __assign({ size: "small", style: { color: theme.palette.primary.contrastText }, onClick: function () {
                                            triggerViewer();
                                        } }, { children: _jsx(ClearRoundedIcon, { color: "disabled" }, void 0) }), void 0) }, void 0), _jsxs("div", __assign({ style: { display: "inherit" } }, { children: [_jsx(IconButton, __assign({ size: "small", style: { color: theme.palette.primary.contrastText }, onClick: function () {
                                                triggerViewer();
                                                triggerDialog(true, event);
                                            } }, { children: _jsx(EditRoundedIcon, {}, void 0) }), void 0), !deleteConfirm && (_jsx(IconButton, __assign({ size: "small", style: { color: theme.palette.primary.contrastText }, onClick: function () { return setDeleteConfirm(true); } }, { children: _jsx(DeleteRoundedIcon, {}, void 0) }), void 0)), _jsx(Slide, __assign({ in: deleteConfirm, direction: direction === "rtl" ? "right" : "left", mountOnEnter: true, unmountOnExit: true }, { children: _jsxs("div", { children: [_jsx(Button, __assign({ style: { color: '#FFF' }, size: "small", onClick: handleConfirmDelete }, { children: "USU\u0143" }), void 0), _jsx(Button, __assign({ style: { color: '#FFF' }, size: "small", onClick: function () { return setDeleteConfirm(false); } }, { children: "ANULUJ" }), void 0)] }, void 0) }), void 0)] }), void 0)] }), void 0), viewerTitleComponent instanceof Function ? (viewerTitleComponent(event)) : (_jsx(Typography, __assign({ style: { padding: "5px 0" }, noWrap: true }, { children: event.title }), void 0))] }), void 0), _jsxs("div", __assign({ className: CSS.popper__p }, { children: [_jsxs(Typography, __assign({ style: { display: "flex", alignItems: "center" }, color: "#0E0B0B", variant: "caption", noWrap: true }, { children: [_jsx(EventNoteRoundedIcon, {}, void 0), " ", format(event.start, "dd MMMM yyyy hh:mm a", {
                                    locale: locale,
                                }) + " - " + format(event.end, "dd MMMM yyyy hh:mm a", {
                                    locale: locale,
                                })] }), void 0), hasResource.length > 0 && (_jsxs(Typography, __assign({ style: { display: "flex", alignItems: "center" }, color: "#0e0b0b", variant: "caption", noWrap: true }, { children: [_jsx(SupervisorAccountRoundedIcon, {}, void 0), "Wykonawca: ", hasResource
                                    .map(function (res) { return res[resourceFields.textField]; })
                                    .join(", ")] }), void 0)), viewerExtraComponent instanceof Function
                            ? viewerExtraComponent(fields, event)
                            : viewerExtraComponent] }), void 0)] }), void 0));
    };
    return (_jsxs(Fragment, { children: [_jsx(Paper, __assign({ style: {
                    width: "100%",
                    height: "100%",
                    display: "block",
                    background: event.disabled
                        ? "#d0d0d0"
                        : event.color || theme.palette.primary.main,
                    color: event.disabled
                        ? "#808080"
                        : theme.palette.primary.contrastText,
                    cursor: event.disabled ? "not-allowed" : "pointer",
                    overflow: "hidden",
                } }, { children: _jsx(ButtonBase, __assign({ onClick: function (e) {
                        e.stopPropagation();
                        triggerViewer(e.currentTarget);
                    }, disabled: event.disabled, style: {
                        width: "100%",
                        height: "100%",
                        display: "block",
                    } }, { children: _jsx("div", __assign({ style: {
                            height: "100%",
                        }, draggable: true, onDragStart: function (e) {
                            e.stopPropagation();
                            e.dataTransfer.setData("text/plain", "" + event.event_id);
                            e.currentTarget.style.backgroundColor = "theme.palette.error.main";
                        }, onDragEnd: function (e) {
                            e.currentTarget.style.backgroundColor =
                                event.color || theme.palette.primary.main;
                        }, onDragOver: function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                        }, onDragEnter: function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                        } }, { children: item }), void 0) }), void 0) }), void 0), _jsx(Popover, __assign({ open: Boolean(anchorEl), anchorEl: anchorEl, onClose: function (e) {
                    triggerViewer();
                }, anchorOrigin: {
                    vertical: "center",
                    horizontal: "center",
                }, transformOrigin: {
                    vertical: "top",
                    horizontal: "center",
                }, onClick: function (e) {
                    e.stopPropagation();
                } }, { children: renderViewer() }), void 0)] }, void 0));
};
EventItem.defaultProps = {
    multiday: false,
    showdate: true,
};
export default EventItem;
