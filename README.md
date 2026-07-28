# Liquid Lyrics

Liquid Lyrics is a modern Spicetify lyrics extension.

It brings a smooth, theme-matching lyrics experience to Spotify with word-by-word synced
lyrics, fullscreen lyrics, romanization support, an optional media player and a collapsible
sidebar lyrics card.

It was built alongside **Glowify** and **Liquify** and still fits those two best, but it is no
longer made just for them - under any other theme it now picks up that theme's look instead.
And if you want something else entirely, the new settings menu lets you build your own.

## Features

### Smooth Word-by-Word Lyrics

Liquid Lyrics supports smooth synced lyrics with fluid word-by-word animations.

For lyrics formats that do not support word-by-word syncing, it can also display classic
block-style lyrics. If you prefer less movement, there are two calmer display modes.

<img width="2557" height="1375" alt="image" src="https://github.com/user-attachments/assets/12a9cffd-df8c-42cf-ab4e-7f96de7338c9" />

### Romanization Support

Romanized lyrics can be toggled on or off.

This is useful for songs in languages such as Japanese, Korean, Chinese and other non-Latin
scripts.

For Japanese songs there is now a **Furigana** mode as well. Instead of replacing the lyrics
with latin letters, it keeps the original text and puts the reading above it - so you can
still read along if you know some Japanese. The button cycles through off, Romaji and
Furigana, and Furigana only shows up on songs that actually have Japanese in them.

<img width="2557" height="1380" alt="image" src="https://github.com/user-attachments/assets/995eaa1e-3124-482b-96ab-ea09724f66fa" />

<img width="2557" height="1377" alt="image" src="https://github.com/user-attachments/assets/6ed6b42e-b7cd-44ce-8ac6-43c9dd05bfe9" />

### Settings Menu

Liquid Lyrics now has a full settings menu, found in the Spicetify profile menu under
**Liquid Lyrics Settings**.

Almost everything can be changed there — buttons, backgrounds, the media player, the sidebar
card, fullscreen behaviour and the lyrics themselves. Every change applies right away.

<img width="2557" height="1377" alt="image" src="https://github.com/user-attachments/assets/29aad758-ffac-4d78-be3d-e5c224c2f703" />

### Backgrounds

The background behind the lyrics can be a plain color, a picture, the animated cover-art
blobs, or **Kawarp** — a new flowing artwork effect, and the new default.

The picture can come from the album art, a link, or a file on your computer, and there are
sliders for blur, colour, brightness and motion. You can also let it fill Spotify's whole
right sidebar.

### Fullscreen Lyrics Mode

Liquid Lyrics includes a dedicated fullscreen lyrics view for a more immersive listening
experience, plus a cinema mode that fills the Spotify window without leaving it.

In both, the interface can fade away on its own while you listen and come back the moment you
move the mouse.

<img width="2557" height="1438" alt="image" src="https://github.com/user-attachments/assets/3b95bea2-135a-4c56-924f-01309ad1166c" />

### Optional Media Player

Liquid Lyrics includes an optional media player inside the lyrics view.

There are two layouts to choose from, it can sit on either side, and you decide which track
details it shows.

<img width="1915" height="1167" alt="image" src="https://github.com/user-attachments/assets/951fb53f-4088-43a5-8b6d-99c23bf256ec" />
<img width="1912" height="1162" alt="image" src="https://github.com/user-attachments/assets/044475c7-a626-48a9-a6a6-c5c989eec09a" />
<img width="1927" height="1175" alt="image" src="https://github.com/user-attachments/assets/ee993f50-e81c-48a9-9aa1-4f5170a9d0f3" />


### Sidebar Lyrics Card

Spotify once had a sidebar lyrics card and later removed it.

Liquid Lyrics brings this feature back with a modern design. The card can be collapsed or
expanded whenever you want.

<p align="center">
  <img src="https://github.com/user-attachments/assets/b1d2aa0d-2ac6-4bbe-ad5e-36c4adb8c953" width="260">
  <img src="https://github.com/user-attachments/assets/9a9bed2a-4da4-4f4f-9ba3-44ec762eec3c" width="260">
</p>

### Sync Editor

If a song has no lyrics, or bad ones, you can write your own — including word-by-word timing.

Keep the result on your device, or publish it so everyone else gets it too.

<img width="2557" height="1372" alt="image" src="https://github.com/user-attachments/assets/741b9642-5348-48bb-9886-87fe9044eaa5" />

## Themes

Liquid Lyrics is designed around the style of **Glowify** and **Liquify**: glass effects,
accent colors, rounded corners and smooth animations.

With any other theme it now takes its look from that theme's own sidebar panels, so it fits in
rather than standing out. Accent colors come from the album art, so there is always one.

Some details may still not match perfectly outside of Glowify and Liquify. If something looks
off, most of it can be changed in the settings.

## Installation

### Marketplace Installation

Once Liquid Lyrics is available in the Spicetify Marketplace, you will be able to install it
directly from there.

1. Open Spotify
2. Open the Spicetify Marketplace
3. Search for Liquid Lyrics
4. Click install
5. Reload Spotify

### Manual Installation

Download the latest `liquid-lyrics.js` file and place it inside your Spicetify extensions
folder.

**Windows:**

```
%appdata%\spicetify\Extensions\
```

**Linux / macOS:**

```
~/.config/spicetify/Extensions/
```

Then enable the extension:

```bash
spicetify config extensions liquid-lyrics.js
spicetify apply
```

## Compatibility

Liquid Lyrics is designed for the current Spotify and Spicetify UI.

Because Spotify updates its desktop client frequently, some parts of the extension may break
after Spotify updates. Updates and fixes will be released when needed.

## Roadmap

Planned improvements:

- more performance optimizations
- more customization options
- further polish for other themes
- more fullscreen lyrics improvements

## Credits

Created by NMW.

Built alongside the Glowify and Liquify Spicetify themes.

## License

This project is licensed under the MIT License.
