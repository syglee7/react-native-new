import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {colors} from '@/constants';
import Calendar from '@/components/calendar/Calendar.tsx';
import {getMonthYearDetails, getNewMonthYear} from '@/utils';
import useGetCalendarPosts from '@/hooks/queries/useGetCalendarPosts.ts';
import EventList from '@/components/calendar/EventList.tsx';

function CalendarHomeScreen() {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState(0);
  const {
    data: posts,
    isPending,
    isError,
  } = useGetCalendarPosts(monthYear.year, monthYear.month);

  const moveToToday = () => {
    setSelectedDate(new Date().getDate());
    setMonthYear(getMonthYearDetails(new Date()));
  };

  useEffect(() => {
    moveToToday();
  }, []);

  if (isPending || isError) {
    return <></>;
  }

  const handleUpdateMonth = (increment: number) => {
    setMonthYear((prev) => getNewMonthYear(prev, increment));
  };

  const handlePressDate = (date: number) => {
    setSelectedDate(date);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        monthYear={monthYear}
        schedules={posts}
        onChangeMonth={handleUpdateMonth}
        onPressDate={handlePressDate}
        selectedDate={selectedDate}
        moveToToday={moveToToday}
      />
      <EventList posts={posts[selectedDate]} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default CalendarHomeScreen;
