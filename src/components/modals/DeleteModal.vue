<template>
    <div class="modal" v-if="isShow">
        <div class="modal__content">
            <h3 class="modal__message">
                Вы действительно хотите удалить медиа-блок "{{ block.name }}"?
            </h3>
            <div class="modal__buttons">
                <MyButton
                    class="modal__button modal__button_success"
                    @click="successDelete"
                >
                    Да
                </MyButton>
                <MyButton
                    class="modal__button modal__button_cancel"
                    @click="cancelDelete"
                >
                    Отмена
                </MyButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import MyButton from "@/components/UI/MyButton.vue";
import {MediaBlock as IMediaBlock} from "@/store/appStore";

export default defineComponent({
    name: "DeleteModal",
    components: {
        MyButton
    },
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        block: {
            type: Object as PropType<IMediaBlock>,
        }
    },
    emits: ["deleteBlock", "closeDeleteModal"],
    setup(props, {emit}) {
        const successDelete = () => {
            emit("deleteBlock", props.block?.id)
        }

        const cancelDelete = () => {
            emit("closeDeleteModal", false)
        }

        return {
            successDelete,
            cancelDelete
        }
    }
})
</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, .2);
    z-index: 2;

    &__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        width: 500px;
        height: 300px;
        padding: 50px;
        background: white;
        z-index: 2;
    }

    &__buttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__button {
        &_success  {
            margin-right: 10px;
        }
    }
}
</style>