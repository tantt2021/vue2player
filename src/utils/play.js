// let retry = 1;

const playerMusic = {
    initAudio(that) {
        const ele = that.audioEle;
        // 音频缓冲事件
        ele.onprogress = () => {
            try {
                if (ele.buffered.length > 0) {
                    const duration = that.currentMusic.duration;
                    let buffered = 0;
                    ele.buffered.end(0);
                    buffered = ele.buffered.end(0) > duration ? duration : ele.buffered.end(0);
                    that.currentProgress = buffered / duration;
                }
            }catch(e){console.log(e);}
        }
        // 开始播放音乐
        ele.onplay = () => {
            let timer;
            clearTimeout(timer);
            timer = setTimeout(() => {
                that.musicReady = true
            },100)
        },
        ele.oncanplay = () => {
            // retry = 1;    
            if (that.historyList.length === 0 || that.currentMusic.id !== that.historyList[0].id) {
                that.setHistory(that.currentMusic)
            }
            }
        ele.ontimeupdate = () => {
            that.currentTime = ele.currentTime;
        }
    }
}
export default playerMusic;