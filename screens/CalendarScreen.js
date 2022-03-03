import { format } from "date-fns";
import React, { useContext, useState, useMemo } from "react";
import CalendarView from '../components/CalendarView';
import LogContext from "../contexts/LogContext";
import FeedList from "../components/FeedList";


function CalendarScreen() {
  const {logs} = useContext(LogContext);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd"),
  );

  const markedDates = useMemo(() => 
    logs.reduce((acc, current) => {
      console.log("reduce datas1");
      const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
      acc[formattedDate] = {marked: true};
      return acc;
    }, {}),
    [logs],
  );
  
  const filteredLogs = logs.filter(
		(log) => format(new Date(log.date), "yyyy-MM-dd") === selectedDate,
	);
  
  return (
    <FeedList
     logs={filteredLogs}
     ListHeaderComponent={
      <CalendarView 
        markedDates={markedDates} 
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate} />
    } />
  )
}

export default CalendarScreen;