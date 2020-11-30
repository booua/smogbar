import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
const { ipcRenderer } = window.require("electron");

export const useCachedData = (
  query,
  dataType,
  graphqlVariables,
  dependencies = []
) => {
  const [isDataCached, setIsDataCached] = useState(false);
  const [cacheData, setCacheData] = useState(null);
  let isRefreshing = dependencies[0];

  useEffect(() => {
    let cachedData =
      ipcRenderer && ipcRenderer.sendSync("checkForCachedData", dataType);
    if (cachedData && cachedData !== "noData") {
      setCacheData(cachedData);
      setIsDataCached(true);
    } else {
      setIsDataCached(false);
    }
  }, dependencies);

  const { loading, error, data, refetch } = useQuery(query, {
    variables: graphqlVariables,
    skip: isDataCached,
  });

  useEffect(() => {
    if (isRefreshing) {
      let clearCacheMsg = ipcRenderer && ipcRenderer.sendSync("clearCache");
      if (clearCacheMsg === "clearedCache") {
        refetch();
        let refreshedData = {
          timestamp: Date.now(),
          dataType: dataType,
          ...data,
        };
        setCacheData(refreshedData);
      }
    }
  }, [isRefreshing]);

  if (!isDataCached && data) {
    let cacheObj = { timestamp: Date.now(), dataType: dataType, ...data };
    let cacheMessage =
      ipcRenderer && ipcRenderer.sendSync("cacheData", cacheObj);
    if (cacheMessage === "savedCache") {
      setIsDataCached(true);
    }
    setCacheData(data);
  }

  let indexes =
    cacheData &&
    cacheData.nearestMeasurement &&
    cacheData.nearestMeasurement.current &&
    cacheData.nearestMeasurement.current.indexes &&
    cacheData.nearestMeasurement.current.indexes[0];
  let caqiValue = indexes && indexes.value;
  ipcRenderer && ipcRenderer.sendSync("setIcon", caqiValue);

  return [loading, error, cacheData];
};
