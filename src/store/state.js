import { getUserId, getHistoryList, getMode } from "../utils/storage";
import { playMode } from "@/config";

export default {
    uid: getUserId() || null, // 网易云音乐UID,

    orderlist:[], // 顺序列表
    playlist: [], // 播放列表
    currentIndex: -1, //当前音乐索引
    playing:false, // 播放状态

    audioEle: null, //audio元素
    
    historyList: getHistoryList() || [], // 播放历史列表

    mode:Number(getMode()) || playMode.listLoop,  // 播放顺序，默认列表循环
}