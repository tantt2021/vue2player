import * as types from './mutation-types';
import {
    setUserId,setHistoryList,setMode

} from '@/utils/storage'

// 设置网易云用户UID
export const setUid = function ({ commit }, uid) {
    commit(types.SET_UID, setUserId(uid));
}

// 选择播放（会更新整个播放列表）
export const selectPlay = function ({ commit }, { list, index }) {
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_ORDERLIST, list)
    commit(types.SET_CURRENTINDEX, index)
    commit(types.SET_PLAYING, true)
}

// 设置播放历史
export const setHistory = function ({ commit }, music) {
    commit(types.SET_HISTORYLIST, setHistoryList(music));
}

// 设置播放顺序
export const setPlayMode = function ({ commit }, mode) {
    commit(types.SET_PLAYMODE, setMode(mode));
}