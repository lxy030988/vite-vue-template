# 文件上传

### 代码

- [web](https://github.com/lxy030988/vite-vue-template)
- [egg](https://github.com/lxy030988/egg-server)

### 基础版

- 点击上传 (web: 859dda5d5ad2a7c25c74b8cedbe29afdf2a62c3c) (egg: fffd00f9c37a00ddc9b3beee7bb0f75cbc685526)
- 拖拽上传 (web: bf4d4f08451f03e3119ed843d44a8988c6d1c089) 
- 进度条  (web: 7c2644dfd952b401368ddb58d22ffbf5605ae05b) 

### 进阶版

- 二进制信息确认文件类型 (web: 6eaabad46f2e88b1b7e48c949a4dbfe561fe9912)

  - 优点：和后缀名校验文件类型相比，可以避免因为修改后缀名造成的文件类型校验错误

- 计算文件的md5值

  - web worker 计算md5值 (web: 5f0e0c8daecdc6c483302115d1882d25ac789c8d)

    - 缺点：不能在web worker中引入 npm 包，只能通过self引入js文件；

      不能使用window、document对象

    - 优点：单独的线程，不会阻塞主线程

  - 时间切片 计算md5值 (web: 8b5259b41d82c868100c22e46f960456506b27c0)
    - 利用浏览器的空余时间进行计算 window.requestIdleCallback
  - 抽样md5 (web: c8166a39e7a41606c4fa0fbcedebf9d5dcf58008)
    - 优点：快
    - 缺点：有很小的概率出现：文件不同，md5相同

- 切片上传 (web: cbb6cd4e4191792f683310d930b0b825cb9c71e2) (egg: e3fffeb66e864b1f1ade6ef3fbcb223b6d7333eb)
- 切片合并 (web: e5831f543028531efbc0357467f83b0b52b6a1a1) (egg: 4e0af57431070d78e02052792d75c55064fe50cb)
- 文件秒传 (web: 857822275b7d2f04a8ab4816adc9419b51906452)
- 断点续传 (web: 486505b7e1dfb849e67b7c48027c23bb7a2dee54)
- 请求并发控制 (web:ce688c67d1543a3f08810df803f9bfc7da3c1d6d)
- 报错重试、报错次数限制 (web:a2a8c5f7ca7173f602050a3d738f4604001cbca5) (egg:32b268f3bc3ad5a448c1449c483847cd1785f17c)

