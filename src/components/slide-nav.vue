<template>
    <div>
        <scroll-view class="swiper-tab" scroll-x>
            <view v-for="(item,index) in navList" :key="index" :data-index="index" class="swiper-tab-item" @tap="changeCurrent">{{item.title}}</view>
            <view class="border" :style="position">
                <view class="border-bg"></view>
            </view>
        </scroll-view>
    </div>
</template>

<script>
    import {obj2style} from "../common/basic";

    export default {
        name: 'slideNav',
        data() {
            return {
                navWidth: ''
            }
        },
        props: {
            navList: {
                type: Array
            },
            currentTab: {
                type: Number
            }
        },
        computed: {
            position() {
                const left = this.navWidth * this.currentTab + 'px';
                let style = {
                    left
                }
                return obj2style(style);
            }
        },
        methods: {
            changeCurrent(e) {
                const current = e.target.dataset.index;
                console.log(e.target)
                const query = wx.createSelectorQuery();
                query.selectAll('.swiper-tab-item').boundingClientRect(res => {
                    this.navWidth = res[current].width;
                    console.log(this.navWidth)
                }).exec()

                if (this.currentTab === current) return false;
                this.$emit('update:currentTab', current)
            }
        },
        mounted() {
            const query = wx.createSelectorQuery();
            query.select('.swiper-tab-item').boundingClientRect(res => {
                this.navWidth = res.width;
            }).exec()
        }
    }
</script>

<style lang="scss" scoped>
    .swiper-tab{
        width: 550rpx;
        overflow: hidden;
        white-space: nowrap;
        background: #222;
        position: relative;
        .swiper-tab-item {
            color: #ccc;
            display: inline-block;
            height: auto;
            /*width: 132rpx;*/
            width: auto;
            padding: 0 35rpx;
            font-size: 15px;
            line-height: 36px;
            text-align: center;
        }
        .border {
            display: block;
            position: absolute;
            left: 0;
            top: 66rpx;
            height: 6rpx;
            width: 60rpx;
            padding: 0 36rpx;
            transition: left 0.2s;
            z-index: 99;
            .border-bg {
                height: 100%;
                width: 100%;
                background: #ff5d84;
            }
        }
    }
</style>
