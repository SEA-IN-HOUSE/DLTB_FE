//@ts-nocheck
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { PickersShortcutsItem } from '@mui/x-date-pickers/PickersShortcuts';
import { DateRange } from '@mui/x-date-pickers-pro';
import '../styles/RemoveProWaterMark.css'
const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = [
  {
    label: 'This Week',
    getValue: () => {
      const today = dayjs();
      return [today.startOf('week'), today.endOf('week')];
    },
  },
  {
    label: 'Last Week',
    getValue: () => {
      const today = dayjs();
      const prevWeek = today.subtract(7, 'day');
      return [prevWeek.startOf('week'), prevWeek.endOf('week')];
    },
  },
  {
    label: 'Last 7 Days',
    getValue: () => {
      const today = dayjs();
      return [today.subtract(7, 'day'), today];
    },
  },
  {
    label: 'Last Month',
    getValue: () => {
      const today = dayjs();
      const prevMonth = today.subtract(1, 'month');
      return [prevMonth.startOf('month'), prevMonth.endOf('month')];
    },
  },
  {
    label: 'Current Month',
    getValue: () => {
      const today = dayjs();
      return [today.startOf('month'), today.endOf('month')];
    },
  },
  {
    label: 'This Year',
    getValue: () => {
      const today = dayjs();
      return [today.startOf('year'), today.endOf('year')];
    },
  },
  {
    label: 'Last Year',
    getValue: () => {
      const today = dayjs();
      const prevYear = today.subtract(1, 'year');
      return [prevYear.startOf('year'), prevYear.endOf('year')];
    },
  },
  { label: 'Reset', getValue: () => [null, null] },
];

  
export default function BasicRangeShortcuts(props :any) {
    const { fromDate, setFromDate, toDate, setToDate } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDateRangePicker
        slotProps={{
          shortcuts: {
            items: shortcutsItems,
          },
          actionBar: { actions: [] },
        }}
        calendars={2}
        value={[fromDate, toDate]}
        onChange={(newValue) => {
          setFromDate(newValue[0]);
          setToDate(newValue[1]);
        }}
      />
    </LocalizationProvider>
  );
}