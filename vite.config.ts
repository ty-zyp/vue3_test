import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@/': `${path.resolve(__dirname, 'src')}/`,
    }
  },

  // base: '/',
  server: {
    host: '0.0.0.0',
    // 设置代理，根据我们项目实际情况配置
    proxy: {
      '/api': {
        // target: 'http://localhost:8087/', // 本地
        // target: 'http://10.31.27.157:8087/', // 何海峰IP
        // target: 'http://10.31.27.228:8087/', // 李贤斌IP
        // target: 'http://10.31.27.199:8087/',
        target: 'http://10.31.16.227:8087/', // CRP
        changeOrigin: true, // 是否跨域
        rewrite: path => path.replace('/^\/api/', '/api'),
      },
    },
  },
})
