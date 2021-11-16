import { useState, useEffect } from "react";
export function useWindowResize() {
    var _a = useState({
        width: 0,
        height: 0,
    }), state = _a[0], setState = _a[1];
    useEffect(function () {
        var handler = function () {
            setState(function (state) {
                var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
                //Check state for change, return same state if no change happened to prevent rerender
                return state.width !== innerWidth || state.height !== innerHeight
                    ? {
                        width: innerWidth,
                        height: innerHeight,
                    }
                    : state;
            });
        };
        handler();
        window.addEventListener("resize", handler, {
            capture: false,
            passive: true,
        });
        return function () {
            window.removeEventListener("resize", handler);
        };
    }, []);
    return state;
}
