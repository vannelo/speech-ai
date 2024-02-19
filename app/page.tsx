"use client";
import { useState } from "react";

export default function Home() {
  const [speech, setSpeech] = useState("");
  const [audio, setAudio] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleCreateSpeech = async () => {
    setLoading(true);
    const response = await fetch(
      "https://speech-ai-pi.vercel.app/api/speech/create",
      {
        method: "POST",
        body: JSON.stringify({
          speech,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const audioUrl = await response.text();
    const status = response.status;

    if (status === 200) {
      setAudio(audioUrl);
      setSuccess(true);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-2">
      <div className="min-h-screen relative flex justify-center items-center flex-col place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>
      <div className="absolute px-4 text-center">
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h1 className="text-3xl font-bold ">Vannelo Speech Creator</h1>
          <h2 className="text-xl">
            Create your own speech with the help of AI. Just type in your speech
            and let the AI do the rest.
          </h2>
          <div className="flex flex-col my-4 w-6/12 text-center">
            {!success && !error && (
              <>
                <input
                  type="text"
                  placeholder="Enter text here"
                  value={speech}
                  onChange={(e) => setSpeech(e.target.value)}
                  className="p-2 bg-black bg-opacity-50 text-center border-2 border-white mb-4 w-full"
                />
                <button
                  className={`bg-white p-2 text-black font-bold ${
                    (!speech || loading) && "opacity-50"
                  }`}
                  onClick={handleCreateSpeech}
                  disabled={!speech || loading}
                >
                  {loading ? "Creating..." : "Create Speech"}
                </button>
              </>
            )}
            {success && (
              <>
                <h3>
                  Success! Your speech has been created. Listen to it below
                </h3>
                <audio
                  src={audio}
                  controls
                  className="my-4 
                w-full"
                />
              </>
            )}
            {error && <h3>There was an error creating your speech.</h3>}
          </div>
        </div>
      </div>
    </main>
  );
}
