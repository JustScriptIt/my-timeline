import {Commit} from "vuex";

export interface MediaBlock {
    id: number;
    name: string;
    duration: number;
    start: number;
    end: number;
    color: string
}

export interface MediaBlockState {
    mediaBlocks: MediaBlock[];
    dialogModel: Partial<MediaBlock>;
}

const appStore = {
    state: (): MediaBlockState => ({
        mediaBlocks: [],
        dialogModel: {},
    }),

    mutations: {
        createMediaBlock(state: MediaBlockState, mediaBlock: MediaBlock) {
            state.mediaBlocks.push(mediaBlock)
            state.mediaBlocks.sort((a, b) => a.start - b.start);
        },
        removeMediaBlock(state: MediaBlockState, mediaBlockId: number) {
            state.mediaBlocks = state.mediaBlocks.filter(targetBlock => targetBlock.id !== mediaBlockId)
        },
        updateMediaBlock(state: MediaBlockState, updatedMediaBlock: MediaBlock) {
            const index = state.mediaBlocks.findIndex(block => block.id === updatedMediaBlock.id);
            if (index !== -1) {
                state.mediaBlocks[index] = updatedMediaBlock;
            }
        },
        setMediaBlocks(state: MediaBlockState, mediaBlocks: MediaBlock[]) {
            state.mediaBlocks = mediaBlocks;
        },
        setDialogFields(state: MediaBlockState, payload: Partial<MediaBlock>) {
            state.dialogModel = { ...payload };
        }
    },
    actions: {
        createMediaBlock({commit, state}: { commit: Commit, state: MediaBlockState }, mediaBlock: MediaBlock) {
            mediaBlock.id = Date.now();
            commit("createMediaBlock", mediaBlock);
            localStorage.setItem("mediaBlocks", JSON.stringify(state.mediaBlocks));
        },
        removeMediaBlock({commit, state}: { commit: Commit, state: MediaBlockState }, mediaBlockId: number) {
            commit("removeMediaBlock", mediaBlockId);
            localStorage.setItem("mediaBlocks", JSON.stringify(state.mediaBlocks));
        },
        updateMediaBlock({ commit, state }: { commit: Commit; state: MediaBlockState }, updatedMediaBlock: MediaBlock) {
            commit("updateMediaBlock", updatedMediaBlock);
            localStorage.setItem("mediaBlocks", JSON.stringify(state.mediaBlocks));
        },
        setMediaBlocks({ commit }: { commit: Commit }) {
            return new Promise((resolve, reject) => {
                const mediaBlocks: MediaBlock[] = JSON.parse(localStorage.getItem("mediaBlocks") || "[]");
                commit("setMediaBlocks", mediaBlocks);
                resolve(mediaBlocks);
            }).catch((error) => {
                console.log(error);
                throw error;
            });
        },
        setDialogFields({ commit }: { commit: Commit }) {
            commit("setDialogFields", {
                name: "",
                duration: 0,
                start: 0,
                color: "",
            });
        }
    },
    getters: {
        showMediaBLocks: (state: MediaBlockState) => (startTime: number, endTime: number) => {
            return state.mediaBlocks.filter(
                (block: MediaBlock) => {
                    return (block.start) >= startTime && (block.start) + (block.duration) <= endTime;
                }
            );
        }
    }
}

export default appStore;