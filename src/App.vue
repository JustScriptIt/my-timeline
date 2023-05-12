<template>
    <Main/>
    <Footer/>
</template>

<script lang="ts">
import Main from "@/components/Main.vue";
import Footer from "@/components/Footer.vue";
import {defineComponent, ref} from "vue";
import {useStore} from "vuex";
import { MediaBlock } from "@/store/appStore";

export default defineComponent({
    components: {
        Footer,
        Main
    },
    setup() {
        const store = useStore()
        const mediaBlocks = ref([] as MediaBlock[])

        store.dispatch("setMediaBlocks")
            .then((data: MediaBlock[]) => {
                mediaBlocks.value = data;
            }).catch((error) => {
                console.log(error);
            });

        return {
            mediaBlocks
        }
    }
})
</script>

<style lang="scss">
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    background: linear-gradient(90deg, rgba(220, 217, 214, 0.34) 0%, #CECFCE 100%);
}

.container {
    margin: auto;
    width: 85%;
}
</style>
