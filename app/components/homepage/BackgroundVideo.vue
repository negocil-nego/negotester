<template>
    <div :class="{
        'bg-black/30': props.video === VideoList.LOGIN || props.video === VideoList.REGISTER,
        'bg-black/45': props.video === VideoList.HOME,
        'h-screen': true
    }">
        <div class="relative">
            <video autoplay muted loop playsinline class="absolute top-0 left-0 w-full object-cover -z-10 h-screen">
                <source :src="props.video" type="video/mp4">
                O seu navegador não suporta vídeos.
            </video>
        </div>
    </div>
</template>
<script setup lang="ts">
import { VideoList } from '~/shared/videos';

const props = defineProps({
    video: {
        type: String,
        required: true
    }
})
</script>
