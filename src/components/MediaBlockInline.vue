<template>
    <div
        class="block-inline"
        :style="blockStyle"
    >
        <div class="block-inline__name">
            {{ block.name }}
        </div>
        <div class="block-inline__duration">
            {{ formattedDuration }}
        </div>
        <div class="block-inline__start">
            {{ formattedStartTime }}
        </div>
        <div class="block-inline__buttons">
            <button
                class="block-inline__button block-inline__button_update"
                @click="updateBLock"
            >
                &#128736;
            </button>
            <button
                class="block-inline__button block-inline__button_delete"
                @click="openDeleteModal"
            >
                &#10006;
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from "vue";
import {MediaBlock as IMediaBlock} from "@/store/appStore";
import {useStore} from "vuex";

export default defineComponent({
    name: "MediaBlockInline",
    props: {
        block: {
            type: Object as PropType<IMediaBlock>,
            required: true
        }
    },
    emits: ["updateBlock", "deleteBlock"],
    setup(props, {emit}) {
        const store = useStore();

        const blockStyle = computed(() => ({
                'background': props.block?.color
            })
        )

        const openDeleteModal = () => {
            store.dispatch("showDeleteModal")
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


        return {
            blockStyle,
            openDeleteModal,
            updateBLock,
            formattedDuration,
            formattedStartTime
        }
    }
})
</script>

<style lang="scss" scoped>
.block-inline {
    border-radius: 15px;
    padding: 20px 10px;

    &:not(:last-child) {
        margin-bottom: 10px;
    }

    &__name {
        width: 30%;
        font-weight: bold;
    }

    &__duration {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30%;
    }

    &__start {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30%;
    }

    &__buttons {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 45px;
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
}
</style>