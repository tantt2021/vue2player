// 网易云用户UID
export const uid = state => state.uid;

// 播放状态
export const playing = state => state.playing;
// 播放列表
export const playlist = state => state.playlist;
// 顺序列表
export const orderlist = state => state.orderlist;
// 当前音乐索引
export const currentIndex = state => state.currentIndex;

// audio元素
export const audioEle = state => state.audioEle;

// 当前音乐
export const currentMusic = state => {
    return state.playlist[state.currentIndex] || {}
}


// 播放历史列表
export const historyList = state => state.historyList;