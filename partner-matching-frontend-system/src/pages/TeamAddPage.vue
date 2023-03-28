<template>
  <div id="teamAddPage">
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
        <van-field name="stepper" label="队伍最大人数">
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" max="10" min="3"/>
          </template>
        </van-field>
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

import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showToast} from "vant";

const router = useRouter();

const initFromData = {
  "name": "",
  "description": "",
  "expireTime": null,
  "maxNum": 3,
  "password": "",
  "status": 0,
}

// 需要用户填写表单数据
const addTeamData = ref({...initFromData});

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
  const res = await myAxios.post("/team/add", postData);
  if (res?.code === 0 && res.data) {
    showToast({
      message: "添加成功",
      type: "success"
    })
    await router.push({
      path: '/team',
      replace: true
    })
  } else {
    showToast({
      message: "添加失败",
      type: "fail"
    })
  }
}
</script>

<style scoped>

</style>