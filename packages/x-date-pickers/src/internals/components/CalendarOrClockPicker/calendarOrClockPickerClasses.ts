import { generateUtilityClass, generateUtilityClasses } from '@mui/material';

export interface CalendarOrClockPickerClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the mobile keyboard input view element. */
  mobileKeyboardInputView: string;
}

export type CalendarOrClockPickerClassKey = keyof CalendarOrClockPickerClasses;

export function getCalendarOrClockPickerUtilityClass(slot: string) {
  return generateUtilityClass('MuiCalendarOrClockPicker', slot);
}

export const calendarOrClockPickerClasses = generateUtilityClasses('MuiCalendarOrClockPicker', [
  'root',
  'mobileKeyboardInputView',
]);
