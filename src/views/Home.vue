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
        class="flex w-2/3 p-2 bg-gray-600 gap-4 rounded-full min-w-min m-auto"
        style="width: 50%"
      >
        <div class="w-7 pl-4">
          <SearchIcon class="h-10 w-5 text-white py-2" />
        </div>

        <input
          type="text"
          class="text-center bg-transparent text-white text-xl outline-none pl-4 py-1"
          style="width: -webkit-fill-available"
          placeholder="Search for music"
        />
      </div>
    </div>

    <div
      id="container-music"
      class="content h-content flex lg:gap-10 md:gap-5 pt-4"
    >
      <div class="nav gap-2 m-auto bg-transparent w-28 flex-row rounded-r">
        <Navbar v-on:home="reload" />
      </div>
      <div
        v-show="isCurrent"
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
          class="px-4 text-white mt-72 text-center text-4xl flex-wrap font-bold"
        >
          {{ this.current.title }}
        </div>
      </div>
      <div
        v-show="isCurrent"
        class="overflow-auto bg-transparent border-2 rounded-2xl border-gray-600 text-center my-auto w-full is_current"
      >
        <h2
          class="text-center font-bold py-8 text-xl sm:text-2xl lg:text-4xl text-white all-small-caps px-4 border-1"
        >
          Playlist
        </h2>
        <!-- <Playlist
          v-bind:songs="songs"
          @play-song="play(song)"
          @addto-playlist="addToPlaylist"
        /> -->

        <div v-for="song in songs" :key="song.songSrc">
          <div
            class="mb-2 flex flex-column-3 h-3/4 md:grid-cols-2 sm:grid-cols-1 sm:gap-2 sm:h-1/2 gap-2 p-2"
          >
            <div class="w-80">
              <span>
                <div
                  @click="play(song)"
                  class="cursor-pointer text-white hover:bg-gray-600 p-1 font-light text-l rounded-md md:w-3/4 sm:w-3/4 gap-x-2 m-0"
                >
                  {{ song.title }}
                </div>
              </span>
            </div>
            <div class="m-auto w-30">
              <img
                class="max-h-12 rounded pr-2"
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
        class="not_current w-full overflow-auto h-full text-center border-2 border-gray-600 rounded-2xl bg-transparent my-auto"
      >
        <h2
          class="text-center font-bold py-8 text-xl sm:text-2xl lg:text-4xl text-white all-small-caps px-4"
        >
          Playlist
        </h2>
        <!-- <Playlist
          :songs="songs"
          @play-song="play(song)"
          @addto-playlist="addToPlaylist"
        /> -->
        <div v-for="song in songs" :key="song.songSrc">
          <div
            class="mb-2 flex flex-column-3 h-3/4 md:grid-cols-2 sm:grid-cols-1 sm:gap-2 sm:h-1/2 gap-2 p-2"
          >
            <div class="w-80">
              <span>
                <div
                  @click="play(song)"
                  class="cursor-pointer text-white hover:bg-gray-600 p-1 font-light text-l rounded-md md:w-3/4 sm:w-3/4 gap-x-2"
                >
                  {{ song.title }}
                </div>
              </span>
            </div>
            <div class="m-auto w-30">
              <img
                class="max-h-12 rounded pr-2"
                v-bind:src="song.src"
                alt="Image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="playbar w-full flex rounded-r text-white"
    >
    <div class="ml-6 gap-4 song-details flex">
      <div><img :src="this.current.src" :alt="this.current.title" class="h-20 w-20 pt-1 rounded-full"></div>
      <div class="pt-6">
        <div>{{ this.current.title }}</div>
        <div class="gap-2 song-duration flex">
          <div class="current-time">0:00</div>
          <div>
            <input type="range" name="duration" id="song-duration" min="1" value="0" max="100" class="seek-slider"
            onchange="seekTo()">
          </div>
          <div class="total-time">0:00</div>
        </div>
      </div>
    </div>
      <div class="pl-10 pb-1 pt-1 ml-32">
        <font-awesome-icon
          class="random-song cursor-pointer h-20 w-8 text-white duration-200"
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
          @click="play(song)"
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
          @click="repeatSong()"
        />
      </div>
      
      <div class="gap-2 pl-32 volume-control">
        <div class="pb-1 pt-1">
          <font-awesome-icon
          icon="fa-solid fa-volume-xmark"
            class="cursor-pointer h-16 w-5 text-white duration-200"
          />
          <font-awesome-icon
          icon="fa-solid fa-volume-low"
            class="cursor-pointer h-16 w-5 text-white duration-200"
          />
        </div>
        <div class="volume-range pb-1.5">
          <input type="range" name="volume" id="vol-range" min="1" value="90" max="100" class="volume-slider"
          onchange="setVolume()">
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
//import Playlist from "../components/Playlist.vue";
import { ChevronLeftIcon } from "@heroicons/vue/solid";
import { PlayIcon } from "@heroicons/vue/solid";
import { PauseIcon } from "@heroicons/vue/solid";
import { ChevronRightIcon } from "@heroicons/vue/solid";
import { SearchIcon } from "@heroicons/vue/solid";
// import Playbar from "../components/Playbar.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    //Playlist,
    PlayIcon,
    PauseIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
    SearchIcon,
    // Playbar,
  },
  data() {
    return {
      current: {},
      index: 0,
      isPlaying: false,
      isCurrent: false,
      hover: false,
      songs: [],
      logo: {
        src: require("../../public/favicon_io/Drick__Logo.png"),
        title: "Mumia Logo",
      },
      limit: 5,
      // Set up the audio
      player: new Audio(),
    };
  },
  methods: {
    reload() {
      this.isPlaying = false;
      this.isCurrent = false;
    },

    play(song) {
      if (typeof song != "undefined") {
        this.current = song;
        this.player.src = this.current.songSrc;
        console.log(this.current);
      }
      //this.index = id - 1;
      this.player.play();
      this.player.addEventListener(
        "ended",
        function () {
          this.index++;
          if (this.index > this.songs.length - 1) {
            this.index = 0;
          }
          this.current = this.songs[this.index];
          this.play(this.current);
        }.bind(this)
      );
      this.isPlaying = true;
      this.isCurrent = true;
    },
    pause() {
      this.player.pause();
      this.isPlaying = false;
    },
    nextSong() {
      this.index++;
      if (this.index > this.songs.length - 1) {
        this.index = 0;
      }
      this.current = this.songs[this.index];
      this.play(this.current);
    },
    prevSong() {
      this.index--;
      if (this.index < 0) {
        this.index = this.songs.length - 1;
      }
      this.current = this.songs[this.index];
      this.play(this.current);
    },
    shuffleSongs(songs) {
      let songArray = [...songs];

      for (let i = 0; i < songArray.length; i++) {
        const randomSong = songArray.splice(
          Math.floor((songArray.length - i) * Math.random()),
          1
        );
        songArray.push(...randomSong);
      }
      return songArray;
    },
    
  },
  created() {
    this.songs = [
      {
        id: 1,
        title: "6LACK - Seasons ft. Khalid",
        src: require("../assets/images/kseasons.webp"),
        songSrc: require("../assets/music/6LACK - Seasons ft. Khalid.mp3"),
      },
      {
        id: 2,
        title: "Diamond Heart - Alan Walker",
        src: require("../assets/images/awdiamond-heart.webp"),
        songSrc: require("../assets/music/Alan Walker - Diamond Heart (feat. Sophi-(You2Audio.Com).mp3"),
      },
      {
        id: 3,
        title: "Back To  Sleep - Chris Brown",
        src: require("../assets/images/cbback-to-sleep.webp"),
        songSrc: require("../assets/music/Chris Brown - Back To Sleep (Official Mu-(You2Audio.Com).mp3"),
      },
      {
        id: 4,
        title: "Privacy - Chris Brown",
        src: require("../assets/images/cbprivacy.webp"),
        songSrc: require("../assets/music/Chris Brown - Privacy (Official Music VI-(You2Audio.Com).mp3"),
      },
      {
        id: 5,
        title: "Want Something - Chris Brown",
        src: require("../assets/images/cbwant-something.webp"),
        songSrc: require("../assets/music/Chris Brown - Want Something (Music Vide-(You2Audio.Com).mp3"),
      },
      {
        id: 6,
        title: "Without Me - Halsey",
        src: require("../assets/images/hwithout-me.webp"),
        songSrc: require("../assets/music/Halsey - Without Me (Official Audio)-(You2Audio.Com).mp3"),
      },
      {
        id: 7,
        title: "Y.O.U - Luh Kel",
        src: require("../assets/images/lkyou.webp"),
        songSrc: require("../assets/music/Luh_Kel_-_Y.O.U._(Official_Music_Video)(720p).mp3"),
      },
    ];
    this.current = this.songs[this.index];
    this.player.src = this.current.songSrc;
  },

  computed: {
    computedSongs() {
      return this.limit ? this.songs.slice(0, this.limit) : this.songs;
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

.isCurrent {
  height: 70vh;
  width: 50%;
}

.playlist {
  width: 100%;
  color: white;
}

.playbar {
  position: fixed;
  bottom: 2%;
  background: linear-gradient(.50turn, #1e293b 50%, rgba(45, 35, 35, 0.855));
}

.song-details {
  width: 350px;
  border-right: 2px solid rgba(100, 116, 139, 0.3);
}

.active {
  color: green;
}

.random-song,
.prev-song,
.play-song,
.pause-song,
.next-song,
.repeat-song {
  opacity:0.6;
  transition: opacity .2s;
}

.random-song:hover,
.prev-song:hover,
.play-song:hover,
.pause-song:hover,
.next-song:hover,
.repeat-song:hover {
  opacity: 1.0;
}

.seek-slider,
.volume-slider {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 5px;
  background: #64748b;
  -webkit-transition: .2s;
  transition: opacity .2s;
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
  opacity: 1.0;
}

.seek-slider {
  width: 200px;
}

.volume-slider {
  width: 100px
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
    display: flex;
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
  }
}
</style>
