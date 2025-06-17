import { DevUrl } from "../env/dev.url.model";

import { Notification } from "../Models/notification";

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
      `${DevUrl.baseUrl}/notifications/get_notifications/${userId}`
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
