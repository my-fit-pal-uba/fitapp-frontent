import { DevUrl } from "../env/dev.url.model";

import { Notification } from "../Models/notification";
import { getToken } from "../Models/token";

export async function postNotification(
  newNotification: Notification,
  userId: number
) {
  try {
    const response = await fetch(
      `${DevUrl.baseUrl}/notifications/post_notification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: newNotification.description,
          date: newNotification.date.toISOString(),
          user_id: userId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return true;
  } catch (error) {}
}

export async function getNotifications(userId: number) {
  try {
    const response = await fetch(
      `${DevUrl.baseUrl}/notifications/get_notification?user_id=${userId}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    if (!data.response) {
      return [];
    }

    return data.message;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
}

export async function markAllAsRead(notifications: Notification[]) {
  const token = getToken();

  console.table(notifications);
  if (!token) {
    console.error("No token found, cannot mark notifications as read.");
    return false;
  }

  try {
    let results: boolean[] = []; 
    notifications.forEach(async (notification) => {
      let result: boolean = await markAssRead(notification, token.email);
      results.push(result);
    })
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    return false;
  }
}

export async function markAssRead(notification: Notification, user_email: string) {
  try {
    const response = await fetch(
      `${DevUrl.baseUrl}/notifications/send_email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notification_id: notification.id,
          user_email: "jcastrom@fi.uba.ar",
        }),
      }
    );
    const data = await response.json();
    if (!data.response) {
      console.error("Failed to mark notification as read:", data.message);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    return false;
  }
}
