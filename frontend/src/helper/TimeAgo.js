import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en);

// Specify the timezone (optional)
const timeZone = 'UTC'; // Replace 'UTC' with the appropriate timezone if needed

// Define the function to format the time ago
function getTimeAgo(date) {
  const timeAgo = new TimeAgo('en-US', { timeZone }); // Pass the locale and timezone
  return timeAgo.format(date, 'round');
}


export default getTimeAgo;