<div class="h-full justify-center bg-gray-600 flex-1 flex w-auto">
            <div class="py-10">
                <ChevronLeftIcon
                    class="h-20 w-5 text-black"
                    @click="prevSong"
                />
            </div>
            <div class="pl-16 py-10">
                <PlayIcon
                    v-if="!isPlaying"
                    class="h-20 w-5 text-black "
                    @click="play"
                />
                <PauseIcon
                    v-else
                    @click="pause"
                    class="h-20 w-5 text-black duration-200 "
                />
            </div>
            <div class="pl-16 py-10">
                <ChevronRightIcon
                    class="h-20 w-5 text-black duration-200 "
                    @click="nextSong"
                />
            </div>
        </div>
        <div class="h-full flex-1">
            <h3
                class="
                    py-5
                    font-bold
                    text-gray-700 text-xl
                    sm:text-2xl
                    lg:text-4xl
                "
            >
                Songs List
            </h3>
            <button
                v-for="song in songs"
                :key="song.src"
                @click="play(song)"
                :class="
                    song.src == current.src
                        ? 'bg-green-800 py-2 px-2 text-white font-light rounded-md'
                        : 'text-gray-400 font-light'
                "
            >
                {{ song.title }}
            </button>
        </div>
        <script>
    import { ChevronLeftIcon } from "@heroicons/vue/solid";
    import { ChevronRightIcon } from "@heroicons/vue/solid";
    import { PlayIcon } from "@heroicons/vue/solid";
    import { PauseIcon } from "@heroicons/vue/solid";
    // import { RewindIcon } from "@heroicons/vue/solid";
    // import { VolumeOffIcon } from "@heroicons/vue/solid";
    // import { VolumeUpIcon } from "@heroicons/vue/solid";
    export default {
        name: "Playbar",
        components: {
            ChevronLeftIcon,
            ChevronRightIcon,
            PlayIcon,
            PauseIcon,
            // VolumeUpIcon,
            // VolumeOffIcon,
        },
        props: [
            "song"
        ],
        methods: {
            // Play the song
            play(song) {
                if (typeof song.src != "undefined") {
                    this.current = song;
                    this.player.src = this.current.src;
                }
                this.player.play();
                // If the song gets completed play next
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
            },
            // Pause the song
            pause() {
                this.player.pause();
                this.isPlaying = false;
            },
            // Play the next song
            nextSong() {
                this.index++;
                if (this.index > this.songs.length - 1) {
                    this.index = 0;
                }
                this.current = this.songs[this.index];
                this.play(this.current);
            },
            // Play the prev song
            prevSong() {
                this.index--;
                if (this.index < 0) {
                    this.index = this.songs.length - 1;
                }
                this.current = this.songs[this.index];
                this.play(this.current);
            },
        },
        created() {
            this.current = this.songs[this.index];
            this.player.src = this.current.src;
        },
    };
</script>



<div
                            v-show="isCurrent"
                            class="bg-black text-center"
                            style="width: 30%; height: 70vh"
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
                                v-bind:songs="songs"
                                v-on:playSong="play(song)"
                            />
                        </div>
                        <div
                            v-show="!isPlaying"
                            class="bg-black w-full h-fit text-center"
                            
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
                                v-bind:songs="songs"
                                v-on:playSong="play(song)"
                            />
                        </div>




background-color: rgb(32, 33, 35);
background: #202123

play(id) {
    if (typeof this.index != "undefined") {
      this.index = id - 1;
      this.current = this.songs[this.index];
      this.player.src = this.current.songSrc;
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
        this.current = this.songs[this.index - 1];
        this.play(this.current);
        console.log(this.current)
      }.bind(this)
    );
    this.isPlaying = true;
    this.isCurrent = true;
  },