<template>
  <div id="about" class="h-full bg-gray-300 flex flex-row">
    <div class="flex pt-5 pl-5">
      <router-link to="/" @mouseover="hover = true" @mouseleave="hover = false">
        <HomeIcon v-if="hover" class="text-yellow-700 h-20 w-10" />
        <HomeIcon v-else class="text-white h-20 w-10" />
        <span v-if="hover" class="text-yellow-700 text-xl font-bold">Home</span>
        <span v-else class="text-yellow-700 text-xl font-light">Home</span>
      </router-link>
    </div>
    <div class="justify-around w-full text-center pt-40">
      <div>
        <h1 class="text-5xl mb-5 text-yellow-700 font-bold">Music App</h1>
        <h5 class="text-white text-3xl mb-5">Production Date</h5>
        <p class="text-white text-2xl mb-5">Nov 25th 2021</p>
        <footer class="text-white text-xl">
          <small><span>&copy;</span>Mumia</small>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { HomeIcon } from "@heroicons/vue/solid";
export default {
  name: "About",
  components: {
    HomeIcon,
  },
  data() {
    return {
      hover: false,
    };
  },
};
</script>

<style scoped>
#about {
  background: rgba(0, 0, 0, 0.855);
}
</style>