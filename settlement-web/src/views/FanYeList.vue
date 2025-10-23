<template>
  <div class="fan-ye-list">
    <!-- 顶部导航栏 -->
    <van-nav-bar
        title="翻页列表"
        left-text="返回"
        right-text="退出"
        @click-left="onClickLeft"
        @click-right="onClickRight"
    />

    <!-- 搜索框 -->
    <div class="search-container">
      <van-search
          v-model="searchValue"
          placeholder="请输入搜索关键词"
          @search="onSearch"
      />
    </div>

    <!-- 列表内容 -->
    <div class="list-container">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
          <van-cell
              v-for="item in list"
              :key="item.id"
              :title="item.title"
              :value="item.value"
              :label="item.description"
              @click="onItemClick(item)"
          />
        </van-list>
      </van-pull-refresh>
    </div>

    <!-- 底部操作栏 -->
    <van-tabbar v-model="activeTab">
      <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name="list" icon="bars" dot>列表</van-tabbar-item>
      <van-tabbar-item name="user" icon="user-o" badge="5">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showConfirmDialog } from 'vant'

const router = useRouter()

// 搜索相关
const searchValue = ref('')

// 列表相关状态
const list = ref([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

// 底部标签栏
const activeTab = ref('list')

// 模拟数据
const mockData = [
  {
    id: 1,
    title: '项目一',
    value: '100',
    description: '这是第一个项目的描述信息',
    status: '进行中'
  },
  {
    id: 2,
    title: '项目二',
    value: '200',
    description: '这是第二个项目的描述信息',
    status: '已完成'
  },
  {
    id: 3,
    title: '项目三',
    value: '150',
    description: '这是第三个项目的描述信息',
    status: '待开始'
  },
  {
    id: 4,
    title: '项目四',
    value: '300',
    description: '这是第四个项目的描述信息',
    status: '进行中'
  },
  {
    id: 5,
    title: '项目五',
    value: '250',
    description: '这是第五个项目的描述信息',
    status: '已完成'
  }
]

// 导航栏点击事件
const onClickLeft = () => {
  router.back()
}

const onClickRight = () => {
  showConfirmDialog({
    title: '确认退出',
    message: '您确定要退出登录吗？',
  })
      .then(() => {
        // 清除登录状态
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        showToast('退出成功')
        router.push('/login')
      })
      .catch(() => {
        // 取消退出
      })
}

// 搜索功能
const onSearch = () => {
  if (searchValue.value.trim()) {
    showToast(`搜索: ${searchValue.value}`)
    // 这里可以调用搜索API
    onRefresh()
  }
}

// 下拉刷新
const onRefresh = () => {
  // 清空列表
  list.value = []
  finished.value = false
  loading.value = true
  onLoad()
}

// 上拉加载更多
const onLoad = () => {
  setTimeout(() => {
    if (refreshing.value) {
      list.value = []
      refreshing.value = false
    }

    // 添加模拟数据
    for (let i = 0; i < 5; i++) {
      const newItem = {
        ...mockData[i % mockData.length],
        id: list.value.length + i + 1
      }
      list.value.push(newItem)
    }

    loading.value = false

    // 模拟数据加载完成
    if (list.value.length >= 15) {
      finished.value = true
    }
  }, 1000)
}

// 列表项点击事件
const onItemClick = (item) => {
  showToast(`点击了: ${item.title}`)
  // 这里可以跳转到详情页
  // router.push(`/detail/${item.id}`)
}

// 页面加载时检查登录状态
onMounted(() => {
  const token = localStorage.getItem('token')
  if (!token) {
    showToast('请先登录')
    router.push('/login')
    return
  }

  // 可以在这里加载用户信息或其他初始化数据
  console.log('页面加载完成，用户已登录')
})
</script>

<style scoped>
.fan-ye-list {
  min-height: 100vh;
  background-color: #f7f8fa;
  padding-bottom: 50px; /* 为底部标签栏留出空间 */
}

.search-container {
  padding: 10px;
  background: white;
}

.list-container {
  margin-top: 10px;
}

/* 自定义列表项样式 */
:deep(.van-cell) {
  border-bottom: 1px solid #ebedf0;
}

:deep(.van-cell__title) {
  font-weight: 600;
  color: #323233;
}

:deep(.van-cell__value) {
  color: #ee0a24;
  font-weight: bold;
}

:deep(.van-cell__label) {
  color: #969799;
  font-size: 12px;
  margin-top: 4px;
}

/* 加载状态样式 */
.loading-text {
  text-align: center;
  padding: 16px;
  color: #969799;
  font-size: 14px;
}
</style>
