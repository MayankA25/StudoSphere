import { google } from "googleapis";
import dotenv from "dotenv"

dotenv.config({ path: "D:\\Mayank Data\\CODING\\CodeFest'25\\server\\.env" })

export const createCalenderInvite = async (credentials, recipients, todo) => {
  const OAuth2Client = new google.auth.OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    "http://localhost:5173/dashboard"
  );

  console.log(credentials.accessToken, credentials.refreshToken);

  OAuth2Client.setCredentials({
    access_token: credentials.accessToken,
    refresh_token: credentials.refreshToken,
  });

  const calendar = google.calendar({ version: "v3", auth: OAuth2Client });

  const event = {
    summary: todo.title,
    description: todo.description,
    start: {
      dateTime: todo.startDate,
    },
    end: {
      dateTime: todo.deadline.toISOString(),
    },
    attendees: recipients
  };

  await calendar.events.insert({
    calendarId: "primary",
    requestBody: event,
    sendUpdates: "all"
  });
  console.log("Added In Google Calendar...")
};
