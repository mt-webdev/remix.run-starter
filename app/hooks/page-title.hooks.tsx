// custom react hook usePageTitle
import { useEffect, useState } from "react";
import invariant from "tiny-invariant";

export const usePageTitle = (title: string) => {
  invariant(title, "title is required");
  const [pageTitle, setPageTitle] = useState(title);

  useEffect(() => {
    window.document.title = pageTitle;
  }, [pageTitle]);

  return [pageTitle, setPageTitle];
};
