import { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default function VideoPlayer({ url, offset, onReady }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(
        videoElement,
        {
          controls: true,
          fluid: true,
          sources: [{ src: url, type: "application/x-mpegURL" }],
          autoplay: false,
          muted: true,
          controlBar: {
            volumePanel: { inline: false },
            playbackRateMenuButton: true,
            fullscreenToggle: true,
          },
        },
        () => {
          onReady && onReady(player);
        }
      ));

      // Handle errors
      player.on("error", () => {
        videojs.log("Error:", player.error());
        player.muted(true);
        player.play();
      });

      player.on("loadeddata", () => {
        if (offset >= 0) {
          player.currentTime(offset); // Set offset when data is loaded
          // videojs.log("Set offset to:", offset);
        }
        player.play().catch((err) => {
          videojs.log("Play failed:", err);
        });
      });

      player.on("playing", () => {
        if (offset >= 0 && Math.abs(player.currentTime() - offset) > 1) {
          player.currentTime(offset);
          // videojs.log("Re-enforced offset:", offset);
        }
      });
    } else {
      const player = playerRef.current;
      player.src({ src: url, type: "application/x-mpegURL" });
      player.muted(true);
      if (offset >= 0) player.currentTime(offset);
      player.play().catch((err) => {
        videojs.log("Update play failed:", err);
      });
    }
  }, [url, offset, onReady]);

  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <div ref={videoRef} className="max-w-[70vw] mx-auto my-10" />
    </div>
  );
}
