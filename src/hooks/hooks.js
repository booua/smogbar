import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
const { ipcRenderer } = window.require("electron");

export const useCachedData = (
  query,
  dataType,
  graphqlVariables,
  dependencies
) => {

  const [isDataCached, setIsDataCached] = useState(false);
  const [cacheData, setCacheData] = useState(null);

  useEffect(() => {
    let cachedData = ipcRenderer.sendSync("checkForCachedData", dataType);
    if (cachedData && cachedData !== "noData") {
      setCacheData(cachedData);
      setIsDataCached(true);
    } else {
      setIsDataCached(false);
    }
  }, dependencies);

  const { loading, error, data } = useQuery(query, {
    variables: graphqlVariables,
    skip: isDataCached,
  });

  if (!isDataCached && data) {
    let cacheObj = { timestamp: Date.now(), dataType: dataType , ...data };
    let cacheMessage = ipcRenderer.sendSync("cacheData", cacheObj);
    if (cacheMessage === "savedCache") {
      setIsDataCached(true);
    }
    setCacheData(data);
  }

  return [loading, error, cacheData];
};
