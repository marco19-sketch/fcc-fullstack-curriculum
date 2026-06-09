import React from "react";
import useLiveAnnouncement from "./useLiveAnnouncement";

function TestLiveAnnouncement() {
  const { announce, LiveRegion } = useLiveAnnouncement();

  return (
    <div>
      <LiveRegion />

      <h1>Live Announcement Test</h1>

      <button onClick={() => announce("Button A pressed")}>Announce A</button>
      <button onClick={() => announce("Button B pressed")}>Announce B</button>
      <button
        onClick={() => announce("This is a longer message for screen readers")}>
        Announce Long Message
      </button>
    </div>
  );
}

export default TestLiveAnnouncement;
