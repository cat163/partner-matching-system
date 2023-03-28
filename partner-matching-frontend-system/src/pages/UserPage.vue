<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.username"/>
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
  </template>
</template>


<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, onUpdated, ref} from "vue";
import {showToast} from "vant";
import {getCurrentUser} from "../services/user";

const router = useRouter();
// const user = {
//   id: 1,
//   username: 'ddd',
//   userAccount: 'ssss',
//   avatarUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
//   gender: '男',
//   phone: '123131233',
//   email: 'sdfsafsa@qq.com',
//   createTime: new Date(),
// };

const user = ref();

onMounted(async () => {
  const res = await getCurrentUser();
  if (res){
    user.value = res;
  }else {
    showToast({
      message: "获取用户信息失败",
      type: "fail"
    })
  }
})

const toEdit = (editKey : string, editName : string, currentValue : string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue
    }
  })
};
</script>

<style scoped>

</style>