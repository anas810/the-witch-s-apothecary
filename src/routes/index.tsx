import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, ChevronLeft, LockKeyhole, Volume2, VolumeX } from "lucide-react";

import { Button } from "@/components/ui/button";
import apothecaryRoom from "@/assets/apothecary-room.jpg";
import witchCover from "@/assets/the-witch-cover-cutout.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Witch — Enter the Apothecary" },
      {
        name: "description",
        content: "A dark-fantasy apothecary awaits. Open The Witch to discover what lies within.",
      },
      { property: "og:title", content: "The Witch — Enter the Apothecary" },
      {
        property: "og:description",
        content: "Open the floating grimoire and enter a dark-fantasy apothecary.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=IM+Fell+English:ital@0;1&display=swap",
      },
    ],
  }),
  component: Apothecary,
});

function Apothecary() {
  const [bookOpen, setBookOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const bubbleTimer = useRef<number | null>(null);
  const bookButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    return () => {
      if (bubbleTimer.current !== null) window.clearInterval(bubbleTimer.current);
      void audioContext.current?.close();
    };
  }, []);

  useEffect(() => {
    if (bookOpen) closeButtonRef.current?.focus();
    else bookButtonRef.current?.focus();
  }, [bookOpen]);

  const getAudioContext = () => {
    if (!audioContext.current) {
      const Context = window.AudioContext;
      if (Context) audioContext.current = new Context();
    }
    return audioContext.current;
  };

  const bubble = () => {
    const context = getAudioContext();
    if (!context) return;
    if (context.state === "suspended") void context.resume();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(105 + Math.random() * 85, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(48, context.currentTime + 0.24);
    filter.type = "lowpass";
    filter.frequency.value = 260;
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.2, context.currentTime + 0.055);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.32);
    oscillator.connect(filter).connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.34);
  };

  const paperRustle = () => {
    const context = getAudioContext();
    if (!context) return;
    if (context.state === "suspended") void context.resume();
    const buffer = context.createBuffer(1, Math.floor(context.sampleRate * 0.38), context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < data.length; index += 1) {
      data[index] = (Math.random() * 2 - 1) * (1 - index / data.length);
    }
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    source.buffer = buffer;
    filter.type = "bandpass";
    filter.frequency.value = 1200;
    filter.Q.value = 0.7;
    gain.gain.value = 0.2;
    source.connect(filter).connect(gain).connect(context.destination);
    source.start();
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    if (next) {
      bubble();
      bubbleTimer.current = window.setInterval(bubble, 1500);
    } else if (bubbleTimer.current !== null) {
      window.clearInterval(bubbleTimer.current);
      bubbleTimer.current = null;
    }
  };

  const openBook = () => {
    if (!bookOpen) {
      if (soundOn) paperRustle();
      setBookOpen(true);
    }
  };

  return (
    <main className={`apothecary ${bookOpen ? "is-open" : ""}`}>
      <div className="room-backdrop" style={{ backgroundImage: `url(${apothecaryRoom})` }} />
      <div className="room-shade" />

      <header className="topline" aria-label="The Witch">
        <a className="wordmark" href="#top" onClick={(event) => event.preventDefault()}>
          <span className="wordmark-sigil" aria-hidden="true">✳</span>
          <span>THE WITCH</span>
        </a>
        <Button
          variant="ghost"
          size="icon"
          className="sound-toggle"
          type="button"
          aria-label={soundOn ? "Mute ambient sounds" : "Play ambient sounds"}
          aria-pressed={soundOn}
          onClick={toggleSound}
          title={soundOn ? "Mute ambient sounds" : "Play ambient sounds"}
        >
          {soundOn ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
        </Button>
      </header>

      <section className="apothecary-stage" aria-label="The Witch apothecary">
        <div className="stage-caption">
          <span className="eyebrow">A tale from the shadows</span>
          <h1>The Witch</h1>
          <p>Some doors are best left unopened.</p>
        </div>

        <div className="floating-book-wrap">
          <Button
            variant="ghost"
            type="button"
            className="floating-book"
            aria-label="Open The Witch book"
            ref={bookButtonRef}
            onClick={openBook}
          >
            <img src={witchCover} alt="The Witch by Freida McFadden, illustrated book cover" />
          </Button>
          <Button variant="ghost" className="open-prompt" type="button" onClick={openBook}>
            <span>Click here<br />to download</span>
            <ArrowUpRight aria-hidden="true" />
          </Button>
          <span className="book-spark spark-one" aria-hidden="true">✦</span>
          <span className="book-spark spark-two" aria-hidden="true">·</span>
          <span className="book-spark spark-three" aria-hidden="true">✧</span>
        </div>

        <div className="scene-vignette" />
      </section>

      <section
        className="book-spread"
        aria-label="How to unlock The Witch"
        aria-hidden={!bookOpen}
        inert={!bookOpen}
      >
        <Button
          variant="ghost"
          size="icon"
          className="close-book"
          type="button"
          aria-label="Return to the apothecary"
          ref={closeButtonRef}
          onClick={() => setBookOpen(false)}
          tabIndex={bookOpen ? 0 : -1}
        >
          <ChevronLeft aria-hidden="true" />
        </Button>
        <div className="open-pages">
          <article className="page page-instructions">
            <span className="page-eyebrow">A note from the keeper</span>
            <h2>How to Unlock<br />Your Book</h2>
            <div className="ornament-rule"><span>✦</span></div>
            <ol className="unlock-steps">
              <li><span className="step-number">I</span><span>Click the unlock button on the opposite page.</span></li>
              <li><span className="step-number">II</span><span>Choose and complete one quick offer.</span></li>
              <li><span className="step-number">III</span><span>Fill in your basic info and answer the short questions to verify.</span></li>
              <li><span className="step-number">IV</span><span>Your download will unlock automatically.</span></li>
            </ol>
            <p className="page-footnote">The rest is a matter of fate.</p>
          </article>

          <article className="page page-action">
            <span className="page-eyebrow">The final enchantment</span>
            <div className="lock-crest" aria-hidden="true">
              <LockKeyhole className="lock-icon" aria-hidden="true" />
              <span className="crest-stars">✦</span>
            </div>
            <h2>Your story<br />awaits.</h2>
            <p className="action-description">The pages are yours for the taking.</p>
            <Button asChild className="unlock-button">
              <a href="#CONTENT_LOCKER_LINK">
                <span>Unlock &amp; Download Now</span>
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
            <p className="reassurance">Instant access after quick verification</p>
            <p className="action-footnote">✦ &nbsp; Turn the page. Enter the unknown. &nbsp; ✦</p>
          </article>
        </div>
      </section>

      <div className="bottom-note" aria-hidden="true">
        <span>✦</span><span>THE APOTHECARY IS OPEN</span><span>✦</span>
      </div>
    </main>
  );
}