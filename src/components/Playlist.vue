<template>
    <div
        v-for="song in songs"
        :key="song.id"
    >
        <Playsong
            :song="song"
            @addto-playlist="$emit('addto-playlist', song.id)"
            @play-song="$emit('play-song', song.id)"
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
            current: Object,
        },
        emits: ['play-song', 'addto-playlist'],
    };
</script>

<style>
    .all-small-caps {
        font-variant-caps: all-small-caps;
    }
</style>