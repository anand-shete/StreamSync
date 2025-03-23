import api from "@/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { setVideos } from "@/features/videoSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LiveRing from "@/components/sections/LiveRing";
import { useNavigate } from "react-router";

export default function Video() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const videos = useSelector((state) => state.video);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const videos = await api.get("/videos");
        dispatch(setVideos(videos.data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="max-w-screen flex flex-col justify-center">
      <h1 className="m-auto text-4xl my-10 font-semibold hover:scale-110">
        Welcome, {user.name}!
      </h1>
      <div className="min-h-screen max-w-screen grid grid-cols-3 gap-20 mx-10 ">
        {videos.map((video) => (
          <Card
            key={video._id}
            className="h-fit rounded-xl hover:scale-110 hover:shadow-custom hover:shadow-white transition-all cursor-pointer"
            onClick={() => navigate(`/stream/${video.videoId}`)}
          >
            <CardHeader>
              <img src={video.imageUrl} alt="" />
              <CardTitle className="text-2xl">{video.title}</CardTitle>
              <CardDescription>
                Duration: {Math.floor(video.duration)} sec
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <LiveRing />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
