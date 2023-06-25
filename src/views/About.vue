<template>
  <div id="about" class="h-screen bg-gray-300 flex flex-row">
    <div class="flex pt-5 pl-5">
      <a href="/" @mouseover="hover = true" @mouseleave="hover = false">
        <HomeIcon v-if="hover" class="text-yellow-700 h-20 w-10" />
        <HomeIcon v-else class="text-white h-20 w-10" />
        <span v-if="hover" class="text-white text-xl font-bold">Home</span>
        <span v-else class="text-yellow-700 text-xl font-bold">Home</span>
      </a>
    </div>
    <div class="justify-around w-full text-center pt-40">
      <div>
        <h1 class="text-5xl mb-5 text-yellow-700 font-bold">Music App</h1>
        <h5 class="text-white text-3xl mb-5">Basically for testing</h5>
        <br />
        <div class="profile-section">
          <a class="profile profile-left" href="https://muderick.github.io" target="_blank" rel="noopener noreferrer">
            <UserCircleIcon class="user-icon m-auto h-10 w-5" />
            <h3>View Personal Website</h3>
          </a>
          <div class="divider">
          </div>
          <a class="profile" href="https://www.linkedin.com/in/mumia-derick/" target="_blank" rel="noopener noreferrer">
            <LinkIcon class="link-icon m-auto h-10 w-5" />
            <h3>View LinkedIn Profile</h3>
          </a>
        </div>
        <br />
        <br />
        <footer class="text-white text-xl">
          <small><span>&copy;</span>Mumia {{ currentDate() }}</small>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { HomeIcon } from "@heroicons/vue/solid";
import { UserCircleIcon } from "@heroicons/vue/solid";
import { LinkIcon } from "@heroicons/vue/solid";
export default {
  name: "About",
  components: {
    HomeIcon,
    UserCircleIcon,
    LinkIcon,
  },
  data() {
    return {
      hover: false,
    };
  },
  methods: {
    currentDate() {
      const current = new Date();
      const date = `${current.getFullYear()}`;
      return date;
    },
  },
};
</script>

<style scoped>
#about {
  background: rgba(0, 0, 0, 0.855);
}
.profile-section {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.profile {
  text-decoration: none;
  color: whitesmoke;
}


.user-icon,
.link-icon {
  height: 5rem;
  width: 3rem;
  color: hsla(0, 0%, 100%, 0.6);
}

h3 {
  font-size: 14px;
  font-weight: 600;
}
.divider {
  border: 1px solid hsla(0, 0%, 100%, 0.6);
}
</style>
