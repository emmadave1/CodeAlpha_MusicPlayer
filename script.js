const audioPlayer = document.getElementById("audioPlayer");

const playButton = document.getElementById("playButton");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
const shuffleButton = document.getElementById("shuffleButton");
const repeatButton = document.getElementById("repeatButton");
const favoriteButton = document.getElementById("favoriteButton");
const themeButton = document.getElementById("themeButton");

const coverImage = document.getElementById("coverImage");
const albumArt = document.getElementById("albumArt");
const trackTitle = document.getElementById("trackTitle");
const trackArtist = document.getElementById("trackArtist");

const progressBar = document.getElementById("progressBar");
const volumeBar = document.getElementById("volumeBar");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");

const playlistElement = document.getElementById("playlist");
const trackCount = document.getElementById("trackCount");
const statusMessage = document.getElementById("statusMessage");

const tracks = [
    {
        title: "Good God",
        artist: "Minister Guc",
        source: "assets/audio/song1.mp3",
        cover: "assets/images/cover1.jpg"
    },
    {
        title: "Rahama",
        artist: "Kaestrings",
        source: "assets/audio/song2.mp3",
        cover: "assets/images/cover2.jpg"
    },
    {
        title: "Gratitude",
        artist: "Anendlessocean",
        source: "assets/audio/song3.mp3",
        cover: "assets/images/cover3.jpg"
    }
];

let currentTrackIndex = 0;
let isPlaying = false;
let isShuffling = false;
let repeatMode = "off"; // off, all, or one
let isSeeking = false;
let previousVolume = 0.7;

const favorites = new Set();

audioPlayer.volume = Number(volumeBar.value);

