import React, { useContext, useState } from "react";
import { format } from "date-fns";
import { Calendar } from "react-native-calendars";
import { StyleSheet } from "react-native";
import LogContext from "../contexts/LogContext";

function CalendarView({selectedDate, onSelectDate}) {

	const {logs} = useContext(LogContext);

  const markedDates = logs.reduce((acc, current) => {
    const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
    acc[formattedDate] = {marked: true};
    return acc;
  }, {});

	const markedSelectedDates = {
		...markedDates,
		[selectedDate]: {
			selected: true,
			marked: markedDates[selectedDate]?.marked,
		}
	}

	return (
		<Calendar 
			style={styles.calendar} 
			markedDates={markedSelectedDates}
			theme={{
				selectedDayBackgroundColor: '#009688',
				arrowColor: '#009688',
				dotColor: '#009688',
				todayTextColor: '#009688',
			}} 
			onDayPress={(day) => {
				onSelectDate(day.dateString)
			}} />
	);
}

const styles = StyleSheet.create({
	calendar: {
		borderBottomWidth: 1,
		borderBottomColor: '#e0e0e0',
	}
});

export default CalendarView;