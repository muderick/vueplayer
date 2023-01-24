<template>
  <div id="App" class="m-0 b-0">
    <div
      class="bg-transparent flex gap-6 pt-4"
      style="text-align: -webkit-center"
    >
      <div
        class="justify-around bg-transparent text-center flex"
        style="width: 103px"
      >
        <svg
          class="h-10 w-8 pt-2 text-white"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg>
        <div class="text-center text-blue-300 pt-2">
          <strong>Drick Music Player</strong>
        </div>
      </div>
      <div
        class="flex w-2/3 p-2 bg-gray-600 gap-4 rounded-full min-w-min m-auto"
        style="width: 71%"
      >
        <div class="w-7 pl-4">
          <SearchIcon class="h-10 w-5 text-white py-2" />
        </div>

        <input
          type="text"
          class="
            text-center
            bg-transparent
            text-white text-xl
            outline-none
            pl-4
            py-1
          "
          style="width: -webkit-fill-available"
          placeholder="Search for music"
        />
      </div>
    </div>

    <div
      id="container-music"
      class="content w-full h-content flex lg:gap-10 md:gap-5 pt-4"
    >
      <div class="nav gap-2 m-auto bg-transparent w-28 flex-row rounded-r">
        <Navbar v-on:home="reload" />
      </div>
      <div
        v-show="isCurrent"
        class="
          isCurrent
          flex
          bg-gray-500
          justify-center
          w-3/4
          m-auto
          h-full
          py-4
          text-center
          bg-cover
        "
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
        class="
          overflow-auto
          bg-transparent
          border-2 border-gray-600
          text-center
          my-auto
          w-full
          is_current
        "
      >
        <h2
          class="
            text-center
            font-bold
            py-8
            text-xl
            sm:text-2xl
            lg:text-4xl
            text-white
            all-small-caps
            px-4
            border-1
          "
        >
          Playlist
        </h2>
        <Playlist
          v-bind:songs="songs"
          :current="current"
          @play-song="play"
          @addto-playlist="addToPlaylist"
        />
      </div>
      <div
        v-show="!isCurrent"
        id="not-current"
        class="
          flex
          bg-transparent
          justify-center
          w-3/4
          sm:d-none
          m-auto
          h-full
          py-4
          text-center
        "
      >
        <div class="p-5 text-white pt-8 m-auto text-center text-4xl">
          No song is currently playing!
        </div>
      </div>
      <div
        v-show="!isCurrent"
        class="
          not_current
          w-full
          overflow-auto
          h-full
          text-center
          border-2 border-gray-600
          rounded-2xl
          bg-transparent
          my-auto
        "
      >
        <h2
          class="
            text-center
            font-bold
            py-8
            text-xl
            sm:text-2xl
            lg:text-4xl
            text-white
            all-small-caps
            px-4
          "
        >
          Playlist
        </h2>
        <Playlist
          :current="current"
          @play-song="play"
          :songs="songs"
          @addto-playlist="addToPlaylist"
        />
      </div>
    </div>
    <div
      class="
        playbar
        bg-transparent
        w-full
        justify-center
        flex
        rounded-r
        text-white
      "
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
          @click="play"
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
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar.vue";
import Playlist from "../components/Playlist.vue";
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
    Playlist,
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

    play(id) {
      if (typeof this.index != "undefined") {
        this.index = id - 1;
        this.current = this.songs[this.index];
        this.player.src = this.current.songSrc;
      }
      this.index = id - 1;
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
        src: require("../assets/images/batman.jpg"),
        songSrc: require("../assets/music/6LACK - Seasons ft. Khalid.mp3"),
      },
      {
        id: 2,
        title: "Diamond Heart - Alan Walker",
        src: require("../assets/images/kiss.jpeg"),
        songSrc: require("../assets/music/Alan Walker - Diamond Heart (feat. Sophi-(You2Audio.Com).mp3"),
      },
      {
        id: 3,
        title: "Back To  Sleep - Chris Brown",
        src: require("../assets/images/lambo.jpg"),
        songSrc: require("../assets/music/Chris Brown - Back To Sleep (Official Mu-(You2Audio.Com).mp3"),
      },
      {
        id: 4,
        title: "Privacy - Chris Brown",
        src: require("../assets/images/moon.jpg"),
        songSrc: require("../assets/music/Chris Brown - Privacy (Official Music VI-(You2Audio.Com).mp3"),
      },
      {
        id: 5,
        title: "Without Me - Halsey",
        src: require("../assets/images/supreme.jpeg"),
        songSrc: require("../assets/music/Halsey - Without Me (Official Audio)-(You2Audio.Com).mp3"),
      },
      {
        id: 6,
        title: "Y.O.U - Luh Kel",
        src: require("../assets/images/venom.jpg"),
        songSrc: require("../assets/music/Luh_Kel_-_Y.O.U._(Official_Music_Video)(720p).mp3"),
      },
    ];
    this.current = this.songs[this.index];
    this.player.src = this.current.songSrc;
  },

  computed:{
  computedSongs(){
    return this.limit ? this.songs.slice(0,this.limit) : this.songs
  }
}
};
</script>

<style scoped>
#App {
  background-image: url("../assets/images/bg-texture.png");
  background: rgba(0, 0, 0, 0.855);
  height: 100%;
}

#not-current {
  height: 70vh;
  transition: var(--transition);
  border-radius: 1rem;
}

#not-current:hover {
  background: rgba(45, 35, 35, 0.855);
}

.not_current {
  height: 70%;
  transition: var(--transition);
}

.not_current:hover {
  background: rgba(45, 35, 35, 0.855);
}

.is_current {
  height: 70%;
}

#container-music {
  width: 100%;
}

.isCurrent {
  height: 70vh;
}

.playlist {
  width: 100%;
  color: white;
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
    height: 100%;
  }

  #container-music {
    width: var(--container-width-sm);
    display: grid;
    grid-template-columns: 1fr;
    margin: auto;
  }

  #not-current {
    display: none;
  }

  .not_current,
  .is_current {
    height: 100%;
  }
  .nav {
    display: flex;
    width: auto;
    margin-left: 0;
    column-gap: 2rem;
  }

  .isCurrent {
    height: 35vh;
    width: 100%;
  }
}
</style>
