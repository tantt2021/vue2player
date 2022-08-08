import { toHttps } from './util'

function filterSinger(singers) {
    let arr = [];
    singers.forEach(item => {
        arr.push(item.name)
    })
    return arr.join('/')
}
export class Song{
    constructor({ id, name,singer, album, image, duration, url }) {
        this.id = id,
        this.name = name,
        this.singer = singer,
        this.album = album,
        this.image = image,
        this.duration = duration,
        this.url = url
    }
}


export function createToplist(music) {
    return new Song({
        id: music.id,
        name: music.name,
        singer: music.ar.length > 0 && filterSinger(music.ar),
        album: music.al.name,
        image: toHttps(music.al.picUrl),
        duration: music.dt / 1000,
        url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`
    })
}

export function createPlaylist(music) {
    return new Song({
        id: music.id,
        name: music.name,
        singer: music.artists.length > 0 && filterSinger(music.artists),
        album: music.album.name,
        image: toHttps(music.album.picUrl) || null,
        duration: music.duration / 1000,
        url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`
    })
}


export const formatTopSongs = function formatTopList(list) {
    let Songs = [];
    list.forEach(item => {
        const musicData = item;
        if (musicData.id) {
            Songs.push(createToplist(musicData));
        }
    })
    return Songs
}

export const formatSongs = function
    formatPlayList(list) {
    let Songs = [];
    list.forEach(item => {
        const musicData = item;
        if (musicData.id) {
            Songs.push(createPlaylist(musicData))
        }
    })
    return Songs
}
export default formatSongs