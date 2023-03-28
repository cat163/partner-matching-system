<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit('username','昵称',user.username)"/>
    <van-cell title="账号" :value="user.userAccount"/>
    <van-cell title="头像" is-link to="/user/edit">
      <template #right-icon>
        <van-image
            contain
            width="3rem"
            height="3rem"
            :src="user.avatarUrl"
        />
      </template>
    </van-cell>
    <van-cell title="性别" is-link to="/user/edit" :value="user.gender" @click="toEdit('gender','性别',user.gender)"/>
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email"/>
    <van-cell title="注册时间" :value="user.createTime.toLocaleString() "/>
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