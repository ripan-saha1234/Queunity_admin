import { useContext, useEffect } from "react";
import { globalContext } from "../context/context";

function usePageHeader({
  title = "",
  breadcrumbs = [],
  buttons = [],
  subTitle = {},
}) {
  const { setPageTitle, setBreadcrums, setButtonList, setSubTitle } =
    useContext(globalContext);

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
  }, [
    title,
    breadcrumbs,
    buttons,
    subTitle,
    setPageTitle,
    setBreadcrums,
    setButtonList,
    setSubTitle,
  ]);
}

export default usePageHeader;

