<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @update:model-value="delUpdate"
    />
  </form>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>

  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="medium" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      v-model:items="TagList"
  />
  <div style="padding: 20px">
    <van-button type="primary" block @click="doSearchResult">搜索</van-button>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
// 标签列表
const originTagList = [
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
    ],
  },
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'}
    ],
  },
];
// van-search
const searchText = ref('');
const onSearch = (val) => {
  // activeIds.value = TagList.flatMap(parentTag => parentTag.children).filter(item => item.text.includes(SearchText))
  TagList.value = originTagList.map(parentTag => {
    const tempChildren =  [...parentTag.children];
    const tempParentTag = {...parentTag}
    // 过滤children
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value))
    return tempParentTag;
  })
}
const onCancel = () => {
  searchText.value = '';
  TagList.value = originTagList;
}
const delUpdate = () => {
  if (searchText.value === ''){
    TagList.value = originTagList;
  }else {
    onSearch();
  }
}

// van-tag
// 关闭标签
const show = ref(true);
// 移除标签
const doClose = tag => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
};

// van-tree-select
// 已选中标签
const activeIds = ref([]);
const activeIndex = ref(0);
const TagList = ref(originTagList)

const doSearchResult = () => {
  router.push({
    path: '/user/list',
    query: {
      tags: activeIds.value
    }
  })
}

</script>

<style scoped>

</style>