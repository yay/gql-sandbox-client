import React, { useState, useRef, useEffect } from 'react';

// The `useEffect` hook can be used to perform side effects in function components,
// such as data fetching, subscriptions, or manually changing the DOM.
// It can also be used to clean up these side effects when the component unmounts.

export default function EffectComponent() {
  const [value, setValue] = useState();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    fetch('https://api.github.com/users/yay')
      .then((res) => res.json())
      .then((data) => setValue(data));

    const audio = audioRef.current;
    audio?.play();

    return () => {
      // Pausing on unmount results in the following error (but in <React.StrictMode> only):
      // Uncaught (in promise) AbortError: The play() request was interrupted by a call to pause().
      audio?.pause();
    };
  }, []);

  return (
    <div>
      <audio controls ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
      <pre>{JSON.stringify(value, null, 4)}</pre>
    </div>
  );
}
