import { useContext, useEffect } from "react";
import { globalContext } from "../context/context";

// Stable references for omitted props. Without these, a page that does not pass
// `buttons`/`subTitle` would get a brand-new array/object on every render, which
// makes the effect below re-run constantly and flood the router-wrapping global
// context with setState calls (starving react-router v7 navigation transitions).
const EMPTY_BUTTONS = [];
const EMPTY_SUBTITLE = {};

function usePageHeader({
  title = "",
  breadcrumbs = [],
  buttons = EMPTY_BUTTONS,
  subTitle = EMPTY_SUBTITLE,
}) {
  const { setPageTitle, setBreadcrums, setButtonList, setSubTitle } =
    useContext(globalContext);

  // Stable signature for the serializable header content. Callers frequently
  // pass fresh array/object literals (and `subTitle` defaults to a new `{}` on
  // every call), which previously made this effect run on EVERY render and
  // push a steady stream of high-priority setState calls into the global
  // context. Under react-router v7 (navigations run inside startTransition)
  // that churn starves/interrupts the navigation render, so the URL changes
  // but the new page never commits until a manual refresh. Keying the effect
  // on the actual content keeps the global header in sync without the churn.
  const signature = JSON.stringify({ title, breadcrumbs, subTitle });

  useEffect(() => {
    setPageTitle(title);
    setBreadcrums(breadcrumbs);
    setButtonList(buttons);
    setSubTitle(subTitle);

    // Reset only page-level header data when page unmounts.
    return () => {
      setPageTitle("");
      setBreadcrums([]);
      setButtonList([]);
      setSubTitle({});
    };
    // `buttons` can hold callbacks (not serializable) so it is tracked by
    // identity; callers memoize it. Everything else is covered by `signature`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, buttons]);
}

export default usePageHeader;

