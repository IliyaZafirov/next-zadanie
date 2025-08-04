"use client";

import { useEffect } from "react";

export default function ListsEventsLog() {
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/view-events-list-event`,
      {
        method: "POST",
        credentials: "include",
      }
    ).catch((err) => console.log(err));
  }, []);

  return null;
}
