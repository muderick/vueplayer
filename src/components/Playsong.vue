<template>
  <div
    class="
      mb-2
      flex flex-column-3
      h-3/4
      md:grid-cols-2
      sm:grid-cols-1 sm:gap-2 sm:h-1/2
      gap-2
      p-2
    "
  >
    <div class="w-80">
      <span>
        <button
          class="
            text-white
            hover:bg-gray-600
            p-1
            font-light
            text-l
            rounded-md
            md:w-3/4
            sm:w-3/4
            gap-x-2
          "
          
          v-on:click="$emit('play-song', song.id)"
        >
          {{ song.title }}
        </button>
      </span>
    </div>
    <div class="m-auto w-30 mr-4">
      <img class="max-h-12 rounded pr-2" v-bind:src="song.src" alt="Image" />
    </div>
  </div>
</template>

<script>
// import { ChevronRightIcon } from "@heroicons/vue/solid";
// import { PlayIcon } from "@heroicons/vue/solid";
// import { PauseIcon } from "@heroicons/vue/solid";
// import { RewindIcon } from "@heroicons/vue/solid";
// import { VolumeOffIcon } from "@heroicons/vue/solid";
// import { VolumeUpIcon } from "@heroicons/vue/solid";
export default {
  name: "Playsong",
  props: {
    current: Object,
    song: Object,
  },
  components: {
    // ChevronRightIcon,
    // PlayIcon,
    // PauseIcon,
    // VolumeUpIcon,
    // VolumeOffIcon,
  },
  emits: ["play-song", "addto-playlist"],
};
</script>

<style scoped>
.arrow-right-icon {
  height: 12px;
  width: 12px;
}
</style>
