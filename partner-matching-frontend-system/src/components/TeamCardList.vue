<template>
  <van-card v-for="team in props.teamList"
            :desc="team.description"
            :title="team.name"
            :thumb="iKun"
  >
    <template #tags>
      <van-tag plain type="danger" style="margin-right: 8px;margin-top: 8px">{{ teamStatusEnum[team.status] }}</van-tag>
    </template>
    <template #bottom>
      <div>
        {{ '队伍人数：' + team.hasJoinNum +'/' + team.maxNum }}
      </div>
      <div>
        {{ '最大人数: ' + team.maxNum }}
      </div>
      <div v-if="team.expireTime">
        {{ '过期时间: ' + team.expireTime }}
      </div>
      <div v-if="team.createTime">
        {{ '创建时间: ' + team.createTime }}
      </div>
    </template>
    <template #footer>
      <van-button v-if="team.userId !== currentUser?.id && !team.hasJoin" size="mini" type="primary" plain
                  @click="preJoinTeam(team)">加入队伍
      </van-button>
      <van-button v-if="team.userId === currentUser?.id" size="mini" type="small" plain
                  @click="doUpdateTeam(team.id)">更新队伍
      </van-button>
      <van-button v-if="team.userId !== currentUser?.id && team.hasJoin" size="mini" type="small" plain
                  @click="doQuitTeam(team.id)">退出队伍
      </van-button>
      <van-button v-if="team.userId === currentUser?.id" size="mini" type="danger" plain
                  @click="doDeleteTeam(team.id)">解散队伍
      </van-button>
    </template>
  </van-card>
  <van-dialog v-model:show="showPasswordDialog" title="标题" show-cancel-button @confirm="doJoinTeam">
    <van-field v-model="password" placeholder="请输入密码"/>
  </van-dialog>
</template>

<script setup lang="ts">

import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import iKun from "../assets/ikun.png"
import myAxios from "../plugins/myAxios";
import {showToast} from "vant";
import {getCurrentUser} from "../services/user";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const currentUser = ref();

const router = useRouter();

const showPasswordDialog = ref(false)

const password = ref("")

const joinTeamId = ref()

interface TeamCardList {
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardList>(), {
  teamList: [] as any
});

onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

const preJoinTeam = (team: TeamType) => {
    joinTeamId.value = team.id
    if(team.status === 0){
      doJoinTeam()
    }else {
      showPasswordDialog.value = true
    }
}


/**
 * 跳转至更新队伍列
 * @param id
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: "/team/update",
    query: {
      id
    }

  })
}

/**
 * 加入队伍
 */
const doJoinTeam = async () => {
  if (!joinTeamId.value) {
    return
  }
  const res = await myAxios.post("/team/join", {
    teamId: joinTeamId.value,
    password: password.value
  })
  if (res.code === 0) {
    showToast({
      message: "修改成功",
      type: "success"
    })
  } else {
    showToast({
      message: "加入失败," + (res.description ? `${res.description}` : ''),
      type: "fail"
    })
  }
}

/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post("/team/quit", {
    teamId: id
  })
  if (res.code === 0) {
    showToast({
      message: "退出队伍成功",
      type: "success"
    })
  } else {
    showToast({
      message: "退出队伍失败," + (res.description ? `${res.description}` : ''),
      type: "fail"
    })
  }
}

/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post("/team/delete", {
    id,
  })
  if (res.code === 0) {
    showToast({
      message: "解散队伍成功",
      type: "success"
    })
  } else {
    showToast({
      message: "解散队伍失败," + (res.description ? `${res.description}` : ''),
      type: "fail"
    })
  }
}

</script>

<style scoped>
:deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>