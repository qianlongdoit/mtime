<template>
    <div>
        <slide-nav :navList="this.navList" :currentTab.sync="currentTab"></slide-nav>

        currentTab: {{currentTab}}
        <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>
    </div>
</template>

<script>
    import slideNav from '@/components/slide-nav'
    import {navList} from '@/common/basic'

    export default {
        data() {
            return {
                navList: navList,
                currentTab: 0
            }
        },
        components: {
            slideNav
        },
        methods: {},

        created() {

        }
    }
</script>

<style lang="scss" scoped>

</style>
