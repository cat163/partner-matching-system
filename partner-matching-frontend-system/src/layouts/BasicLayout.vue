<template>
  <!--NavBar-->
  <van-nav-bar
      :title="title"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>
<!--主要内容-->
  <div id="content" style="padding-bottom: 50px">
    <router-view></router-view>
  </div>
  <!--Tabbar-->
  <van-tabbar v-model="active" @change="onChange" route>
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {showToast, ToastOptions} from "vant";
import {useRouter} from "vue-router";
import routes from "../config/route";

const router = useRouter()
const DEFAULT_TITLE = "伙伴匹配"
const title = ref(DEFAULT_TITLE)

/**
 * 根据当前路由切换标题
 */
router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path;
  })
  if (!route?.title){
    title.value =  DEFAULT_TITLE
  } else {
    title.value = route.title;
  }
})

const onClickLeft = () => {
  router.back()
};
const onClickRight = () => {
  router.push('/search')
};
const active = ref("index");
const onChange = (index: string | ToastOptions | undefined) => showToast(index);
</script>

<style scoped>

</style>