import { useEffect, useState } from "react";
import Api from "../utils/Api";
import { formatChatTime } from "../utils/Time";

const LastSeen = ({ userId }) => {
  const [lastSeen, setLastSeen] = useState("");

  useEffect(() => {
    const fetchLastSeen = async () => {
      try {
        const res = await Api.get(`/lastseen/${userId}`);
        console.log(res.data);

        // Check if user is online
        if (res.data?.lastSeen === "Online") {
          setLastSeen("Online");
        } else {
          setLastSeen(formatChatTime(res.data?.lastSeen));
        }
      } catch (error) {
        console.error("Error fetching last seen:", error);
      }
    };

    if (userId) {
      fetchLastSeen();
    }
  }, [userId]);

  console.log(lastSeen);

  return (
    <p>
      {/* Render only "Online" if the user is online, otherwise render the last seen time */}
      {lastSeen === "Online" ? (
        <span style={{ color: "red" }}>Online</span>
      ) : (
        `Last seen: ${lastSeen || "Unknown"}`
      )}
    </p>
  );
};

export default LastSeen;
