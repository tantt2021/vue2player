
// 默认背景图片（本地或者网络）
const requireAll = requireContext => requireContext.keys().map(requireContext);    
const req = require.context('./assets/background', false);  //遍历文件夹中的指定文件,然后自动导入
const BG_ARR = requireAll(req); //生成数组
export const defaultBG = BG_ARR[Math.floor(Math.random() * BG_ARR.length)];  //暴露随机一张图片

// 默认分页数量
export const defaultLimit = 30

export const playMode = {
    listLoop: 0,  // 列表循环
    order: 1,    // 顺序播放
    random: 2,   // 随机播放
    loop: 3    // 单曲循环
}

// 默认音量
export const defaultVolume = 0.8