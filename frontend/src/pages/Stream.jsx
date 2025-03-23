import { useState, useEffect } from "react";
import VideoPlayer from "@/components/sections/VideoPlayer";
import { useParams } from "react-router";
import api from "@/api";
import { useDispatch } from "react-redux";
import { motion } from "motion/react";
import { setUser } from "@/features/userSlice";
import LiveRing from "@/components/sections/LiveRing";

export default function StreamSyncPlayer() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [streamData, setStreamData] = useState({
    url: "",
    offset: 0,
    title: "",
  });
  const [liveEnded, setLiveEnded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/stream/${id}`);
        const user = await api.get("/auth");
        dispatch(setUser(user.data));
        if (res.data.message == "Live stream ended") setLiveEnded(true);

        setStreamData({
          url: res.data.videoUrl,
          offset: res.data.offset,
          title: res.data.title,
        });
      } catch (error) {
        console.log(error.response.data);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen max-w-screen">
      {!liveEnded && streamData.url ? (
        <>
          <div className="ml-55 mt-20">
            <LiveRing />
          </div>
          <VideoPlayer
            url={streamData.url}
            offset={streamData.offset}
            onReady={() => console.log("Player ready")}
          />
          <p className="text-center my-10">
            Elapsed time: {streamData.offset} seconds
          </p>
        </>
      ) : (
        <div className="min-h-screen max-w-screen flex flex-row justify-center items-center">
          <motion.div
            className="px-3 py-2 rounded-full bg-red-600"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <p>Live Stream Ended</p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
