import { Commit } from "vuex";

export interface ModalState {
    isShow: boolean;
}

const modal = {
    state: () => ({
        isShow: false,
    }),
    mutations: {
        openModal(state: ModalState) {
            state.isShow = true;
        },
        closeModal(state: ModalState) {
            state.isShow = false;
        },
    },
    actions: {
        openModal({ commit }: { commit: Commit }) {
            commit("openModal");
        },
        closeModal({ commit }: { commit: Commit }) {
            commit("closeModal");
        },
    },
    getters: {
        isShow(state: ModalState) {
            return state.isShow;
        }
    }
};

export default modal;
