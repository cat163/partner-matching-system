<template>
  <div id="teamPage">
    <van-search v-model="searchText"
                placeholder="搜索队伍"
                @search="onSearch"/>
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public"/>
      <van-tab title="私有" name="private"/>
    </van-tabs>
    <van-button class="add-button" type="primary" icon="plus" @click="doJoinTeam"/>
    <team-card-list :team-list="teamList"/>
    <van-empty v-if="teamList?.length < 1" description="数据为空" />
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showToast} from "vant";

const router = useRouter();

const teamList = ref([]);
const myJoinTeamList = ref([]);


const searchText = ref("");
const active = ref("public")

const onTabChange = (name : string) => {
  if (name === "public") {
    // 查公开
    listTeam(searchText.value, 0)
  } else {
    // 加密
    listTeam(searchText.value, 2)
  }
}

// 跳转到加入队伍列
const doJoinTeam = () => {
  router.push({
    path: "/team/add"
  })
}

/**
 * 搜索队伍
 * @param val
 * @param status
 */
const listTeam = async (val = '', status = 0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
      status: status
    }
  })
  if (res.code === 0) {
    teamList.value = res.data;
    showToast({
      message: "加载队伍成功",
      type: "success"
    })
  } else {
    showToast({
      message: "加载队伍失败，请刷新重试",
      type: "fail"
    })
  }
}

/**
 * 搜索我加入的队伍
 * @param val
 */
const listMyJoinTeam = async (val = '') => {
  const res = await myAxios.get("/team/list/my/join", {
    params: {
      searchText: val,
      pageNum: 1,
    }
  })
  if (res.code === 0) {
    myJoinTeamList.value = res.data;
    showToast({
      message: "加载队伍成功",
      type: "success"
    })
  } else {
    showToast({
      message: "加载队伍失败，请刷新重试",
      type: "fail"
    })
  }
}

onMounted( () => {
  listTeam()
})

const onSearch = (val) => {
  listTeam(val)
}

</script>

<style scoped>

</style>