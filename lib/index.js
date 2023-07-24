"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alpha = (first, second) => {
    return first.localeCompare(second, 'en');
};
function default_1(styleApi) {
    const { and, hasNamespaceMember, hasNoMember, isAbsoluteModule, isRelativeModule, moduleName, name, startsWith, naturally, } = styleApi;
    return [
        // import "any"
        {
            match: hasNoMember,
            sort: moduleName(naturally)
        },
        // import * as any from "any";
        {
            match: hasNamespaceMember,
            sort: moduleName(naturally)
        },
        // import * as any from "./any";
        {
            match: and(isRelativeModule, moduleName(startsWith('./'))),
            sort: moduleName(naturally),
            sortNamedMembers: name(alpha)
        },
        { separator: true },
        // import any from "any";
        {
            match: isAbsoluteModule,
            sort: moduleName(naturally),
            sortNamedMembers: name(alpha)
        },
        { separator: true },
        // import any from "../any";
        {
            match: and(isRelativeModule, moduleName(startsWith('../'))),
            sort: moduleName(naturally),
            sortNamedMembers: name(alpha)
        },
        { separator: true }
    ];
}
exports.default = default_1;
