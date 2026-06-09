import { useState } from "react";

export default function useLiveAnnouncement() {
  const [message, setMessage] = useState("");

  const announce = text => {
    // Clear first to re-trigger same text
    setMessage("");
    setTimeout(() => {
      setMessage(text);
    }, 1000);
  };
  

  const LiveRegion = () => (
    <div
      aria-live="assertive"
      // aria-live="polite"
      // aria-atomic="false"
      aria-atomic="true"
      role="status"
      className="sr-only"
      style={{ position: "absolute", left: "99px" }} // for testing without CSS
    >
      {message}
    </div>
  );

  return { announce, LiveRegion };
}
