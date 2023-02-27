import { b as getFetchCacheOptions, i as getQueryIndex, n as parseCSVArray, k as removeTitleSuffix, u as isUrlOrPath, v as getPathName } from './scripts.js';

const locale = 'en-GB';
const timeOptions = { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' };
const dateFullOptions = { dateStyle: 'full' };

/**
 * Format date in full format.
 * Example: Monday, 27 September 2021
 * @param {Date} date Date value
 * @returns {string} Formatted date
 */
function formatDateFull(date) {
  return date.toLocaleDateString(locale, dateFullOptions);
}

/**
 * Format time.
 * Example: 10:30.
 * @param {Date} date Date/time value
 * @returns {string} Formatted time
 */
function formatTime(date) {
  return date.toLocaleTimeString(locale, timeOptions);
}

/**
 * Converts a number counting days since 1/1/1900 as used in Excel/Google Sheets to a date value.
 * @param {float} value Float date value from Excel/Google Sheets
 * @returns {Date} Date value
 */
function convertSheetDateValue(value) {
  const date = new Date(0);
  date.setUTCMilliseconds(Math.round((value - 25569) * 86400 * 1000));
  return date;
}

/**
 * Describes a schedule day.
 */
class ScheduleDay {
  /** @type {number} Day number */
  day;

  /** @type {Date} Start time */
  start;

  /** @type {Date} End time */
  end;

  /**
   * @typedef {import('./ScheduleEntry').default} ScheduleEntry
   * @type {ScheduleEntry[]} Schedule entries
   */
  entries;
}

/**
 * Describes a schedule entry.
 */
class ScheduleEntry {
  /** @type {number} Day number */
  day;

  /** @type {number} Track number */
  track;

  /** @type {Date} Start time */
  start;

  /** @type {Date} End time */
  end;

  /** @type {string} Talk/Entry title */
  title;

  /** @type {number} Duration of talk (without FAQ) in minutes */
  duration;

  /** @type {number} Duration of FAQ in minutes */
  durationFAQ;

  /** @type {string} Entry type: talk, break, other */
  type;

  /** @type {string[]} Speaker names */
  speakers;

  /** @type {string} Path to talk detail page */
  talkPath;
}

const validEntryTypes = ['day', 'talk', 'break', 'other'];

/**
 * Calculate scheduling data bases on yearly schedule-data.json and query-index.json.
 */
class ScheduleData {
  /** @type {ScheduleDay[]} */
  days;

  /**
   * @param {ScheduleDay[]} days Schedule days
   */
  constructor(days) {
    this.days = days;
  }

  /**
   * @returns {ScheduleDay[]} All days described in schedule
   */
  getDays() {
    return this.days;
  }

  /**
   * @param {string} path Path to talk detail page
   * @returns {ScheduleEntry}
   */
  getTalkEntry(path) {
    return this.days.flatMap((day) => day.entries)
      .find((entry) => entry.talkPath === path);
  }
}

/**
 * Resolve talk detail reference to query index item.
 * @typedef {import('./QueryIndex').default} QueryIndex
 * @typedef {import('./QueryIndexItem').default} QueryIndexItem
 * @param {string} talkDetailRef Title from schedule sheet which should point to a talk detail page.
 *   This may be only a document name
 * @param {number} year Current year
 * @param {QueryIndex} queryIndex
 * @returns {QueryIndexItem} Query index item or undefined
 */
function getTalkQueryIndexItem(talkDetailRef, year, queryIndex) {
  let path;
  if (isUrlOrPath(talkDetailRef)) {
    path = getPathName(talkDetailRef);
  } else {
    path = `/${year}/schedule/${talkDetailRef}`;
  }
  return queryIndex.getItem(path);
}

/**
 * Transforms schedule data item to schedule entry.
 * @typedef {import('./QueryIndex').default} QueryIndex
 * @param {object} item
 * @param {QueryIndex} queryIndex
 * @returns {ScheduleEntry}
 */
function toEntry(item, queryIndex) {
  const day = parseInt(item.Day, 10) || 0;
  const track = parseInt(item.Track, 10) || 0;
  const startTime = parseFloat(item.Start) || 0;
  const endTime = parseFloat(item.End) || 0;
  let title = item.Entry;
  const duration = parseInt(item.Duration, 10) || 0;
  const durationFAQ = parseInt(item.FAQ, 10) || 0;
  const type = item.Type;
  let speakers = parseCSVArray(item.Speakers);

  // validate entry
  if (day === 0 || startTime === 0 || endTime === 0 || !title || duration === 0
    || !validEntryTypes.includes(type)) {
    return undefined;
  }

  // convert dates
  const start = convertSheetDateValue(startTime);
  const end = convertSheetDateValue(endTime);

  // resolve talk path and title, speakers from query index
  let talkPath;
  if (type === 'talk') {
    const indexItem = getTalkQueryIndexItem(title, start.getFullYear(), queryIndex);
    if (!indexItem) {
      return undefined;
    }
    talkPath = indexItem.path;
    title = removeTitleSuffix(indexItem.title);
    if (speakers.length === 0) {
      speakers = indexItem.getSpeakers();
    }
  }

  return Object.assign(new ScheduleEntry(), {
    day,
    track,
    start,
    end,
    title,
    duration,
    durationFAQ,
    type,
    speakers,
    talkPath,
  });
}

/**
 * Transforms schedule data to days and entries.
 * @typedef {import('./QueryIndex').default} QueryIndex
 * @param {object[]} scheduleData
 * @param {QueryIndex} queryIndex
 * @returns {ScheduleDay[]}
 */
function toDays(scheduleData, queryIndex) {
  // transform and collect entries per day (ignore 'day' entries)
  const entriesPerDay = new Map();
  scheduleData.forEach((item) => {
    const entry = toEntry(item, queryIndex);
    if (entry && entry.type !== 'day') {
      let entries = entriesPerDay.get(entry.day);
      if (!entries) {
        entries = [];
        entriesPerDay.set(entry.day, entries);
      }
      entries.push(entry);
    }
  });

  // build day objects
  return Array.from(entriesPerDay.values())
    .map((entries) => Object.assign(new ScheduleDay(), {
      day: entries[0].day,
      start: entries.reduce((min, e) => (e.start < min ? e.start : min), entries[0].start),
      end: entries.reduce((max, e) => (e.end > max ? e.end : max), entries[0].start),
      entries,
    }));
}

/**
 * @param {string} scheduleDataUrl Url to schedule-data.json
 */
async function getScheduleData(scheduleDataUrl) {
  let scheduleData;
  const resp = await fetch(scheduleDataUrl, getFetchCacheOptions());
  if (resp.ok) {
    const json = await resp.json();
    scheduleData = json.data;
  }
  const queryIndex = await getQueryIndex();
  const days = toDays(scheduleData || [], queryIndex);
  return new ScheduleData(days);
}

export { formatTime as a, formatDateFull as f, getScheduleData as g };