function formatTime(time) {
    if (!Number.isFinite(time) || time < 0) {
        return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function setStatus(message) {
    statusMessage.textContent = message;
}

function renderPlaylist() {
    playlistElement.innerHTML = "";

    tracks.forEach((track, index) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "playlist-item";
        item.classList.toggle("active", index === currentTrackIndex);
        item.setAttribute("aria-label", `Play ${track.title} by ${track.artist}`);

        const thumbnail = document.createElement("div");
        thumbnail.className = "track-thumbnail";

        const image = document.createElement("img");
        image.src = track.cover;
        image.alt = "";
        image.onerror = () => {
            image.remove();

            const icon = document.createElement("i");
            icon.className = "fa-solid fa-music";
            thumbnail.appendChild(icon);
        };

        thumbnail.appendChild(image);

        const info = document.createElement("div");
        info.className = "playlist-item-info";

        const title = document.createElement("h3");
        title.textContent = track.title;

        const artist = document.createElement("p");
        artist.textContent = track.artist;

        info.append(title, artist);

        const action = document.createElement("span");
        action.className = "track-action";
        action.innerHTML = index === currentTrackIndex && isPlaying
            ? '<i class="fa-solid fa-volume-high"></i>'
            : '<i class="fa-solid fa-play"></i>';

        item.append(thumbnail, info, action);

        item.addEventListener("click", () => {
            loadTrack(index);
            playTrack();
        });

        playlistElement.appendChild(item);
    });

    trackCount.textContent = `${String(tracks.length).padStart(2, "0")} TRACKS`;
}

function updateFavoriteButton() {
    const isFavorite = favorites.has(currentTrackIndex);

    favoriteButton.classList.toggle("active", isFavorite);

    favoriteButton.innerHTML = isFavorite
        ? '<i class="fa-solid fa-heart"></i>'
        : '<i class="fa-regular fa-heart"></i>';

    favoriteButton.setAttribute(
        "aria-label",
        isFavorite ? "Remove from favorites" : "Add song to favorites"
    );
}

function loadTrack(index) {
    currentTrackIndex = (index + tracks.length) % tracks.length;

    const track = tracks[currentTrackIndex];

    audioPlayer.src = track.source;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;

    coverImage.src = track.cover;
    coverImage.alt = `Artwork for ${track.title}`;
    coverImage.style.display = "block";

    albumArt.classList.remove("playing");

    coverImage.onerror = () => {
        coverImage.style.display = "none";
        albumArt.classList.add("playing");
    };

    progressBar.value = 0;
    progressBar.style.background = "";
    currentTimeDisplay.textContent = "0:00";
    durationDisplay.textContent = "0:00";

    updateFavoriteButton();
    renderPlaylist();
}

async function playTrack() {
    if (!audioPlayer.src) {
        loadTrack(currentTrackIndex);
    }

    try {
        await audioPlayer.play();
        isPlaying = true;
        updatePlayButton();
        renderPlaylist();
        setStatus(`Now playing: ${tracks[currentTrackIndex].title}`);
    } catch (error) {
        isPlaying = false;
        updatePlayButton();
        renderPlaylist();

        if (error.name === "NotAllowedError") {
            setStatus("Press play to start listening.");
        } else {
            setStatus("Unable to play this track. Check that the audio file exists.");
        }
    }
}

function pauseTrack() {
    audioPlayer.pause();
    isPlaying = false;
    updatePlayButton();
    renderPlaylist();
    setStatus("Playback paused.");
}

function togglePlay() {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
}

function updatePlayButton() {
    playButton.innerHTML = isPlaying
        ? '<i class="fa-solid fa-pause"></i>'
        : '<i class="fa-solid fa-play"></i>';

    playButton.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
    playButton.title = isPlaying ? "Pause" : "Play";
}

function nextTrack() {
    if (isShuffling && tracks.length > 1) {
        let randomIndex;

        do {
            randomIndex = Math.floor(Math.random() * tracks.length);
        } while (randomIndex === currentTrackIndex);

        loadTrack(randomIndex);
    } else if (currentTrackIndex < tracks.length - 1) {
        loadTrack(currentTrackIndex + 1);
    } else if (repeatMode === "all") {
        loadTrack(0);
    } else {
        pauseTrack();
        audioPlayer.currentTime = 0;
        return;
    }

    playTrack();
}

function previousTrack() {
    if (audioPlayer.currentTime > 3) {
        audioPlayer.currentTime = 0;
        return;
    }

    if (currentTrackIndex > 0) {
        loadTrack(currentTrackIndex - 1);
    } else if (repeatMode === "all") {
        loadTrack(tracks.length - 1);
    } else {
        audioPlayer.currentTime = 0;
        return;
    }

    playTrack();
}

function updateProgress() {
    if (isSeeking || !Number.isFinite(audioPlayer.duration)) {
        return;
    }

    const progress = audioPlayer.duration > 0
        ? (audioPlayer.currentTime / audioPlayer.duration) * 100
        : 0;

    progressBar.value = progress;
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    durationDisplay.textContent = formatTime(audioPlayer.duration);

    progressBar.style.background = `linear-gradient(
        to right,
        var(--accent) ${progress}%,
        var(--surface-hover) ${progress}%
    )`;
}

function toggleShuffle() {
    isShuffling = !isShuffling;
    shuffleButton.classList.toggle("active", isShuffling);
    shuffleButton.setAttribute("aria-pressed", String(isShuffling));

    setStatus(isShuffling ? "Shuffle enabled." : "Shuffle disabled.");
}

function cycleRepeatMode() {
    const modes = ["off", "all", "one"];
    const currentModeIndex = modes.indexOf(repeatMode);

    repeatMode = modes[(currentModeIndex + 1) % modes.length];

    repeatButton.classList.toggle("active", repeatMode !== "off");
    repeatButton.innerHTML = repeatMode === "one"
        ? '<i class="fa-solid fa-repeat"></i><sup>1</sup>'
        : '<i class="fa-solid fa-repeat"></i>';

    repeatButton.title = {
        off: "Repeat off",
        all: "Repeat all",
        one: "Repeat current track"
    }[repeatMode];

    repeatButton.setAttribute("aria-label", repeatButton.title);
    repeatButton.setAttribute("aria-pressed", String(repeatMode !== "off"));

    audioPlayer.loop = repeatMode === "one";
    setStatus(`Repeat ${repeatMode}.`);
}

function toggleFavorite() {
    if (favorites.has(currentTrackIndex)) {
        favorites.delete(currentTrackIndex);
        setStatus("Removed from favorites.");
    } else {
        favorites.add(currentTrackIndex);
        setStatus("Added to favorites.");
    }

    updateFavoriteButton();
}

function toggleTheme() {
    document.body.classList.toggle("light-theme");

    const isLight = document.body.classList.contains("light-theme");

    themeButton.innerHTML = isLight
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

    themeButton.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
    );
}

