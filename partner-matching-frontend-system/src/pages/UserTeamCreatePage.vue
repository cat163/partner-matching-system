<template>
  <div id="teamPage">
    <van-search v-model="searchText"
                placeholder="搜索队伍"
                @search="onSearch"/>
    <van-button type="primary" @click="doJoinTeam">创建队伍</van-button>
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

const searchText = ref("");

// 跳转到加入队伍列
const doJoinTeam = () => {
  router.push({
    path: "/team/add"
  })
}

/**
 * 搜索队伍
 * @param val
 */
const listTeam = async (val = '') => {
  const res = await myAxios.get("/team/list/my/create", {
    params: {
      searchText: val,
      pageNum: 1,
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

onMounted( () => {
  listTeam()
})

const onSearch = (val) => {
  listTeam(val)
}

</script>

<style scoped>

</style>