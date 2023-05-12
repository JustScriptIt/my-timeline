<template>
    <div class="list">
        <div class="list__header">
            <div class="list__header-name">Название</div>
            <div class="list__header-duration">Продолжительность</div>
            <div class="list__header-start">Начало</div>
        </div>
        <MediaBlockInline
            class="list__item"
            v-for="block in mediaBlocks"
            :key="block.id"
            :block="block"
            @updateBlock="updateBlock"
            @deleteBlock="deleteBlock"
        />
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from "vue";
import { MediaBlock as IMediaBlock } from "../store/appStore";
import {useStore} from "vuex";
import MediaBlockInline from "@/components/MediaBlockInline.vue";

export default defineComponent({
    name: "MediaBlockList",
    components: {MediaBlockInline},
    props: {
        mediaBlocks: {
            type: Array as PropType<IMediaBlock[]>,
            required: true,
        }
    },
    emits: ["updateBlock", "deleteBlock"],
    setup(props, {emit}) {
        const store = useStore()

        const blocks = computed(() => {
            return props.mediaBlocks.map((mediaBlock: IMediaBlock) => {
                const blockWidth = () => mediaBlock.duration * 100/ (24 * 60 * 60);
                return {
                    mediaBlock: mediaBlock,
                    width: `${blockWidth}%`,
                };
            });
        })

        const deleteBlock = (mediaBlock: IMediaBlock) => {
            emit("deleteBlock", mediaBlock.id)
        }

        const updateBlock = (mediaBlock: IMediaBlock) => {
            emit("updateBlock", mediaBlock)
        }

        return {
            blocks,
            deleteBlock,
            updateBlock
        }
    }
})
</script>

<style lang="scss" scoped>
.list {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    font-size: 18px;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-track {
        background: lightgray;
    }

    &::-webkit-scrollbar-thumb {
        background: black;
    }

    &__header {
        display: flex;
        align-items: center;
        justify-content: start;
        width: 100%;
        height: 30px;
        margin-bottom: 10px;
        padding: 0 10px;
        font-size: 20px;
        font-weight: bold;

        &-name {
            width: 30%;
        }

        &-duration {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30%;
        }

        &-start {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30%;
        }
    }

    &__item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: start;
        width: 100%;
        height: 30px;
    }
}
</style>