playButton.addEventListener("click", togglePlay);
previousButton.addEventListener("click", previousTrack);
nextButton.addEventListener("click", nextTrack);
shuffleButton.addEventListener("click", toggleShuffle);
repeatButton.addEventListener("click", cycleRepeatMode);
favoriteButton.addEventListener("click", toggleFavorite);
themeButton.addEventListener("click", toggleTheme);

progressBar.addEventListener("input", () => {
    isSeeking = true;

    if (Number.isFinite(audioPlayer.duration) && audioPlayer.duration > 0) {
        const seekTime = (Number(progressBar.value) / 100) * audioPlayer.duration;
        currentTimeDisplay.textContent = formatTime(seekTime);
    }
});

progressBar.addEventListener("change", () => {
    if (Number.isFinite(audioPlayer.duration) && audioPlayer.duration > 0) {
        audioPlayer.currentTime =
            (Number(progressBar.value) / 100) * audioPlayer.duration;
    }

    isSeeking = false;
    updateProgress();
});

volumeBar.addEventListener("input", () => {
    audioPlayer.volume = Number(volumeBar.value);

    if (audioPlayer.volume > 0) {
        previousVolume = audioPlayer.volume;
    }
});

volumeBar.addEventListener("dblclick", () => {
    if (audioPlayer.volume > 0) {
        previousVolume = audioPlayer.volume;
        audioPlayer.volume = 0;
        volumeBar.value = 0;
    } else {
        audioPlayer.volume = previousVolume;
        volumeBar.value = previousVolume;
    }
});

audioPlayer.addEventListener("timeupdate", updateProgress);

audioPlayer.addEventListener("loadedmetadata", () => {
    durationDisplay.textContent = formatTime(audioPlayer.duration);
    updateProgress();
});

audioPlayer.addEventListener("play", () => {
    isPlaying = true;
    updatePlayButton();
    renderPlaylist();
});

audioPlayer.addEventListener("pause", () => {
    isPlaying = false;
    updatePlayButton();
    renderPlaylist();
});

audioPlayer.addEventListener("ended", () => {
    if (repeatMode === "one") {
        return;
    }

    if (currentTrackIndex < tracks.length - 1 || repeatMode === "all" || isShuffling) {
        nextTrack();
    } else {
        isPlaying = false;
        updatePlayButton();
        renderPlaylist();
        setStatus("Playlist finished. Select a track to listen again.");
    }
});

audioPlayer.addEventListener("error", () => {
    isPlaying = false;
    updatePlayButton();
    renderPlaylist();
    setStatus("Audio file not found. Add the correct MP3 file to assets/audio.");
});

document.addEventListener("keydown", (event) => {
    const target = event.target;

    if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLButtonElement
    ) {
        return;
    }

    if (event.code === "Space") {
        event.preventDefault();
        togglePlay();
    } else if (event.code === "ArrowRight") {
        if (Number.isFinite(audioPlayer.duration)) {
            audioPlayer.currentTime = Math.min(
                audioPlayer.currentTime + 5,
                audioPlayer.duration
            );
        }
    } else if (event.code === "ArrowLeft") {
        audioPlayer.currentTime = Math.max(audioPlayer.currentTime - 5, 0);
    } else if (event.code === "ArrowUp") {
        audioPlayer.volume = Math.min(audioPlayer.volume + 0.05, 1);
        volumeBar.value = audioPlayer.volume;
    } else if (event.code === "ArrowDown") {
        audioPlayer.volume = Math.max(audioPlayer.volume - 0.05, 0);
        volumeBar.value = audioPlayer.volume;
    }
});

document.getElementById("year").textContent = new Date().getFullYear();

loadTrack(0);
updatePlayButton();
setStatus("Add your audio files, then press play.");