<template>
    <div>
        <div class="intro">
            <div class="bg-wrapper">
                <div class="gray"></div>
                <div class="bg" :style="style"></div>
            </div>

            <div class="main-info clearfix">
                <div class="poster fl">
                    <img :src="basic.img" alt="" mode="widthFix">
                    <i class="iconfont icon-bofang"></i>
                </div>

                <div class="summary fl">
                    <h3>{{basic.name}}</h3>
                    <h3>{{basic.nameEn}}</h3>
                    <p>{{basic.mins}}</p>
                    <p>{{type}}</p>
                    <p>{{releaseDate}}{{basic.releaseArea}}上映</p>
                    <i v-if="basic.commentSpecial">&ldquo;{{basic.commentSpecial}}&bdquo;</i>
                    <span v-for="(type,index) in screenType" :key="index">{{type}}</span>
                </div>

                <div class="score fr"><span>{{score[0]}}.</span><span>{{score[2]}}</span></div>
            </div>

            <div class="story">
                <p :style="[arrowUp? {height: 'auto'}: {height: '95rpx'}]" >剧情：{{basic.story}}</p>
                <i class="iconfont" :class="[arrowUp ? 'icon-jiantoushang': 'icon-jiantouxia']" @tap="toggle"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import store from "../../store";
    import { request, convertDate } from "../../utils";
    import { obj2style } from "../../common/basic";

    export default {
        name: "movieDetail",
        data() {
            return {
                movieId: "",
                basic: {
                    img: '',
                    story: ''
                },
                type: [],
                releaseDate: '',
                score: '',
                screenType: [],
                arrowUp: false
            };
        },
        computed: {
            id() {
                return store.state.id;
            },
            style() {
                const background = {
                    background: `url(${this.basic.img}) no-repeat`,
                    'background-size': '100%',
                    'background-position': 'center 10%',
                    filter: 'blur(20rpx)',
                    transform: 'scale(1.1)'
                }
                return obj2style(background)
            }
        },
        methods: {
            async getMovie() {
                const res = await request({
                    type: "GET",
                    url: `https://ticket-api-m.mtime.cn/movie/detail.api?locationId=${this.id}&movieId=${this.movieId}`
                });
                const data = res.data.data.basic;
                this.basic = data;
                this.type = data.type.join(' / ');
                this.releaseDate = convertDate(data.releaseDate);
                this.score = data.overallRating !== ~~data.overallRating ? data.overallRating + '' : data.overallRating + '.0';

                let screenType = ['is3D', 'isDMAX', 'isIMAX', 'isIMAX3D'];
                let map = ['3D','中国巨幕','IMAX','IMAX 3D'];
                let arr = [];
                screenType.forEach((type, index) => {
                    if (data[type]) {
                        arr.push(map[index])
                    }
                });
                this.screenType = arr;
                wx.setNavigationBarTitle({
                    title: this.basic.name
                });
            },
            toggle() {
                this.arrowUp = !this.arrowUp;
            }
        },
        onLoad(data) {
            this.movieId = data.movieId;
        },
        mounted() {
            this.getMovie();
        }
    };
</script>

<style lang="scss" scoped>
    .intro {
        height: auto;
        width: 100%;
        position: relative;
        overflow: hidden;
        background: #eee;
        border-bottom: 1px solid #000;
        .bg-wrapper {
            width: 100%;
            height: 200rpx;
            position: absolute;
            top: 0;
            left: 0;
            overflow: hidden;
            background: #aaa;
            .gray {
                width: 100%;
                height: 100%;
                background: rgba(141, 141, 141, 0.4);
                position: absolute;
                top: 0;
                left: 0;
                z-index: 2;
            }
            .bg {
                width: 100%;
                height: 100px;
            }
        }

        .main-info {
            position: absolute;
            width: 100%;
            height: auto;
            margin: 100rpx 0 20rpx;
            background: #fff;
            z-index: 3;
            .poster {
                position: relative;
                width: 240rpx;
                margin-left: 20rpx;
                display: flex;
                img {
                    width: 100%;
                }
                .iconfont {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 90rpx;
                    color: #fff;
                }
            }
            .summary {
                width: 328rpx;
                height: 100%;
                padding: 0 20rpx;
                h3 {
                    color: #fff;
                    font-size: 18px;
                }
                h3:nth-of-type(2) {
                    font-size: 12px;
                    line-height: 18px;
                    margin-bottom: 22rpx;
                }
                p, i {
                    font-size: 12px;
                    line-height: 48rpx;
                    color: #000;
                }
                i {
                    color: #e9701c;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                span {
                    color: #aaa;
                    border: 1px solid #aaa;
                    font-size: 10px;
                    line-height: 12px;
                    margin-right: 10rpx;
                    padding: 0 5rpx;
                }

            }
            .score {
                background: #55a532;
                color: #fff;line-height:48rpx;
                font-size:18px;
                margin:60rpx 10rpx 0 0;
                padding:14rpx;
                span:nth-of-type(2) {
                    font-size: 12px;
                    vertical-align: super;
                }
            }
        }
        .story {
            margin-top: 480rpx;
            background: #fff;
            p{
                font-size: 16px;
                line-height: 24px;
                padding: 10rpx 20rpx 0;
                height: auto;
                overflow: hidden;
                transition: all 500ms ease;
            }
            i {
                color: #ccc;
                width: 100%;
                text-align: center;
                line-height: 24px;
            }
        }
    }
</style>
