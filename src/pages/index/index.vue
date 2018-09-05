<template>
    <div>
        <div class="header clearfix">
            <slide-nav :navList="this.navList" :currentTab.sync="currentTab"></slide-nav>
            <i class="iconfont icon-sousuo"></i>
            <i class="iconfont icon-saoyisao"></i>
        </div>

        <swiper class="swiper" indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
                :duration="duration" :indicator-color="'#fff'" :indicator-active-color="'#333'">

            <swiper-item class="swiper-item" v-for="(item, index) in images" :key="index">
                <img :src="item" alt="">
            </swiper-item>
        </swiper>

        <h3 class="onsale clearfix">
            正在售票
            <span>· {{city}}市 <i class="iconfont icon-jiantouxia"></i></span>
            <a class="fr" href="/pages/onsale/main">
                <span>{{movies.length}}部 <i class="iconfont icon-jiantouyou"></i></span>
            </a>
        </h3>

        <onsale :ms="movies"></onsale>

        currentTab: {{currentTab}}
    </div>
</template>

<script>
    import slideNav from '@/components/slide-nav'
    import onsale from '@/components/onsale-intro'
    import city from '@/asset/city'
    import {navList} from '@/common/basic'
    import {request} from '@/utils/index'
    import store from "../../store";

    export default {
        data() {
            return {
                navList: navList,
                currentTab: 0,
                indicatorDots: true,
                autoplay: true,
                circular: true,
                interval: 4000,
                duration: 1000,
                images: [
                    "../../../static/img/40_o.jpg",
                    "../../../static/img/42_o.jpg",
                    "../../../static/img/66_o.jpg",
                    "../../../static/img/93_o.jpg",
                    "../../../static/img/97_o.jpg"
                ],
                city: '北京',
                movies: []
            }
        },
        computed: {
            id() {
                return store.state.id
            }
        },
        methods: {},
        components: {
            slideNav,
            onsale
        },
        mounted() {
            //  获取地址信息
            const _this = this;
            wx.getLocation({
                type: 'wgs84',
                success: function(result) {
                    const lat = result.latitude;
                    const long = result.longitude;
                    const key = 'SIFBZ-N3FKU-P7LV5-2VFA3-KOGLO-5NFW6';
                    request({
                        method: 'GET',
                        url: `http://apis.map.qq.com/ws/geocoder/v1/?location=${lat},${long}&key=${key}`
                    }).then(res => {
                        if (res.data.status !== 0) return;
                        _this.city = res.data.result.address_component.city.replace(/市/, '');

                        //  获取id
                        city.forEach((v, k) => {
                            if (v.n === _this.city) {
                                store.state.id = v.id;
                            }
                        });

                        request({
                            method: 'GET',
                            url: `https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=${_this.id}`
                        }).then(res => {
                            _this.movies = res.data.ms;
                        }).catch(e => {
                            console.log(e)
                        });

                    }).catch(e => {
                        console.log(e)
                    })
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    .header {
        background: #222;
        height: 72rpx;
        i {
            float: right;
            color: #fff;
            font-size: 42rpx;
            line-height: 72rpx;
            margin: 0 25rpx;
        }
    }
    .swiper {
        width: 100%;
        height: 300rpx;
    }

    .swiper-item {
        width: 100%;
        height: auto;
        img {
            width: 750rpx;
            height: 300rpx;
        }
    }
    .onsale {
        color: #000;
        font-size: 16px;
        line-height: 90rpx;
        height: 90rpx;
        padding: 0 10rpx;
        span {
            color: #aaa;
        }
    }
    .movies {
        height: 270rpx;
        width: 100%;
        overflow: auto;
    }
</style>
