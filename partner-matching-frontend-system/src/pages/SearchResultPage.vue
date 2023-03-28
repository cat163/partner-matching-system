<template>
  <user-card-list :user-list="userList"/>
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showToast} from "vant";
import UserCardList from "../components/UserCardList.vue";
const userList = ref([]);

const route = useRoute();
const { tags } = route.query;
onMounted ( async () => {
   const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
     paramsSerializer: {
       indexes: null
     }
  })
  .then(function (response) {
    console.log("/user/search/tags succeed",response);
    showToast({
      message: "请求成功",
      type: "success"
    })
    return response?.data;
  })
  .catch(function (error) {
    console.error("/user/search/tags error", error);
    showToast({
      message: "请求失败",
      type: "fail"
    })
  });
   if (userListData){
     userListData.forEach( (user: { tags: string; }) => {
       user.tags = JSON.parse(user.tags)
     })
     userList.value = userListData;
   }
})


// const mockUser = {
//     id: 1,
//     username: "whq",
//     userAccount: "whq",
//     avatarUrl: "https://images.ctfassets.net/hrltx12pl8hq/01rJn4TormMsGQs1ZRIpzX/02e9885a9ae69312da844bc58eedced1/Artboard_Copy_22.png?fit=fill&w=600&h=400",
//     gender: 1,
//     userProfile:"dasdasdasdssssssssssssa,sadasd撒旦杰卡斯电脑卡死的年代晚期二点五",
//     phone: "21233123",
//     email: "dwdasdasd@qq.com",
//     userRole: 1,
//     tags: ["java","python","c++","c","汇编语言"],
//     createTime: new Date(),
//   }


</script>

<style scoped>

</style>