<template>
    <div
        v-for="song in songs"
        :key="song.songSrc"
    >
        <Playsong
            :song="song"
            @play-song="$emit('play-song', song.songSrc)"
        />
    </div>
</template>

<script>
    import Playsong from "./Playsong.vue";
    export default {
        name: "Playlist",
        components: {
            Playsong,
        },
        props: {
            songs: Array,
        },
        emits: ['play-song', 'addto-playlist'],
    };
</script>

<style>
    .all-small-caps {
        font-variant-caps: all-small-caps;
    }
</style>