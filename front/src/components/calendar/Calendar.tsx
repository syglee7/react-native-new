import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@/constants';
import DayOfWeeks from '@/components/calendar/DayOfWeeks.tsx';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {isSameAsCurrentDate, MonthYear} from '@/utils';
import DateBox from '@/components/calendar/DateBox.tsx';
import {ResponseCalendarPost} from '@/api';
import YearSelector from '@/components/calendar/YearSelector.tsx';
import useModal from '@/hooks/useModal.ts';

interface CalendarProps<T> {
  monthYear: MonthYear;
  onChangeMonth: (increment: number) => void;
  selectedDate: number;
  onPressDate: (date: number) => void;
  schedules: Record<number, T>;
}

function Calendar<T>({
  monthYear,
  onChangeMonth,
  selectedDate,
  onPressDate,
  schedules,
}: CalendarProps<T>) {
  const {month, year, lastDate, firstDOW} = monthYear;
  const yearSelector = useModal();

  const handleChangeYear = (selectYear: number) => {
    onChangeMonth((selectYear - year) * 12);
    yearSelector.hide();
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => onChangeMonth(-1)}
          style={styles.monthButtonContainer}>
          <Ionicons name="arrow-back" size={25} color={colors.BLACK} />
        </Pressable>
        <Pressable
          style={styles.monthYearContainer}
          onPress={yearSelector.show}>
          <Text style={styles.titleText}>
            {year}년 {month}월
          </Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={20}
            color={colors.GRAY_500}
          />
        </Pressable>
        <Pressable
          onPress={() => onChangeMonth(1)}
          style={styles.monthButtonContainer}>
          <Ionicons name="arrow-forward" size={25} color={colors.BLACK} />
        </Pressable>
      </View>
      <DayOfWeeks />
      <View style={styles.bodyContainer}>
        <FlatList
          data={Array.from({length: lastDate + firstDOW}, (_, i) => ({
            id: i,
            date: i - firstDOW + 1,
          }))}
          renderItem={({item}) => (
            <DateBox
              date={item.date}
              isToday={isSameAsCurrentDate(year, month, item.date)}
              hasSchedule={Boolean(schedules[item.date])}
              selectedDate={selectedDate}
              onPressDate={onPressDate}
            />
          )}
          keyExtractor={(item) => String(item.id)}
          numColumns={7}
        />
      </View>
      <YearSelector
        isVisible={yearSelector.isVisible}
        hide={yearSelector.hide}
        currentYear={year}
        onChangeYear={handleChangeYear}
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginVertical: 16,
  },
  bodyContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.GRAY_300,
    backgroundColor: colors.GRAY_100,
  },
  monthButtonContainer: {
    padding: 10,
  },
  monthYearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.BLACK,
  },
});

export default Calendar;
