import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

export default function Home() {
  return (
    <div className="relative min-h-screen max-w-screen bg-[url('/bg.jpg')] bg-fixed bg-cover bg-center">
      <div className="absolute inset-0 min-h-screen max-w-screen opacity-60 bg-black"></div>
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center space-y-10">
        <h1 className="text-5xl text-white font-bold">
          Seamless Streaming, Perfectly Synced
        </h1>
        <p className="text-xl text-white mt-4">
          Join the stream at any moment and instantly sync with the global
          timeline. <br /> No buffering, no delays—just uninterrupted playback.
        </p>
        <NavLink to="/signup">
          <Button className="px-5 py-3 text-white hover:scale-110  bg-blue-500 border rounded-xl mt-6 text-lg font-semibold">
            Get Started
          </Button>
        </NavLink>
      </div>
    </div>
  );
}
