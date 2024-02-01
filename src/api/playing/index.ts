//统一管理用户相关的接口
import request from "@/utils/request";
//项目用户相关的请求地址
enum API {
    Search_URL="/search/",
    GetSong_URL="/song_file/",
    GetLyrics_URL="/lyrics/"


}

//搜索歌曲列表
export const reqSongInfo = (Songtype:string,keyword:string)=>request.get<any,any>(API.Search_URL+`${Songtype}/${keyword}`);

export const reqSongUrl = (newId:string)=>request.get<any>(API.GetSong_URL + newId);

export const reqLyricsUrl = (newId:string)=>request.get<any>(API.GetLyrics_URL + newId);
/*
    搜索歌曲：
    https://music-api.tonzhon.com/search/{p}/{keyword}
    p 的取值：m, n, q, k
    keyword: 搜索关键词
    https://music-api.tonzhon.com/search/m/%E6%9D%8E%E5%85%8B%E5%8B%A4

    获取歌曲 URL:
    https://music-api.tonzhon.com/song_file/{newId}
    newId: song.newId

    获取歌词：
    https://music-api.tonzhon.com/lyrics/{newId}
*/


