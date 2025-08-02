"use client";

import { useState } from "react";

type ControlButtonProps = {
  control_id: number;
  control_name: string;
};

export default function ControlButton({
  controlButtonProps: { control_id, control_name },
}: {
  controlButtonProps: ControlButtonProps;
}) {
  const [isActive, setIsActive] = useState(false);
  const [eventId, setEventId] = useState<number | null>(null);

  const handleClick = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/control-click", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ control_id }),
      });

      const data = await res.json();

      if (data.success) {
        setEventId(data.event_id);
        setIsActive(true);

        setTimeout(() => {
          setIsActive(false);
          setEventId(null);
        }, 5000);
      } else {
        console.log("Неуспешно натискане на контрола", data);
      }
    } catch (err) {
      console.log("Грешка при натискане на контрола:", err);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`py-2 px-4 rounded-md text-white transition ${
        isActive ? "bg-green-600" : "bg-amber-700 hover:bg-amber-500"
      }`}
    >
      {control_name}
      {eventId && ` (#${eventId})`}
    </button>
  );
}
