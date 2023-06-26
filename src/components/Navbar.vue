<template>
  <div class="musicnoteicon-div p-2 py-5 pl-8 text-white sm_m-auto">
    <router-view to="/">
      <MusicNoteIcon
        class="musicnote-icon h-10 w-5 text-white"
        :class="active"
        @click="toggleActive"
      />Playlist
    </router-view>
  </div>
  <div class="about-div p-2 pl-8 text-white sm_m-auto">
    <keep-alive>
      <router-link to="/about">
        <InformationCircleIcon
          v-show="!isHidden"
          class="informationcircle-icon h-10 w-5 text-white"
        />About
      </router-link>
    </keep-alive>
  </div>
</template>

<script>
import { MusicNoteIcon } from "@heroicons/vue/solid";
import { InformationCircleIcon } from "@heroicons/vue/solid";

export default {
  name: "Navbar",
  components: {
    MusicNoteIcon,
    InformationCircleIcon,
  },
  data() {
    return {
      isHidden: false,
      active: null,
      isActive: false,
    };
  },
  methods: {
    toggleActive() {
      this.isActive ? this.removeActive() : this.setActive();
    },
    setActive() {
      this.isActive = true;
      this.active = "active-class";
    },
    removeActive() {
      this.isActive = false;
      this.active = null;
    },
  },
  emits: ["home"],
};
</script>

<style scoped>
.musicnote-icon {
  height: 5rem;
  width: 3rem;
}
.musicnoteicon-div:hover {
  cursor: pointer;
}

.active-class {
  color: slategrey;
}

.informationcircle-icon {
  height: 5rem;
  width: 3rem;
}
.about-div:hover {
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
