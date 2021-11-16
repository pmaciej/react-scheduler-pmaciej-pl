import { useContext } from "react";
import { StateContext } from "../context/state/stateContext";
var useAppState = function () {
    var state = useContext(StateContext);
    return state;
};
export { useAppState };
