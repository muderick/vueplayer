<template>
  <div v-for="song in songs" :key="song.id">
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
      <div class="my-auto ml-4 w-16">
        <ArrowLeftIcon
          class="arrow-left-icon text-white"
          @click="$emit('addto-playlist', song.id)"
        />
      </div>
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
          >
            {{ song.title }}
          </button>
        </span>
      </div>
      <div class="m-auto w-30 mr-4">
        <img class="max-h-12 rounded pr-2" v-bind:src="song.src" alt="Image" />
      </div>
    </div>
  </div>
  
  <div>
    <button class="border p-2 border-gray-600 rounded mb-2 text-white" @click="limit = null">Show More</button>
    </div>
</template>

<script>
import { ArrowLeftIcon } from "@heroicons/vue/solid";
export default {
  name: "Allsongs",
  components: {
    ArrowLeftIcon,
  },
  props: {
    songs: Array,
    current: Object,
  },
  emits: ["addto-playlist"],
};
</script>

<style scoped>
.all-small-caps {
  font-variant-caps: all-small-caps;
}

.arrow-left-icon {
  height: 12px;
  width: 12px;
}
</style>
