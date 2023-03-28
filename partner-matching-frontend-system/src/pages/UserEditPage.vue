<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
          :rules="[{ required: true, message: '请填写'+editUser.editName }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'
import {ref} from "vue";

import {showToast} from "vant";
import myAxios from "../plugins/myAxios";
import {getCurrentUser} from "../services/user";

const route = useRoute();
const router = useRouter();

const editUser = ref({
  editKey : route.query.editKey,
  editName : route.query.editName,
  currentValue: route.query.currentValue,
})


const onSubmit =async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser){
    showToast({
      message: "用户未登入",
      type: "fail"
    })
  }
  console.log(currentUser)
  const res =  await myAxios.post("/user/update",{
    'id': currentUser.id,
    [editUser.value.editKey as string]: editUser.value.currentValue
  })
  console.log(res,'更新请求');
  if (res.code === 0 && res.data > 0){
    showToast({
      message: "修改成功",
      type: "success"
    })
    router.back();
  }else {
    showToast({
      message: "修改错误",
      type: "fail"
    })
  }
};
</script>

<style scoped>

</style>