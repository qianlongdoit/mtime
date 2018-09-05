<template>
    <div class="scroll-wrapper">
        <scroll-view class="swiper-tab" scroll-x :scroll-left="scrollX">
            <view v-for="(item,index) in navList" :key="index" :data-index="index" :id="item.type" class="swiper-tab-item" @tap="changeCurrent">{{item.title}}</view>
            <view class="border" :style="position">
                <view class="border-bg"></view>
            </view>
        </scroll-view>
    </div>
</template>

<script>
    import {obj2style} from "../common/basic";
    import { request } from '../utils/index'

    export default {
        name: 'slideNav',
        data() {
            return {
                navWidth: '',
                left: 0,
                scrollX: '',
                scale: 0
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
                let style = {
                    left: this.left[this.currentTab] + 'px',
                    width: this.navWidth[this.currentTab] + 'px'
                }

                return obj2style(style);
            }
        },
        methods: {
            changeCurrent(e) {
                const current = e.target.dataset.index;

                if (this.currentTab === current) return false;

                const scrollX = this.left[current];
                this.scrollX = scrollX > 200 ? scrollX - 20 : 0;

                this.$emit('update:currentTab', current)
            }
        },
        mounted() {
            const query = wx.createSelectorQuery();
            query.selectAll('.swiper-tab-item').boundingClientRect(res => {
                this.navWidth = res.map((v, k) => v.width);
                this.left = res.map((v, k) => v.left);
            }).exec()

            this.scale = wx.getSystemInfoSync().windowWidth / 750;
        }
    }
</script>

<style lang="scss" scoped>
    .scroll-wrapper {
        display: inline-block;
        width: 550rpx;
    }
    .swiper-tab{
        width: inherit;
        overflow: hidden;
        white-space: nowrap;
        background: #222;
        position: relative;
        .swiper-tab-item {
            color: #ccc;
            display: inline-block;
            height: inherit;
            width: auto;
            margin: 0 35rpx;
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
