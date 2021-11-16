import { ReactChild } from "react";
import { DefaultRecourse } from "../../types";
interface WithResourcesProps {
    span?: number;
    renderChildren(resource: DefaultRecourse): ReactChild;
}
declare const WithResources: {
    ({ span, renderChildren }: WithResourcesProps): JSX.Element;
    defaultProps: {
        span: number;
    };
};
export { WithResources };
