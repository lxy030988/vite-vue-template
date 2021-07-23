<template>
  <div class="jc-login-wrap">
    <div class="jc-login-contain">
      <h1>行政执法设备授权平台</h1>
      <div class="jc-login-info">
        <div class="jc-login-user">
          <div class="jc-user-box"></div>
          <div class="jc-user-title">用户登录</div>
          <div class="jc-user-box"></div>
        </div>
        <a-form :model="form">
          <a-form-item>
            <a-input
              v-model:value="form.account"
              placeholder="账号"
            >
              <template #prefix>
                <svg-icon name="login-user"></svg-icon>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-model:value.trim="form.userPwd"
              type="password"
              placeholder="密码"
            >
              <template #prefix>
                <svg-icon name="login-password"></svg-icon>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              @click="onSubmit"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, reactive, toRaw } from 'vue'
import { getUserInfo } from '@/api/user'
import { Md5 } from 'ts-md5/dist/md5'
import { useMyStore } from '@/hooks'
interface UserInfo {
  account: string
  userPwd: string
}

export default defineComponent({
  name: 'Login',
  setup() {
    const form = reactive<UserInfo>({
      account: '',
      userPwd: ''
    })
    const { commit } = useMyStore()
    const onSubmit = async () => {
      try {
        const { account, userPwd } = toRaw(form)
        console.log(toRaw(form))
        const res = await getUserInfo({ account, userPwd })
        commit('user/SET_USER', res)
      } catch (error) {
        console.error(error)
      }
    }
    return {
      form,
      onSubmit
    }
  }
})
</script>

<style scoped lang="scss">
.jc-login-wrap {
  background: url('@/assets/bground.jpg');
  height: 100%;
  .jc-login-contain {
    float: right;
    margin-right: 200px;
    margin-top: 200px;
    h1 {
      font-size: 40px;
      color: $jc-color-white;
      margin-bottom: 40px;
      text-align: center;
    }
    .jc-login-info {
      width: 530px;
      height: 500px;
      border-radius: 20px;
      background: $jc-color-white;
      .jc-login-user {
        display: flex;
        padding: 60px 0;
        width: 300px;
        height: 20px;
        justify-content: space-between;
        margin: auto;
        .jc-user-box {
          width: 60px;
          height: 8px;
          background-image: linear-gradient(90deg, #008dff 0%, #503afb 100%);
          border-radius: 5px;
        }
        .jc-user-title {
          font-size: 28px;
          color: #333333;
          line-height: 8px;
        }
      }
      .ant-form {
        padding: 0 70px;
        .ant-form-item {
          .ant-input-affix-wrapper {
            background: #f9f9f9;
            padding: 13px 10px 13px 24px;
            border-radius: 8px;
            overflow: hidden;
            .svg-icon {
              width: 24px;
              height: 24px;
              margin-right: 20px;
            }
            ::v-deep(.ant-input) {
              background: #f9f9f9;
              font-size: 20px;
            }
          }

          .ant-btn {
            margin-top: 50px;
            width: 100%;
            background-image: linear-gradient(90deg, #008dff 0%, #503afb 100%);
            border-radius: 8px;
            height: 54px;
            font-size: 20px;
            color: $jc-color-white;
          }
        }
      }
    }
  }
}
</style>