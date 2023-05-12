<template>
    <div class="modal" v-if="isShow">
        <div class="modal__content">
            <div class="modal__title">
                <h3>
                    {{
                        selectedMediaBlock?
                        "Редактировать блок" :
                        "Создать блок"
                    }}
                </h3>
            </div>
            <div class="modal__inputs">
                <input
                    class="modal__input"
                    name="name"
                    type="text"
                    v-model="dialogModel.name"
                    placeholder="Введите название"
                >
                <input
                    class="modal__input"
                    type="number"
                    ref="durationInput"
                    min="1"
                    max="7200"
                    v-model="dialogModel.duration"
                    placeholder="Укажите длительность"
                >
                <VuePicDatepicker
                    class="modal__picker modal__input"
                    v-model="dialogModel.start"
                    :placeholder="datePlaceholder"
                />
                <input
                    class="modal__input"
                    type="color"
                    v-model="dialogModel.color"
                >
            </div>
            <div class="modal__buttons">
                <MyButton
                    class="modal__button modal__button_success"
                    @click="create"
                >
                    {{
                        selectedMediaBlock ? "Сохранить" : "Создать"
                    }}
                </MyButton>
                <MyButton
                    class="modal__button modal__button_cancel"
                    @click="close"
                >
                    Отмена
                </MyButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType, watch} from "vue";
import store from "@/store";
import { MediaBlock as IMediaBlock } from "@/store/appStore";
import MyButton from "@/components/UI/MyButton.vue";
import VuePicDatepicker from "@vuepic/vue-datepicker";
import '@vuepic/vue-datepicker/dist/main.css'

export default defineComponent({
    name: "CreateModal",
    components: {
        MyButton,
        VuePicDatepicker
    },
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        selectedMediaBlock: {
            type: Object as PropType<IMediaBlock | null>,
            required: false,
            default: null,
        }
    },
    data() {
        return {
            dialogModel: {
                name: "",
                duration: 0,
                start: 0,
                color: "",
            },
            isErrorModalOpen: false,
            errorModalMessage: "",
        };
    },
    emits: ["update:isShow", "updated"],
    mounted() {
        watch(
            () => this.selectedMediaBlock,
            (newVal) => {
                if (newVal) {
                    this.dialogModel = {
                        ...newVal,
                        name: newVal.name || "",
                        duration: newVal.duration || 0,
                        start: newVal.start || 0,
                        color: newVal.color || "",
                    };
                }
            },
            { immediate: true }
        );
    },
    computed: {
        datePlaceholder(): string {
            const date = new Date(this.dialogModel.start).setHours(0, 0, 0, 0);
            const formatDate = (date: Date) => {
                const day = date.getDate().toString().padStart(2, "0");
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const year = date.getFullYear();
                const hours = date.getHours().toString().padStart(2, "0");
                const minutes = date.getMinutes().toString().padStart(2, "0");

                return `${hours}:${minutes} ${day}.${month}.${year}`;
            }
            return formatDate(new Date(date));
        },
    },
    methods: {
        create() {
            if (this.dialogModel.duration > 7200) {
                this.isErrorModalOpen = true;
                this.errorModalMessage = "Duration cannot be more than 7200 seconds";
                return;
            }

            this.dialogModel.start = new Date(this.dialogModel.start).getTime();
            const endTime = this.dialogModel.start + this.dialogModel.duration * 1000;

            if (!this.selectedMediaBlock && this.isTimeOverlap(this.dialogModel.start, this.dialogModel.start, endTime)) {
                this.isErrorModalOpen = true;
                this.errorModalMessage = "Time is busy";
                return;
            }

            if (this.selectedMediaBlock) {
                store.dispatch("updateMediaBlock", this.dialogModel);
            } else {
                store.dispatch("createMediaBlock", this.dialogModel);
            }
            this.$emit("updated");
            store.dispatch("closeCreateModal");
            this.dialogModel = {
                name: "",
                duration: 0,
                start: 0,
                color: "",
            };
        },
        close() {
            store.dispatch("closeCreateModal");
        },
        isTimeOverlap(newBlockStartTime: number, start: number, end: number) {
            const showMediaBLocks = store.getters.showMediaBLocks(start, end);
            return showMediaBLocks.some((block: IMediaBlock) => {
                const blockEnd = block.start + block.duration * 1000;
                return (newBlockStartTime >= block.start && newBlockStartTime < blockEnd) ||
                    (end > block.start && end <= blockEnd);
            });
        }
    },
})
</script>

<style lang="scss" scoped>
.modal {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, .2);

    &__title {
        font-size: 24px;
        text-transform: uppercase;
        margin-bottom: 40px;
    }

    &__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        width: 500px;
        padding: 50px;
        background: white;
        z-index: 2;
    }

    &__inputs {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        margin-bottom: 30px;
        width: 100%;
    }

    &__input {
        background: white;
        border: 1px solid black;
        margin-bottom: 10px;
    }

    &__buttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__button {
        &_success {
            margin-right: 10px;
        }
    }
}

input {
    width: 100%;
    height: 40px;
    padding: 5px 10px;
}
</style>