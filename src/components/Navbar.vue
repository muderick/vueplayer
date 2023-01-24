<template>
  <div class="usericon-div text-white block p-5 pt-10 pl-5 sm_m-auto">
    <UserIcon class="user-icon h-20 w-12 text-white" />Account
  </div>
  <div class="homeicon-div text-white flex py-5 p-2 pl-8 sm_m-auto">
    <span
      ><HomeIcon
        class="home-icon h-10 w-5 text-white"
        v-on:click="$emit('home')"
      />Home</span
    >
  </div>
  <div class="viewlisticon-div text-white p-2 py-5 pl-8 sm_m-auto">
    <ViewListIcon class="viewlist-icon h-10 w-5 text-white" />All Songs
  </div>
  <div class="musicnoteicon-div p-2 py-5 pl-8 text-white sm_m-auto">
    <MusicNoteIcon class="musicnote-icon h-10 w-5 text-white" />Playlist
  </div>
  <div class="about-div p-2 pl-8 text-white sm_m-auto">
    <router-link to="/about">
      <InformationCircleIcon
        v-show="!isHidden"
        class="informationcircle-icon h-10 w-5 text-white"
      />About
    </router-link>
  </div>
</template>

<script>
import { UserIcon } from "@heroicons/vue/solid";
import { HomeIcon } from "@heroicons/vue/solid";
import { ViewListIcon } from "@heroicons/vue/solid";
import { MusicNoteIcon } from "@heroicons/vue/solid";
import { InformationCircleIcon } from "@heroicons/vue/solid";

export default {
  name: "Navbar",
  components: {
    UserIcon,
    HomeIcon,
    ViewListIcon,
    MusicNoteIcon,
    InformationCircleIcon,
  },
  data() {
    return {
      isHidden: false,
    };
  },
  emits: ["home"],
};
</script>

<style scoped>
.home-icon {
  height: 5rem;
  width: 3rem;
}
.homeicon-div:hover {
  cursor: pointer;
}

.viewlist-icon {
  height: 5rem;
  width: 3rem;
}
.viewlisticon-div:hover {
  cursor: pointer;
}

.musicnote-icon {
  height: 5rem;
  width: 3rem;
}
.musicnoteicon-div:hover {
  cursor: pointer;
}

.informationcircle-icon {
  height: 5rem;
  width: 3rem;
}
.about-div:hover {
  cursor: pointer;
}

.usericon-div {
  padding-top: 1.25rem /* 20px */;
  padding-bottom: 1.25rem /* 20px */;
  padding-left: 2rem;
}
.usericon-div:hover {
  cursor: pointer;
}

/* =================== MEDIA QUERIES (MEDIUM DEVICES) ==================== */
@media screen and (max-width: 1024px) {
  .home-icon {
    height: 5rem;
    width: 3rem;
  }

  .viewlist-icon {
    height: 5rem;
    width: 3rem;
  }

  .musicnote-icon {
    height: 5rem;
    width: 3rem;
  }

  .informationcircle-icon {
    height: 5rem;
    width: 3rem;
  }

  .usericon-div {
    padding-top: 1.25rem /* 20px */;
    padding-bottom: 1.25rem /* 20px */;
    padding-left: 2rem;
  }
}

/* =================== MEDIA QUERIES (SMALL DEVICES) ==================== */
@media screen and (max-width: 600px) {
  .sm_m-auto {
    margin: auto;
  }

  .home-icon {
    height: 5rem;
    width: 3rem;
  }

  .viewlist-icon {
    height: 5rem;
    width: 3rem;
  }

  .musicnote-icon {
    height: 5rem;
    width: 3rem;
  }

  .informationcircle-icon {
    height: 5rem;
    width: 3rem;
  }

  .usericon-div {
    padding-top: 1.25rem /* 20px */;
    padding-bottom: 1.25rem /* 20px */;
  }

  .homeicon-div {
    padding-left: 0px;
  }

  .viewlisticon-div {
    padding-left: 0px;
  }

  .musicnoteicon-div {
    padding-left: 0px;
  }

  .about-div {
    padding-left: 0px;
  }
}
</style>
