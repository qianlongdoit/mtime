<template>
    <scroll-view class="onsale" scroll-x :scroll-left="scrollX">
        <view class="onsale-item" v-for="(movie, index) in movies" :key="index" @tap="movieDetail(movie.movieId)">
            <view class="img-wrapper">
                <img :src="movie.img" alt="">
                <view class="presale" v-if="movie.isPresale">预售</view>
                <view class="imax" v-if="movie.screenType">{{movie.screenType}}</view>
                <view class="score" v-if="movie.r > 0">{{movie.r === ~~movie.r ? movie.r + '.0' : movie.r}}</view>
            </view>

            <p>{{movie.tCn}}</p>
        </view>
    </scroll-view>
</template>

<script>
    export default {
        name: "onsale-intro",
        data() {
            return {
                movies: [],
                screenType: ['is3D', 'isDMAX', 'isIMAX', 'isIMAX3D']
            }
        },
        props: {
            ms: []
        },
        watch: {
            ms(newValue, oldValue) {
                if (this.ms.length > 15) {
                    this.movies = this.ms.slice(0, 15);
                    this.movies.forEach((v, k) => {
                        v.isPresale = isPresale(v.rd);
                        this.screenType.forEach((type, key) => {
                            if (v[type]) {
                                return v.screenType = type.replace(/is/,'');
                            }
                        })
                    })
                }

                function isPresale(s) {
                    var date =  s.slice(0, 4) + '-' + s.slice(4, 6) + '-' + s.slice(6);
                    return Date.parse(date) > Date.parse(new Date());
                }
            },

        },
        methods: {
            movieDetail(id) {
                wx.navigateTo({
                    url: `/pages/movieDetail/main?movieId=${id}`
                })
            }
        },
        mounted() {}
    };
</script>

<style lang="scss" scoped>
    .onsale {
        overflow: hidden;
        white-space: nowrap;
        .onsale-item {
            display: inline-block;
            margin: 0 5px;
            width: 200rpx;
            .img-wrapper {
                position: relative;
                border: 1px solid #ddd;
                display: flex;
                height: 100%;
                width: 100%;
                .presale {
                    position: absolute;
                    top: 0;
                    left: 5px;
                    font-size: 9px;
                    line-height: 20px;
                    padding: 0 5rpx;
                    color: #fff;
                    background: #55a532;
                }
                .imax {
                    position: absolute;
                    top: 0;
                    right: 0;
                    background: rgba(0, 0, 0, 0.4);
                    font-size: 9px;
                    line-height: 20px;
                    color: #fff;
                    padding: 0 2px;
                    border-radius: 2px;;
                }
                img {
                    height: 280rpx;
                    width: 200rpx;
                    font-size: 0;
                }
                .score {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    background: #55a532;
                    color: #fff;
                    font-size: 11px;
                    line-height: 22px;
                    padding: 0 5px;
                    border-radius: 2px;
                }
            }
            p {
                width: 200rpx;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 12px;
                line-height: 24px;
                text-align: center;
            }
        }
    }
</style>
