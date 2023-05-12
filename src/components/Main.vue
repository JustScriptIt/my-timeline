<template>
    <main>
        <div class="container container_main">
            <div class="container__top">
                <VuePicDatepicker
                    v-model="selectedDate"
                    :placeholder="formattedSelectedDate"
                />
                <div class="floor floor-timeline">
                    <TimeLine
                        :media-blocks="mediaBlocksInDate"
                        :formattedStart="formattedStartDate"
                        :formattedEnd="formattedEndDate"
                        @updateBlock="showUpdateModal"
                        @deleteBlock="showDeleteModal"
                    />
                </div>
            </div>
            <div class="container__bottom">
                <div class="container__bottom_left">
                    <h2>Список медиа-блоков</h2>
                    <div class="floor floor-list">
                        <MediaBlockList
                            :media-blocks="mediaBlocksInDate"
                            @updateBlock="showUpdateModal"
                            @deleteBlock="showDeleteModal"
                        />
                    </div>
                </div>
                <MyButton
                    class="button"
                    @click="() => showCreateModal()"
                >
                    Добавить
                </MyButton>
            </div>
            <CreateModal
                :isShow="isCreateModalShow"
                :selectedMediaBlock="selectedMediaBlock"
                @closeCreateModal="closeCreateModal"
            />
        </div>
    </main>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watch} from "vue";
import { useStore } from 'vuex'
import {MediaBlock as IMediaBlock} from "@/store/appStore";
import TimeLine from "@/components/TimeLine.vue"
import MediaBlockList from "@/components/MediaBlockList.vue";
import MyButton from "@/components/UI/MyButton.vue";
import CreateModal from "@/components/modals/CreateModal.vue";
import VuePicDatepicker from "@vuepic/vue-datepicker";
import '@vuepic/vue-datepicker/dist/main.css'

export default defineComponent({
    components: {
        CreateModal,
        MediaBlockList,
        MyButton,
        TimeLine,
        VuePicDatepicker
    },
    setup() {
        const store = useStore();

        const selectedDate = ref(new Date());
        const selectedMediaBlock = ref<IMediaBlock | undefined>(undefined);

        const isCreateModalShow = computed(() => store.getters.createModalIsShow);

        const showCreateModal = (mediaBlockForUpdate?: IMediaBlock) => {
            if (mediaBlockForUpdate) {
                selectedMediaBlock.value = mediaBlockForUpdate;
            } else {
                selectedMediaBlock.value = undefined;
                store.dispatch("setDialogFields");
            }
            store.dispatch('showCreateModal');
        };

        const showUpdateModal = (mediaBlockForUpdate: IMediaBlock) => {
            selectedMediaBlock.value = mediaBlockForUpdate;
            showCreateModal(mediaBlockForUpdate);
        };

        const showDeleteModal = () => {
            store.dispatch('showDeleteModal');
        };

        const closeCreateModal = () => {
            store.dispatch("closeCreateModal");
        };

        const mediaBlocksInDate = computed(() => {
            const start = new Date(selectedDate.value).setHours(0, 0, 0, 0);
            const end = new Date(selectedDate.value).setHours(23, 59, 59, 999);
            return store.getters.showMediaBLocks(start, end);
        });

        const formatDate = (date: Date) => {
            const day = date.getDate().toString().padStart(2, "0");
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");

            return `${hours}:${minutes} ${day}.${month}.${year}`;
        }

        const formattedSelectedDate = computed(() => {
            const date = new Date(selectedDate.value).setHours(0, 0, 0, 0);
            return formatDate(new Date(date));
        });

        const formattedStartDate = computed(() => {
            const startDate = new Date(selectedDate.value).setHours(0, 0, 0, 0);
            return formatDate(new Date(startDate));
        });

        const formattedEndDate = computed(() => {
            const endDate = new Date(selectedDate.value).setHours(23, 59, 59, 999);
            return formatDate(new Date(endDate));
        });

        return {
            selectedDate,
            selectedMediaBlock,
            isCreateModalShow,
            showCreateModal,
            closeCreateModal,
            showUpdateModal,
            showDeleteModal,
            formatDate,
            formattedSelectedDate,
            formattedStartDate,
            formattedEndDate,
            mediaBlocksInDate,
        }
    }
})</script>

<style lang="scss" scoped>
main {
    height: 100vh;
    padding: 20px 0 90px;
}

.container {
    &_main {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        height: 100%;
    }

    &__top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        height: 30%;
        width: 100%;
    }

    &__bottom {
        display: flex;
        align-items: start;
        justify-content: space-between;
        width: 100%;
        height: 65%;

        &_left {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: column;
            width: 82%;
            height: 100%;
        }

        & .button {
            margin-top: 55px;
        }
    }
}

.floor {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    padding: 20px;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: inset 0 0 15px rgba(66, 66, 66, 0),
                inset 0 0 20px rgba(255, 255, 255, 0),
                7px 7px 15px rgba(58, 58, 58, 0.25);

    &-timeline {
        align-items: center;
        margin-top: 28px;
        height: 80%;
        width: 100%;
    }

    &-list {
        align-items: start;
        margin-top: 28px;
        width: 100%;
    }
}

.dp__theme_light {
    width: 30%;
    --dp-border-radius: 15px;
    --dp-background-color: transperent;
}
</style>