<template>
  <div id="App" class="m-0 b-0 w-full">
    <div class="bg-transparent flex pt-4" style="text-align: -webkit-center">
      <div class="bg-transparent text-center flex pl-7" style="width: 10%">
        <div class="bg-white rounded-full border-none">
          <img height="47" width="47" :src="logo.src" :alt="logo.title" />
        </div>
        <div class="text-center text-blue-300 pt-5 ml-2">
          <strong>Player</strong>
        </div>
      </div>
      <div
        class="search-bar flex w-2/3 p-2 gap-4 rounded-full min-w-min m-auto"
        style="width: 50%"
      >
        <div class="w-7 pl-4">
          <SearchIcon class="h-10 w-5 text-white py-2" />
        </div>

        <input
          type="text"
          v-model="searchTerm"
          class="text-center bg-transparent text-white text-xl outline-none pl-4 py-1"
          style="width: -webkit-fill-available"
          placeholder="Search for music..."
        />
      </div>
    </div>

    <div
      id="container-music"
      class="content h-content flex lg:gap-10 md:gap-5 pt-4"
    >
      <div class="nav mt-12 gap-2 bg-transparent w-28 flex-row rounded-r">
        <Navbar />
      </div>
      <!-- SHOW THE CURRENT MUSIC PLAYING AND IMAGE -->
      <div
        v-if="isCurrent && this.current"
        class="isCurrent flex bg-gray-500 justify-center w-3/4 m-auto h-full py-4 text-center bg-cover"
        :style="{
          backgroundImage: `url(${this.current.src})`,
          backgroundSize: `cover`,
          borderRadius: `2rem`,
          backgroundRepeat: `no-repeat`,
          backgroundPosition: `center`,
        }"
      >
        <div
          class="px-4 text-white mt-80 text-center text-4xl flex-wrap font-bold"
        >
          {{ this.current.artist }} - {{ this.current.title }}
          <Wave :class="this.waveClass" />
        </div>
      </div>
      <!-- Show playlist display only when the current song is playing -->
      <div
        v-show="isCurrent"
        class="overflow-auto bg-transparent border-2 rounded-2xl border-gray-600 my-auto w-full h-full is_current pl-8"
      >
        <h2
          class="text-center font-bold py-8 text-xl sm:text-2xl lg:text-4xl text-white all-small-caps px-4 border-1"
        >
          Playlist
        </h2>
        <!-- Each song to be a button to play -->
        <div v-for="(song, index) in filteredSongs" :key="index">
          <div
            @click="
              play(song);
              selectSong(index);
            "
            class="py-2 flex flex-column-3 h-3/4 md:grid-cols-2 sm:grid-cols-1 sm:gap-2 sm:h-1/2 gap-2 p-2"
            :class="{ playactive: index === activeSong }"
          >
            <div class="w-80 cursor-pointer">
              <span>
                <div
                  class="text-white my-auto p-1 font-light text-l rounded-md md:w-3/4 sm:w-3/4 gap-x-2 m-0"
                >
                  {{ song.artist }} - {{ song.title }}
                </div>
              </span>
            </div>
            <div class="m-auto w-30">
              <img
                class="rounded pr-2 object-cover"
                height="70"
                width="124"
                v-bind:src="song.src"
                alt="Image"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        v-show="!isCurrent"
        id="not-current_detail"
        class="flex bg-transparent justify-center w-3/4 sm:d-none m-auto h-full py-4 text-center"
      >
        <div class="p-5 text-white pt-8 m-auto text-center text-4xl">
          No song is currently playing!
        </div>
      </div>
      <div
        v-show="!isCurrent"
        class="not_current w-full overflow-auto h-full border-2 border-gray-600 rounded-2xl bg-transparent my-auto pl-8"
      >
        <h2
          class="text-center font-bold py-8 text-xl sm:text-2xl lg:text-4xl text-white all-small-caps px-4"
        >
          Playlist
        </h2>
        <div v-for="(song, index) in filteredSongs" :key="index">
          <div
            @click="
              play(song);
              selectSong(index);
            "
            class="py-2 flex flex-column-3 h-3/4 md:grid-cols-2 sm:grid-cols-1 sm:gap-2 sm:h-1/2 gap-2 p-2"
            :class="{ playactive: index === activeSong }"
          >
            <div class="w-80 cursor-pointer">
              <span>
                <div
                  class="text-white my-auto p-1 font-light text-l rounded-md md:w-3/4 sm:w-3/4 gap-x-2"
                >
                  {{ song.artist }} - {{ song.title }}
                </div>
              </span>
            </div>
            <div class="m-auto w-30">
              <img
                class="rounded pr-2 object-cover"
                height="70"
                width="124"
                v-bind:src="song.src"
                alt="Image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PLAYBAR SECTION -->
    <div class="playbar w-full flex rounded-r text-white">
      <div class="ml-6 gap-4 song-details flex" v-if="current">
        <div>
          <img
            class="h-20 w-20 pt-1 object-cover rounded-full"
            :class="spinImage"
            :src="this.current.src"
            :alt="this.current.title"
            ref="spinImage"
          />
        </div>
        <div class="pt-4">
          <div>{{ this.current.artist }} - {{ this.current.title }}</div>
          <div class="gap-2 song-duration flex">
            <div ref="currTime" class="current-time"></div>
            <div class="mt-2.5">
              <input
                type="range"
                name="duration"
                id="song-duration"
                ref="seekSlider"
                min="1"
                value="0"
                max="100"
                class="seek-slider cursor-pointer"
                v-on:change="seekTo()"
              />
            </div>
            <div ref="totalTime" class="total-time"></div>
          </div>
        </div>
      </div>

      <div class="play-controls">
        <div class="randsong_div pl-10 pb-1 pt-1 ml-20">
          <font-awesome-icon
            class="random-song cursor-pointer h-20 w-8 text-white duration-200"
            :class="randomActive"
            icon="fa-solid fa-shuffle"
            @click="randomSong()"
          />
        </div>
        <div class="pl-16 pb-1 pt-1">
          <ChevronLeftIcon
            class="prev-song cursor-pointer h-20 w-10 text-white text-5xl"
            @click="prevSong"
          />
        </div>
        <div class="pl-16 pb-1 pt-1">
          <PlayIcon
            v-if="!isPlaying"
            class="play-song cursor-pointer h-20 w-10 text-white"
            @click="play"
          />
          <PauseIcon
            v-else
            @click="pause"
            class="pause-song cursor-pointer h-20 w-10 text-white duration-200"
          />
        </div>
        <div class="pl-16 pb-1 pt-1">
          <ChevronRightIcon
            class="next-song cursor-pointer h-20 w-10 text-white duration-200"
            @click="nextSong"
          />
        </div>

        <div class="pl-16 pb-1 pt-1 mr-32">
          <font-awesome-icon
            icon="fa-solid fa-repeat"
            class="repeat-song cursor-pointer h-20 w-8 text-white duration-200"
            :class="repeatActive"
            @click="repeatSong()"
          />
        </div>
      </div>

      <div class="gap-2 pl-32 volume-control">
        <div class="pb-1 pt-1">
          <font-awesome-icon
            v-if="!isMuted"
            icon="fa-solid fa-volume-low"
            class="cursor-pointer h-16 w-5 text-white duration-200"
            @click="muteSong"
          />
          <font-awesome-icon
            v-else
            icon="fa-solid fa-volume-xmark"
            class="cursor-pointer h-16 w-5 text-white duration-200"
            @click="unMute"
          />
        </div>
        <div class="volume-range pb-1.5">
          <input
            type="range"
            name="volume"
            id="vol-range"
            ref="volumeSlider"
            min="1"
            max="100"
            class="volume-slider"
            v-on:change="setVolume()"
          />
        </div>
        <div class="pb-1 pt-1">
          <font-awesome-icon
            icon="fa-solid fa-volume-high"
            class="cursor-pointer h-20 w-8 text-white duration-200"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar.vue";
