import { Commit } from "vuex";

export interface ModalState {
    createModalIsShow: boolean;
    deleteModalIsShow: boolean;
}

const modalsStore = {
    state: () => ({
        createModalIsShow: false,
        deleteModalIsShow: false,
    }),
    mutations: {
        showCreateModal(state: ModalState) {
            state.createModalIsShow = true;
        },
        closeCreateModal(state: ModalState) {
            state.createModalIsShow = false;
        },
        showDeleteModal(state: ModalState) {
            state.deleteModalIsShow = true;
        },
        closeDeleteModal(state: ModalState) {
            state.deleteModalIsShow = false;
        }
    },
    actions: {
        showCreateModal({ commit }: { commit: Commit }) {
            commit("showCreateModal");
        },
        closeCreateModal({ commit }: { commit: Commit }) {
            commit("closeCreateModal");
        },
        showDeleteModal({ commit }: { commit: Commit }) {
            commit("showDeleteModal");
        },
        closeDeleteModal({ commit }: { commit: Commit }) {
            commit("closeDeleteModal");
        }
    },
    getters: {
        createModalIsShow(state: ModalState) {
            return state.createModalIsShow;
        },
        deleteModalIsShow(state: ModalState) {
            return state.deleteModalIsShow;
        }
    }
};

export default modalsStore;
