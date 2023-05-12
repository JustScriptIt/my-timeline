<template>
    <div
        class="media-block"
        :style="blockStyle"
    >
        <div class="media-block__buttons">
            <button
                class="media-block__button media-block__button_update"
                @click="updateBLock"
            >
                &#128736;
            </button>
            <button
                @click="openDeleteModal"
                class="media-block__button media-block__button_delete"
            >
                &#10006;
            </button>
        </div>
        <div class="media-block__tooltip">
            Название: {{ block.name }}
        </div>
        <div class="media-block__end-time">
            <span>{{ formattedEndTime }}</span>
        </div>
    </div>
    <DeleteModal
        :isShow="deleteModalIsShow"
        :block="block"
        @deleteBlock="deleteBLock"
        @updateBlock="updateBLock"
        @closeDeleteModal="closeDeleteModal"
    />
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref} from "vue";
import { MediaBlock as IMediaBlock } from "../store/appStore";
import DeleteModal from "@/components/modals/DeleteModal.vue";
import {useStore} from "vuex";

export default defineComponent({
    name: "MediaBlock",
    components: {
        DeleteModal,
    },
    props: {
        width: {
            type: String as PropType<string>
        },
        block: {
            type: Object as PropType<IMediaBlock>,
            required: true
        }
    },
    emits: ["updateBlock", "deleteBlock"],
    setup(props, {emit}) {
        const store = useStore();

        const deleteModalIsShow = computed(() => store.getters.deleteModalIsShow)

        const blockStyle = computed(() => ({
                'min-width': props.width,
                'background': props.block?.color,
            })
        )

        const openDeleteModal = () => {
            store.dispatch("showDeleteModal")
        }

        const closeDeleteModal = () => {
            store.dispatch("closeDeleteModal")
        }

        const deleteBLock = () => {
            store.dispatch("removeMediaBlock", props.block?.id)
            closeDeleteModal()
        }

        const updateBLock = () => {
            emit("updateBlock", props.block)
        }

        const formattedDuration = computed(() => {
            const duration = props.block.duration;
            const hours = Math.floor(duration / 3600);
            const minutes = Math.floor((duration % 3600) / 60);
            const seconds = duration % 60;

            const hourString = hours > 0 ? `${hours} ч ` : "";
            const minuteString = `${minutes} мин `;
            const secondString = `${seconds} сек`;
            return hourString + minuteString + secondString;
        });

        const formattedStartTime = computed(() => {
            const timestamp = props.block.start;
            const date = new Date(timestamp);
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");
            const seconds = date.getSeconds().toString().padStart(2, "0");

            return `${hours}:${minutes}:${seconds}`;
        });

        const formattedEndTime = computed(() => {
            const timestamp = (props.block.start + props.block.duration * 1000);
            const date = new Date(timestamp);
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");
            const seconds = date.getSeconds().toString().padStart(2, "0");

            return `${hours}:${minutes}:${seconds}`;
        });

        return {
            deleteModalIsShow,
            blockStyle,
            openDeleteModal,
            closeDeleteModal,
            deleteBLock,
            updateBLock,
            formattedDuration,
            formattedStartTime,
            formattedEndTime
        }
    }
})
</script>

<style lang="scss" scoped>
.media-block {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    padding: 5px;
    height: 100%;
    border-radius: 5px;
    box-shadow: 10px 5px 5px rgba(0, 0, 0, .5);

    &__buttons {
        position: absolute;
        top: 5px;
        right: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 40px;
    }

    &__button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        border: none;
        border-radius: 50%;
        background: white;
        font-size: 15px;
        cursor: pointer;
    }

    &__tooltip {
        position: absolute;
        left: 50%;
        top: 20px;
        transform: translateX(-50%);
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        padding: 10px;
        font-size: 12px;
        white-space: nowrap;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
        z-index: 999;
        display: none;
        opacity: 0.8;
    }

    &__end-time {
        height: 30px;
        border-left: 1px solid #292D2D;
        position: absolute;
        right: 0;
        top: 10px;
        transform: translate(100%, -100%);
        font-size: 10px;

        & span {
            position: absolute;
            transform: translate(10%, -50%);
        }
    }
}

.media-block:hover .media-block__tooltip {
    display: flex;
}
</style>