import { ChevronLeftIcon } from "@heroicons/vue/solid";
import { PlayIcon } from "@heroicons/vue/solid";
import { PauseIcon } from "@heroicons/vue/solid";
import { ChevronRightIcon } from "@heroicons/vue/solid";
import { SearchIcon } from "@heroicons/vue/solid";
import Wave from "../components/Wave.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    PlayIcon,
    PauseIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
    SearchIcon,
    Wave,
  },
  data() {
    return {
      searchTerm: "",
      randomActive: null,
      spinImage: null,
      waveClass: null,
      current: {},
      index: 0,
      isPlaying: false,
      isCurrent: false,
      isRandom: false,
      isMuted: false,
      hover: false,
      isRepeatSong: false,
      repeatActive: null,
      //Initialize songs
      songs: [],
      logo: {
        src: require("../../public/favicon_io/Drick__Logo.png"),
        title: "Mumia Logo",
      },
      // Set up the audio
      player: new Audio(),
      loop: false,
      activeSong: null,
    };
  },
  methods: {
    reset() {
      this.$refs.currTime.innerText = "00:00";
      this.$refs.totalTime.innerText = "00:00";
      this.$refs.seekSlider.value = 0;
    },

    randomSong() {
      this.isRandom ? this.pauseRandom() : this.playRandom();
    },

    playRandom() {
      this.isRandom = true;
      this.randomActive = "active";
    },

    pauseRandom() {
      this.isRandom = false;
      this.randomActive = null;
    },

    selectSong(index) {
      this.activeSong = index;
    },

    play(song) {
      if (typeof song.songSrc != "undefined") {
        this.current = song;
        this.player.src = this.current.songSrc;
      }
      this.player.play();
      this.player.addEventListener(
        "ended",
        function () {
          this.index = this.current.id - 2;
          if (this.index < this.songs.length - 1 && this.isRandom === false) {
            this.index++;
          } else if (
            this.index < this.songs.length - 1 &&
            this.isRandom === true
          ) {
            let random_index = Number.parseInt(
              Math.random() * this.songs.length
            );
            this.index = random_index;
          } else if (this.isRepeatSong === true && this.loop === true) {
            this.index;
          } else {
            this.index = 0;
          }
          this.current = this.songs[this.index];
          this.play(this.current);
          this.selectSong(this.index);
        }.bind(this)
      );
      this.spinImage = "rotate";
      this.waveClass = "loader";
      this.isPlaying = true;
      this.isCurrent = true;
    },
    pause() {
      this.player.pause();
      this.isPlaying = false;
      this.spinImage = null;
      this.waveClass = null;
    },
    nextSong() {
      this.index = this.current.id - 1;
      if (this.index < this.songs.length - 1 && this.isRandom === false) {
        this.index++;
      } else if (this.index < this.songs.length - 1 && this.isRandom === true) {
        let random_index = Number.parseInt(Math.random() * this.songs.length);
        this.index = random_index;
      } else {
        this.index = 0;
      }
      this.current = this.songs[this.index];
      this.play(this.current);
      this.selectSong(this.index);
    },
    prevSong() {
      this.index--;
      if (this.index < 0) {
        this.index = this.songs.length - 1;
      }
      this.current = this.songs[this.index];
      this.play(this.current);
    },
    repeatSong() {
      this.isRepeatSong ? this.pauseRepeat() : this.playRepeat();
    },

    playRepeat() {
      this.loop = true;
      if (this.loop === true) {
        this.isRepeatSong = true;
        this.repeatActive = "repeat-active";
        this.player.loop = this.loop;
      }
    },

    pauseRepeat() {
      this.isRepeatSong = false;
      this.repeatActive = null;
      this.player.loop = false;
    },

    muteSong() {
      this.player.volume = 0;
      this.isMuted = true;
    },

    unMute() {
      this.player.volume = this.$refs.volumeSlider.value / 100;
      this.isMuted = false;
    },

    setVolume() {
      if (this.player.volume !== 0) {
        this.player.volume = this.$refs.volumeSlider.value / 100;
        this.isMuted = false;
      } else {
        this.player.volume = this.$refs.volumeSlider.value / 100;
        this.isMuted = true;
      }
    },

    seekTo() {
      let seek_to = this.player.duration * (this.$refs.seekSlider.value / 100);
      this.player.currentTime = seek_to;
    },

    setUpdate() {
      let seekPosition = 0;
      if (!isNaN(this.player.duration)) {
        seekPosition = this.player.currentTime * (100 / this.player.duration);
        this.$refs.seekSlider.value = seekPosition;

        let currentMinutes = Math.floor(this.player.currentTime / 60);
        let currentSeconds = Math.floor(
          this.player.currentTime - currentMinutes * 60
        );
        let durationMinutes = Math.floor(this.player.duration / 60);
        let durationSeconds = Math.floor(
          this.player.duration - durationMinutes * 60
        );

        if (currentSeconds < 10) {
          currentSeconds = "0" + currentSeconds;
        }
        if (durationSeconds < 10) {
          durationSeconds = "0" + durationSeconds;
        }
        if (currentMinutes < 10) {
          currentMinutes = "0" + currentMinutes;
        }
        if (durationMinutes < 10) {
          durationMinutes = "0" + durationMinutes;
        }

        this.$refs.currTime.innerText = `${currentMinutes} : ${currentSeconds}`;
        this.$refs.totalTime.innerText = `${durationMinutes} : ${durationSeconds}`;
      }
    },
  },

  mounted() {
    let updateTimer;
    clearInterval(updateTimer);
    this.reset();

    this.player.load();
    updateTimer = setInterval(this.setUpdate, 1000);

    this.player.addEventListener("ended", this.nextSong);
    //this.reload();
  },

  created() {
    this.songs = [
      {
        id: 1,
        title: "Seasons",
        artist: "6LACK ft. Khalid",
        src: require("../assets/images/kseasons.webp"),
        songSrc: require("../assets/music/6LACK - Seasons ft. Khalid.mp3"),
      },
      {
        id: 2,
        title: "Diamond Heart",
        artist: "Alan Walker",
        src: require("../assets/images/awdiamond-heart.webp"),
        songSrc: require("../assets/music/Alan Walker - Diamond Heart (feat. Sophi-(You2Audio.Com).mp3"),
      },
      {
        id: 3,
        title: "Back To  Sleep",
        artist: "Chris Brown",
        src: require("../assets/images/cbback-to-sleep.webp"),
        songSrc: require("../assets/music/Chris Brown - Back To Sleep (Official Mu-(You2Audio.Com).mp3"),
      },
      {
        id: 4,
        title: "Privacy",
        artist: "Chris Brown",
        src: require("../assets/images/cbprivacy.webp"),
        songSrc: require("../assets/music/Chris Brown - Privacy (Official Music VI-(You2Audio.Com).mp3"),
      },
      {
        id: 5,
        title: "Want Something",
        artist: "Chris Brown",
        src: require("../assets/images/cbwant-something.webp"),
        songSrc: require("../assets/music/Chris Brown - Want Something (Music Vide-(You2Audio.Com).mp3"),
      },
      {
        id: 6,
        title: "Without Me",
        artist: "Halsey",
        src: require("../assets/images/hwithout-me.webp"),
        songSrc: require("../assets/music/Halsey - Without Me (Official Audio)-(You2Audio.Com).mp3"),
      },
      {
        id: 7,
        title: "Y.O.U",
        artist: "Luh Kel",
        src: require("../assets/images/lkyou.webp"),
        songSrc: require("../assets/music/Luh_Kel_-_Y.O.U._(Official_Music_Video)(720p).mp3"),
      },
      {
        title: "Death Bed",
        artist: "Powfu",
        src: "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
        songSrc: "https://samplesongs.netlify.app/Death%20Bed.mp3",
        id: 8,
      },
      {
        title: "Bad Liar",
        artist: "Imagine Dragons",
        src: "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
        songSrc: "https://samplesongs.netlify.app/Bad%20Liar.mp3",
        id: 9,
      },
      {
        title: "Faded",
        artist: "Alan Walker",
        src: "https://samplesongs.netlify.app/album-arts/faded.jpg",
        songSrc: "https://samplesongs.netlify.app/Faded.mp3",
        id: 10,
      },
      {
        title: "Hate Me",
        artist: "Ellie Goulding",
        src: "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
        songSrc: "https://samplesongs.netlify.app/Hate%20Me.mp3",
        id: 11,
      },
      {
        title: "Solo",
        artist: "Clean Bandit",
        src: "https://samplesongs.netlify.app/album-arts/solo.jpg",
        songSrc: "https://samplesongs.netlify.app/Solo.mp3",
        id: 12,
      },
      {
        title: "Rich Flex",
        artist: "Drake ft 21 Savage",
        src: require("../assets/images/drake-rich-flex.jpg"),
        songSrc: require("../assets/music/Drake, 21 Savage - Rich Flex (Audio).mp3"),
        id: 13,
      },
      {
        title: "Lil Bebe",
        artist: "Danileigh",
        src: require("../assets/images/danileigh.jpg"),
        songSrc: require("../assets/music/DaniLeigh-Lil-Bebe_qOQEcbL6NR4.mp3"),
        id: 14,
      },
      {
        title: "Lemonade (Remix)",
        artist: "Internet Money ft. Don Toliver & Roddy Ricch",
        src: require("../assets/images/lemonade.jpg"),
        songSrc: require("../assets/music/Internet Money – Lemonade (Remix) ft. Don Toliver & Roddy Ricch (Official).mp3"),
        id: 15,
      },
      {
        title: "TO THE MOON",
        artist: "JNR CHOI ft Sam Tompkins",
        src: require("../assets/images/moon.jpg"),
        songSrc: require("../assets/music/JNR CHOI, Sam Tompkins - TO THE MOON (Official Music Video).mp3"),
        id: 16,
      },
      {
        title: "In A Minute",
        artist: "Lil Baby",
        src: require("../assets/images/lil-baby.jpg"),
        songSrc: require("../assets/music/Lil Baby - In A Minute (Official Video).mp3"),
        id: 17,
      },
      {
        title: "DIOR",
        artist: "POP SMOKE",
        src: require("../assets/images/pop-smoke.jpg"),
        songSrc: require("../assets/music/POP SMOKE - DIOR (Official).mp3"),
        id: 18,
      },
      {
        title: "Solo",
        artist: "Kid LAROI ft Polo G",
        src: require("../assets/images/kid-laroi-not-sober.jpg"),
        songSrc: require("../assets/music/The Kid LAROI - NOT SOBER ft. Polo G & Stunna Gambino.mp3"),
        id: 19,
      },
      {
        title: "No Promises",
        artist: "TheHxliday",
        src: require("../assets/images/hxliday-promises.jpg"),
        songSrc: require("../assets/music/TheHxliday - No Promises.mp3"),
        id: 20,
      },
      {
        title: "Drip Too Hard",
        artist: "Lil Baby ft Gunna",
        src: require("../assets/images/lil-baby.webp"),
        songSrc: require("../assets/music/Lil Baby x Gunna - Drip Too Hard (Official Audio).mp3"),
        id: 21,
      },
      {
        title: "I Know",
        artist: "Polo G",
        src: require("../assets/images/polo-g.jpg"),
        songSrc: require("../assets/music/Polo-G-I-Know.mp3"),
        id: 22,
      },
      {
        title: "Easy (Remix)",
        artist: "DaniLeigh ft Chris Brown",
        src: require("../assets/images/cb-easy.jpg"),
        songSrc: require("../assets/music/DaniLeigh - Easy ft. Chris Brown (Remix Official Audio).mp3"),
        id: 23,
      },
    ];
    this.current = this.songs[this.index];
    this.player.src = this.current.songSrc;
  },

  computed: {
    filteredSongs() {
      let songs = this.songs;

      // Process search input
      if (this.searchTerm != "" && this.searchTerm) {
        songs = songs.filter((song) => {
          return (
            song.title.toUpperCase().includes(this.searchTerm.toUpperCase()) ||
            song.artist.toUpperCase().includes(this.searchTerm.toUpperCase())
          );
        });
      }

      return songs;
    },
  },
};
</script>

