
import { defaultVolume } from '@/config';

const _storage = window.localStorage
const storage = {
    get(key, data = []) {
        if (_storage) {
            return _storage.getItem(key)
                ? Array.isArray(data)
                    ? JSON.parse(_storage.getItem(key))
                    : _storage.getItem(key)
                : data
        }
    },
    set(key, val) {
        if (_storage) {
            _storage.setItem(key,val)
        }
    },
    clear(key) {
        if (_storage) {
            _storage.removeItem(key);
        }
    }
}

// 用户id
const USERID_KEY = '__mmPlayer_userID__';
// 获取用户uid
export function getUserId() {
    return Number(storage.get(USERID_KEY,null))
}
// 修改用户uid
export function setUserId(uid) {
    storage.set(USERID_KEY, uid)
    return uid
}

// 音量
const VOLUME_KEY = '__player_volume__';
// 获取音量
export function getVolume() {
    const volume = storage.get(VOLUME_KEY, defaultVolume);
    return Number(volume);
}
// 修改音量
export function setVolume(volume) {
    storage.set(VOLUME_KEY, volume);
    return volume;
}

// 获取播放历史
const HISTORYLIST_KEY = '__mmPlayer_historyList__';
const historyListMAX = 200;
export function getHistoryList() {
    return storage.get(HISTORYLIST_KEY);
}

// 更新播放历史
export function setHistoryList(music) {
    let list = storage.get(HISTORYLIST_KEY);
    const index = list.findIndex(item => {
        return item.id === music.id
    });
    if (index === 0) {
        return list
    }
    if (index > 0) {
        list.splice(index, 1);
    }
    list.unshift(music);
    if (historyListMAX && list.length > historyListMAX) {
        list.pop();
    }
    storage.set(HISTORYLIST_KEY, JSON.stringify(list));
    return list;
} 


// 播放模式
const MODE_KEY = 'playerMode';
// 获取播放模式
export function getMode() {
    return storage.get(MODE_KEY, null);
}
// 修改播放模式
export function setMode(mode) {
    storage.set(MODE_KEY, mode);
    return mode;
}
