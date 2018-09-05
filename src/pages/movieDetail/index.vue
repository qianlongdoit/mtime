<template>
    <div>
        <div class="intro">
            <div class="bg-wrapper">
                <div class="bg" :style="style"></div>
            </div>

            <div class="main-info">
                <img :src="movie.basic.img" alt="" mode="widthFix">
            </div>
        </div>
    </div>
</template>

<script>
    import store from "../../store";
    import { request } from "../../utils";
    import { obj2style } from "../../common/basic";

    export default {
        name: "movieDetail",
        data() {
            return {
                movieId: "",
                movie: {},
                basic: null
            };
        },
        computed: {
            id() {
                return store.state.id;
            },
            style() {
                if (this.basic) {
                    const background = {
                        background: `url(${this.basic.img}) no-repeat`,
                        'background-size': '100%',
                        'background-position': 'center 10%',
                        filter: 'blur(20rpx)',
                        transform: 'scale(1.1)'
                    }
                    return obj2style(background)
                }
            }
        },
        methods: {
            async getMovie() {
                const res = await request({
                    type: "GET",
                    url: `https://ticket-api-m.mtime.cn/movie/detail.api?locationId=${this.id}&movieId=${this.movieId}`
                });
                this.movie = res.data.data;
                this.basic = this.movie.basic;
                wx.setNavigationBarTitle({
                    title: this.basic.name
                });
                console.log(this.movie)
            }
        },
        onLoad(data) {
            this.movieId = data.movieId;
            this.getMovie();
        },
        mounted() {

        }
    };
</script>

<style lang="scss" scoped>
    .intro {
        height: 500rpx;
        width: 100%;
        position: relative;
        .bg-wrapper {
            width: 100%;
            height: 200rpx;
            position: absolute;
            top: 0;
            left: 0;
            overflow: hidden;
            .bg {
                width: 100%;
                height: 100px;
            }
        }

        .main-info {
            position: absolute;
            width: 100%;
            height: 100%;
            border-bottom: 1px solid #cc3343;
            img {
                width: 200rpx;
            }
        }
    }
</style>
