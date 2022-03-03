import React, { useEffect, useRef } from "react";
import { createContext, useState } from "react";
import {v4 as uuidv4} from "uuid";
import logsStorage from "../storages/logsStorage";

const LogContext = createContext();

export function LogContextProvider({children}) {
  const initialLogsRef = useRef(null);
  const [logs, setLogs] = useState([]);

  const onCreate = ({title, body, date}) => {
    const log = {
      id: uuidv4(),
      title,
      body,
      date,
    }
    setLogs([log, ...logs]);
  };

  const onModify = (modified) => {
    const newLogs = logs.map((log) => 
      log.id === modified.id ? modified : log,
    );
    setLogs(newLogs);
  }

  const onRemove = (id) => {
    const newLogs = logs.filter((log) => log.id !== id);
    setLogs(newLogs);
  }

  useEffect(() => {
    (async () => {
      const savedLogs = await logsStorage.get();
      if (savedLogs) {
        initialLogsRef.current = savedLogs;
        setLogs(savedLogs);
      }
    })();
  }, [])

  useEffect(() => {
    if (logs === initialLogsRef.current) return;
    logsStorage.set(logs);
  }, [logs])

  return (
    <LogContext.Provider value={{logs, onCreate, onModify, onRemove}}>
      {children}
    </LogContext.Provider>
  );
}
 
export default LogContext;
