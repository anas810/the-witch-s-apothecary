# The Witch’s Apothecary

Create an interactive, atmospheric dark-fantasy landing page set inside a dimly lit witch's apothecary room.

Use the attached book cover image for the book.

1. Initial Hero Scene:
Centerpiece: Place a cast-iron witch's cauldron in the center-bottom of the screen. The cauldron is active—bubbling with glowing green/purple potion, emitting rising wisps of magical smoke, floating embers, and casting an eerie underglow onto the room.
Floating Grimoire: Directly above the bubbling cauldron, display the closed book (using the attached cover for "The Witch") hovering gently in mid-air with a subtle up-and-down floating animation and faint magical particles around it.
Call to Action: Next to the hovering book, add glowing, stylized fantasy text with a subtle pointing arrow or pulse effect that reads: "Click here to download".
Audio: Include subtle, low-volume ambient sound effects (soft bubbling cauldron and a gentle paper rustle upon opening, defaulting to low volume around 20%) with an accessible mute/unmute toggle.

2. Interactive Book-Opening Transition:
When the user clicks anywhere on the hovering book or the "Click here to download" text, trigger a smooth camera zoom-in toward the book while the cover swings open to reveal two parchment-style open pages filling the screen.

3. Inside the Open Book (2-Page Spread):
Left Page (Instructions): Display clear, easy-to-read step-by-step instructions titled "How to Unlock Your Book":
- Click the unlock button on the opposite page.
- Choose and complete one quick offer.
- Fill in your basic info and answer the short questions to verify.
- Your download will unlock automatically.

Right Page (Action): Feature a prominent, glowing mystical button labeled "Unlock & Download Now" (set up with an easily editable href placeholder URL like #CONTENT_LOCKER_LINK so I can paste my content locker link). Add a subtle lock icon and a short reassurance note underneath (e.g., "Instant access after quick verification"). Include an option to close or go back to the apothecary view.

Design & Tech Notes:
Use dark moody colors (deep charcoal, emerald/purple magical glow, warm parchment for the open pages).
Ensure smooth CSS/Framer Motion animations and full responsiveness on both mobile and desktop screens.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7404389c-dcfb-476d-ac9e-d5186e2fa4f2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
