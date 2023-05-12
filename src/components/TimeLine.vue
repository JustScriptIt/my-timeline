<template>
  <div class="timeline__wrapper">
      <div class="timeline">
          <MediaBlock
              v-for="block in blocks"
              :key="block.mediaBlock.id"
              :block="block.mediaBlock"
              :width="block.width"
              @updateBlock="updateBlock"
              @deleteBlock="deleteBlock"
          />
          <div class="timeline__start">
              <span>{{ startTime }}</span>
          </div>
          <div class="timeline__end">
              <span>{{ endTime }}</span>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from "vue";
import MediaBlock from "@/components/MediaBlock.vue";
import { MediaBlock as IMediaBlock } from "../store/appStore";
import {useStore} from "vuex";

    export default defineComponent({
        name: "TimeLine",
        components: {
            MediaBlock
        },
        props: {
            mediaBlocks: {
                type: Array as PropType<IMediaBlock[]>,
                required: true,
            },
            formattedStart: {
                type: String
            },
            formattedEnd: {
                type: String
            }
        },
        emits: ["updateBlock", "deleteBlock"],
        setup(props, {emit}) {
            const store = useStore()

            const startTime = computed(() => {
                return props.formattedStart
            })
            const endTime = computed(() => {
                return props.formattedEnd
            })

            const deleteBlock = (mediaBlock: IMediaBlock) => {
                emit("deleteBlock", mediaBlock.id)
            }

            const updateBlock = (mediaBlock: IMediaBlock) => {
                emit("updateBlock", mediaBlock)
            }

            const blocks = computed(() => {
                return props.mediaBlocks.map(mediaBlock => {
                    const blockWidth = (mediaBlock.duration * 100)/ (24 * 60 * 60);

                    return {
                        mediaBlock: mediaBlock,
                        width: `${blockWidth}%`,
                    };
                });
            })

            return {
                blocks,
                deleteBlock,
                updateBlock,
                startTime,
                endTime
            }
        }
    })
</script>

<style lang="scss" scoped>
.timeline {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: start;
    height: 30%;
    min-width: 200%;

    &__wrapper {
        display: flex;
        align-items: center;
        justify-content: start;
        width: 100%;
        height: 90%;
        background: rgba(225, 225, 225, .5);
        border-radius: 10px;
        overflow-x: auto;
        overflow-y: hidden;

        &::-webkit-scrollbar {
            height: 5px;
        }

        &::-webkit-scrollbar-track {
            background: lightgray;
        }

        &::-webkit-scrollbar-thumb {
            background: black;
        }
    }

    &__start, .timeline__end {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: absolute;
        bottom: 0;
        font-size: 10px;
    }

    &__start {
        left: 0;
        transform: translate(10%, 300%);
    }

    &__end {
        right: 0;
        transform: translate(-10%, 300%);
    }

    & span {
        display: inline-block;
    }
}
</style>
