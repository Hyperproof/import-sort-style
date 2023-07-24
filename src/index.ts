import { IStyleAPI, IStyleItem } from 'import-sort-style';

const alpha = (first: string, second: string) => {
  return first.localeCompare(second, 'en');
};

export default function (styleApi: IStyleAPI): Array<IStyleItem> {
  const {
    and,
    hasNamespaceMember,
    hasNoMember,
    isAbsoluteModule,
    isRelativeModule,
    moduleName,
    name,
    startsWith,
    naturally,
  } = styleApi;
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
