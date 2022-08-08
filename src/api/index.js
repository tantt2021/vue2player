import axios from '@/utils/axios'
import { formatTopSongs } from '@/utils/songs'
import {defaultLimit} from '@/config'

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL

// 排行榜列表
export function getToplistDetail() {
    return axios.get('/toplist/detail')
}

// 推荐歌单
export function getPersonalized(){
    return axios.get('/personalized')
}

//用户登录 获取用户歌单详情
export function getUserPlaylist(uid) {
    return axios.get('/user/playlist', {
        params: {
            uid
        }
    })
}

// 歌单详情
export function getPlaylistDetail(id) {
    return new Promise((resolve, reject) => {
        axios
            .get('/playlist/detail', {
            params:{id}
        })
        .then(({ playlist }) => playlist || {})
        .then(playlist => {
            const { trackIds, tracks } = playlist
            if (!Array.isArray(trackIds)) {
                reject(new Error('获取歌单详情失败'))
                return
            }
            // 过滤完整歌单 如排行榜
            if (tracks.length === trackIds.length) {
                playlist.tracks = formatTopSongs(playlist.tracks);
                resolve(playlist);
                return;
            }
            // 限制歌单详情最大500
            const ids = trackIds
                .slice(0, 500)
                .map(v => v.id)
                .toString()
            getMusicDetail(ids).then(({ songs }) => {
                playlist.tracks = formatTopSongs(songs)
                resolve(playlist)
            })
        })
    })
}

// 获取歌曲详情
export function getMusicDetail(ids) {
    return axios.get('/song/detail', {
        params: {
            ids
        }
    })
}


// 搜索
export function search(keywords, page = 0, limit = defaultLimit) {
    return axios.get('/search', {
        params: {
            offset: page * limit,
            limmit: limit,
            keywords
        }
    })
}

// 热搜
export function searchHot() {
    return axios.get('/search/hot')
}


// 获取音乐的评论
export function getComment(id, page, limit = defaultLimit) {
    return axios.get('/comment/music', {
        params: {
            offset: page * limit,
            limit: limit,
            id
        }
    })
}