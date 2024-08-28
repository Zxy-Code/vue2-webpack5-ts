<template>
    <div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {};
    }
};
</script>

<style lang="less">
@import "../../libs/css/base.less";
</style>
