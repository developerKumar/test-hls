import { useState, useEffect } from "react";
// import Hls from "hls.js/src/hls.ts";

function App() {
  const [url, setUrl] = useState(
    "https://content.jwplatform.com/manifests/vM7nH0Kl.m3u8"
  );
  const handleChange = (e) => {
    setUrl(e.target.value);
    loadHlsUrl(e.target.value);
  };
  useEffect(() => {
    loadHlsUrl();
  }, []);
  const loadHlsUrl = (link) => {
    const Hls = window.Hls;
    if (Hls.isSupported()) {
      var video = document.getElementById("video");
      var hls = new Hls({
        debug: true,
      });
      hls.loadSource(link ? link : url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, function () {
        video.muted = false;
        video.play();
      });
    }
    // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
    // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
    // This is using the built-in support of the plain video element, without using hls.js.
    else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      video.addEventListener("canplay", function () {
        video.play();
      });
    }
  };
  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter URL here"
        value={url}
        onChange={handleChange}
      />
      <video height="600" id="video" controls>
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default App;
