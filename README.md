# Alamzy — Music Player

A modern, responsive music player built with **HTML, CSS, and JavaScript** as part of the CodeAlpha Frontend Development Internship.

This project provides a clean and intuitive interface for listening to music, managing playback, navigating a playlist, and customizing the listening experience.

## Features

* **Play and Pause:** Start, pause, and resume audio playback.
* **Playlist Management:** Browse and select tracks from a dynamic playlist.
* **Track Navigation:** Move between previous and next tracks.
* **Progress Bar:** Monitor playback progress and seek to a specific position in a track.
* **Volume Control:** Adjust the audio volume.
* **Shuffle Mode:** Play tracks in a randomized order.
* **Repeat Mode:** Choose between repeat off, repeat all, and repeat the current track.
* **Favorites:** Mark tracks as favorites.
* **Album Artwork:** Display artwork for individual tracks.
* **Theme Toggle:** Switch between dark and light themes.
* **Playback Information:** View track titles, artist names, current playback time, and total duration.
* **Keyboard Shortcuts:** Control playback and adjust volume using supported keyboard keys.
* **Responsive Design:** Enjoy a layout optimized for desktop, tablet, and mobile devices.
* **Error Handling:** Display helpful messages when audio files are missing or cannot be played.

## Technologies Used

* **HTML5** — Page structure and audio playback.
* **CSS3** — Styling, responsive layouts, animations, and theme customization.
* **JavaScript (ES6+)** — Playback controls, playlist rendering, audio events, and interactive functionality.
* **HTML5 Audio API** — Audio playback and media control.
* **Font Awesome** — Icons used throughout the interface.
* **Google Fonts** — Typography.

## Project Structure

```text
CodeAlpha_MusicPlayer/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── audio/
    │   ├── song1.mp3
    │   ├── song2.mp3
    │   └── song3.mp3
    └── images/
        ├── cover1.jpg
        ├── cover2.jpg
        └── cover3.jpg
```

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

* A modern web browser.
* A code editor, such as Visual Studio Code.
* Audio files in a supported format, such as MP3.
* Optional: The Live Server extension for Visual Studio Code.

### Installation

1. Clone the repository.

   ```bash
   git clone https://github.com/emmadave1/CodeAlpha_MusicPlayer.git
   ```

2. Navigate to the project directory.

   ```bash
   cd CodeAlpha_MusicPlayer
   ```

3. Add your audio files.

   Place your audio files inside `assets/audio/` and your album artwork inside `assets/images/`.

   Ensure the filenames match the paths defined in `script.js`.

4. Run the project.

   Open the project in Visual Studio Code and launch `index.html` using Live Server.

   Alternatively, open `index.html` directly in a modern browser.

## How to Use

1. Open the music player in your browser.
2. Select a track from the playlist.
3. Use the Play/Pause button to control playback.
4. Navigate between tracks using the Previous and Next buttons.
5. Drag the progress bar to seek through a song.
6. Adjust the volume using the volume slider.
7. Enable Shuffle to randomize track selection.
8. Cycle through the Repeat modes to repeat a track or the entire playlist.
9. Use the heart icon to mark or unmark a track as a favorite.
10. Toggle between light and dark themes using the theme button.

### Keyboard Shortcuts

| Key           | Action                     |
| ------------- | -------------------------- |
| `Space`       | Play or pause              |
| `Arrow Right` | Skip forward five seconds  |
| `Arrow Left`  | Skip backward five seconds |
| `Arrow Up`    | Increase volume            |
| `Arrow Down`  | Decrease volume            |

Keyboard shortcuts may not activate while a button or input field has focus.

## Responsive Design

The interface adapts to different screen sizes:

* **Desktop:** Two-column layout with the player and playlist displayed side by side.
* **Tablet:** A flexible layout that accommodates narrower screens.
* **Mobile:** A single-column layout with appropriately sized controls.

## Project Objective

This project was developed as part of the **CodeAlpha Frontend Development Internship** to demonstrate practical frontend development skills, including:

* Structuring web pages with semantic HTML.
* Creating responsive interfaces with CSS.
* Manipulating the DOM with JavaScript.
* Handling audio playback through the HTML5 Audio API.
* Implementing event listeners and interactive controls.
* Organizing code into separate HTML, CSS, and JavaScript files.
* Improving usability through feedback messages and error handling.

## Future Improvements

Potential enhancements include:

* Persisting favorite tracks using local storage.
* Adding a dedicated mute button.
* Supporting playlist creation and management.
* Displaying audio visualizations.
* Adding search and filtering for larger music collections.
* Integrating a music API or backend service.

## Author

**Emma Dave**, popularly known as **Alamzy**

* GitHub: [@emmadave1](https://github.com/emmadave1)
* LinkedIn: [Emma Dave](https://linkedin.com/in/emma-dave-ab96472a8)
* Portfolio: [Alamzy Portfolio](https://alamzy.vercel.app)

## Internship

Developed as part of the **CodeAlpha Frontend Development Internship**.

## 📄 License

This project is available for educational and portfolio purposes. If you plan to reuse or distribute it, add an appropriate license and ensure you have permission to use any included audio files and artwork.
