<template>
  <div class="login-container">
    <div class="login-form">
      <h2 class="login-title">系统登录</h2>

      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
              v-model="loginForm.username"
              name="username"
              label="用户名"
              placeholder="请输入用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
              v-model="loginForm.password"
              type="password"
              name="password"
              label="密码"
              placeholder="请输入密码"
              :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>

        <div style="margin: 16px;">
          <van-button
              round
              block
              type="primary"
              native-type="submit"
              :loading="loading"
              loading-text="登录中..."
          >
            登录
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import request from '@/utils/request'

const router = useRouter()
const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: ''
})

const onSubmit = async () => {
  loading.value = true

  try {
    // 按照接口文档构造请求数据
    const requestData = {
      userDto: {
        username: loginForm.username,
        password: loginForm.password,
        pageNo: 0,
        pageSize: 0,
        id: 0,
        phone: '',
        depId: 0,
        token: '',
        realName: '',
        jobNumber: 0,
        isDelete: 0,
        roleIds: [],
        roleNames: [],
        isUpdatePwd: 0
      }
    }

    const response = await request.post('/settlement/login/login', requestData)

    if (response.code === 200) {
      showToast('登录成功')

      // 存储token和用户信息
      localStorage.setItem('token', response.data.tokenInfo.tokenValue)
      localStorage.setItem('userInfo', JSON.stringify(response.data))

      // 跳转到首页
      router.push('/FanYeList')
    } else {
      showToast(response.msg || '登录失败')
    }
  } catch (error) {
    console.error('登录错误:', error)
    showToast('登录失败，请重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-form {
  background: white;
  border-radius: 12px;
  padding: 30px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
  font-weight: 600;
}
</style>
