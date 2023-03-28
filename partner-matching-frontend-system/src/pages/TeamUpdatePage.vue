<template>
  <div id="teamAddPage" v-if="addTeamData">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队伍名"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请输入队伍名' }]"
        />
        <van-field
            v-model="addTeamData.description"
            rows="1"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />
        <van-field
            v-model="addTeamData.expireTime"
            is-link
            readonly
            name="datePicker"
            label="过期时间"
            placeholder="请选择过期时间"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker @confirm="onConfirm" @cancel="showPicker = false" />
        </van-popup>
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-if="addTeamData.status === '2'"
            v-model="addTeamData.password"
            type="password"
            name="userPassword"
            label="队伍密码"
            placeholder="请输入队伍密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showToast} from "vant";

const router = useRouter();
const route = useRoute();
const id = route.query.id

// 需要用户填写表单数据
const addTeamData = ref({});

// 获取当前的队伍数据
onMounted(async () => {
  if (id <= 0) {
    showToast({
      message: "队伍加载失败",
      type: "fail"
    })
    return;
  }
  const res = await myAxios.get("/team/get", {
    params:{
      id
    }
  });
  if (res?.code === 0 && res.data) {
    addTeamData.value = res.data
    showToast({
      message: "获取成功",
      type: "success"
    })
  }else {
    showToast({
      message: "获取失败",
      type: "success"
    })
  }
})

const showPicker = ref(false);

// 日期确认
const onConfirm = ({ selectedValues }) => {
  addTeamData.value.expireTime = selectedValues.join('-').concat(" 00:00:00");
  showPicker.value = false;
};

// 提交
const onSubmit = async () => {
  // todo 前端参数校验
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status)
  }
  const res = await myAxios.post("/team/update", postData);
  if (res?.code === 0 && res.data) {
    showToast({
      message: "更新成功",
      type: "success"
    })
    await router.push({
      path: '/team',
      replace: true
    })
  } else {
    showToast({
      message: "更新失败",
      type: "fail"
    })
  }
}
</script>

<style scoped>

</style>