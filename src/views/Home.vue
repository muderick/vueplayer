<template>
  <div id="App" class="m-0 b-0 w-full">
    <div
      class="bg-transparent flex pt-4"
      style="text-align: -webkit-center"
    >
      <div
        class="bg-transparent text-center flex pl-7"
        style="width: 10%"
      >
        <div class="bg-white rounded-full border-none">
          <img height="47" width="47" :src="logo.src" :alt="logo.title">
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
                  class="text-white hover:bg-gray-600 p-1 font-light text-l rounded-md md:w-3/4 sm:w-3/4 gap-x-2 m-0"
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
                  class="text-white hover:bg-gray-600 p-1 font-light text-l rounded-md md:w-3/4 sm:w-3/4 gap-x-2"
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
      class="playbar bg-transparent w-full justify-center flex rounded-r text-white"
    >
      <div class="pb-1 pt-1">
        <ChevronLeftIcon
          class="h-20 w-10 text-white text-5xl"
          @click="prevSong"
        />
      </div>
      <div class="pl-16 pb-1 pt-1">
        <PlayIcon
          v-if="!isPlaying"
          class="h-20 w-10 text-white"
          @click="play()"
        />
        <PauseIcon
          v-else
          @click="pause"
          class="h-20 w-10 text-white duration-200"
        />
      </div>
      <div class="pl-16 pb-1 pt-1">
        <ChevronRightIcon
          class="h-20 w-10 text-white duration-200"
          @click="nextSong"
        />
      </div>

      <div class="pl-16 pb-1 pt-1">
        <RefreshIcon
          class="h-20 w-10 text-white duration-200"
          @click="shuffleSongs(songs)"
        />
        <i class="fa-shuffle"></i>
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
import { RefreshIcon } from "@heroicons/vue/solid";
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
    RefreshIcon,
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
        src: require('../../public/favicon_io/Drick__Logo.png'),
        title: "Mumia Logo"
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
    controlVol(current) {
      let val = current.target.value;
      let min = current.target.min;
      let max = current.target.max;
      let rate = (val - min) / (max - min);
      this.percent = 100 * rate + "%";
      console.log(this.percent, rate);
    },
    addToPlaylist(id) {
      console.log(id);
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
}

.volume-control {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  transition: var(--transition);
}

.volume:hover {
  display: block;
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