<style scoped>
#App {
  background-image: url("../assets/images/bg-texture.png");
  background: rgba(0, 0, 0, 0.855);
  background-attachment: scroll;
  height: 100vh;
  overflow-y: scroll;
}

.search-bar {
  background: rgba(45, 35, 35, 0.4);
  border-bottom: 2px solid rgba(100, 116, 139, 0.3);
}
.search-bar:focus-within {
  background: rgba(45, 35, 35, 0.855);
}

#not-current_detail {
  height: 70vh;
  width: 50%;
  transition: var(--transition);
  border-radius: 1rem;
}

#not-current_detail:hover {
  background: rgba(45, 35, 35, 0.855);
}

.not_current,
.is_current {
  height: 70vh;
  width: 50%;
  transition: var(--transition);
  overflow: scroll;
}

.not_current:hover {
  background: rgba(45, 35, 35, 0.855);
}

#container-music {
  width: 99%;
}

img {
  max-height: 70px;
  max-width: 132px;
}

.isCurrent {
  height: 70vh;
  width: 50%;
}

.playlist {
  width: 100%;
  color: white;
}

.playactive {
  border-top: 1px solid rgba(100, 116, 139, 0.3);
  border-bottom: 1px solid rgba(100, 116, 139, 0.3);
}

.playbar {
  position: fixed;
  bottom: 2%;
  background: linear-gradient(0.5turn, #1e293b 50%, rgba(45, 35, 35, 0.855));
}

.song-details {
  width: 400px;
  border-right: 2px solid rgba(100, 116, 139, 0.3);
}

.active {
  color: green;
}

.repeat-active {
  color: rgb(42, 150, 42);
}

.random-song,
.prev-song,
.play-song,
.pause-song,
.next-song,
.repeat-song {
  opacity: 0.6;
  transition: opacity 0.2s;
}

.random-song:hover,
.prev-song:hover,
.play-song:hover,
.pause-song:hover,
.next-song:hover,
.repeat-song:hover {
  opacity: 1;
}

.seek-slider,
.volume-slider {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 5px;
  background: #64748b;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.seek-slider::-webkit-slider-thumb,
.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background: white;
  border: 2px solid #64748b;
  cursor: pointer;
  border-radius: 100%;
}

.seek-slider:hover,
.volume-slider:hover {
  opacity: 1;
}

.seek-slider {
  width: 200px;
}

.volume-slider {
  width: 100px;
}

.current-time,
.total-time {
  padding: 10px;
}

.rotate {
  animation: rotation 8s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

.play-controls {
  display: flex;
}

.cursor-pointer {
  cursor: pointer;
}

.volume-control {
  border-left: 2px solid rgba(100, 116, 139, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.volume {
  -webkit-app-region: no drag;
  width: 100px;
  height: 8px;
  margin-left: 5px;
  appearance: none;
  outline: none;
  border-radius: 8px;
}
.volume::-webkit-slider-thumb {
  appearance: none;
  width: 8px;
  background-color: #3071a9cc;
  border: 8px solid #3071a9cc;
  border-radius: 100%;
  cursor: pointer;
}

/* =================== MEDIA QUERIES (MEDIUM DEVICES) ==================== */
@media screen and (max-width: 1024px) {
  #container-music {
    width: var(--container-width-md);
  }

  #App {
    height: 100vh;
  }
}

/* =================== MEDIA QUERIES (SMALL DEVICES) ==================== */
@media screen and (max-width: 600px) {
  #App {
    height: 100vh;
    overflow-y: hidden;
    position: fixed;
  }

  #container-music {
    width: var(--container-width-sm);
    display: grid;
    grid-template-columns: 1fr;
    margin: auto;
  }

  #not-current_detail {
    display: none;
  }

  .isCurrent {
    display: none;
  }
  .nav {
    display: none;
    width: auto;
    margin-left: 0;
    column-gap: 2rem;
  }
  .is_current,
  .not_current {
    height: 60vh;
    width: 100%;
  }

  .playbar {
    padding-top: 10px;
    padding-bottom: 10px;
    position: fixed;
    bottom: 0%;
    display: block;
  }
  .volume-control {
    display: none;
  }
  .song-details {
    border: none;
  }
  .seek-slider {
    width: 165px;
  }
  .play-controls {
    display: flex;
    margin-left: 6px;
  }
  .randsong_div {
    margin-left: 6px;
  }
  .search-bar {
    margin-left: 8rem;
    background: rgba(45, 35, 35, 0.4);
    border-bottom: 2px solid rgba(100, 116, 139, 0.3);
  }
  .search-bar:focus-within {
    background: rgba(45, 35, 35, 0.855);
  }
}
</style>
