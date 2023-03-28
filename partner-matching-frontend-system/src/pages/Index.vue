<template>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode"/>
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1" description="数据为空" />
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios";
import {showToast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const isMatchMode = ref<Boolean>(false);
const userList = ref([]);
const loading = ref(true)

const route = useRoute();
const { tags } = route.query;

const loadData =async () => {
  let userListData = [];
  loading.value = true;
  // 心动模式
  if (isMatchMode.value) {
    const num = 10;
    userListData = await myAxios.get('/user/match', {
      params: {
        num
      }
    }).then(function (response) {
      console.log("/user/match succeed",response);
      showToast({
        message: "请求成功",
        type: "success"
      })
      return response?.data;
    })
        .catch(function (error) {
          console.error("/user/match error", error);
          showToast({
            message: "请求失败",
            type: "fail"
          })
        });
  } else {
    // 普通模式
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 8,
        pageNum: 1
      }
    }).then(function (response) {
      console.log("/user/recommend succeed",response);
      showToast({
        message: "请求成功",
        type: "success"
      })
      return response?.data?.records;
    })
        .catch(function (error) {
          console.error("/user/recommend error", error);
          showToast({
            message: "请求失败",
            type: "fail"
          })
        });
  }
  if (userListData){
    userListData.forEach( (user: { tags: string; }) => {
      user.tags = JSON.parse(user.tags)
    })
    userList.value = userListData;
  }
  loading.value = false;
}

watchEffect(() => {
  loadData();
})
</script>

<style scoped>

</style>