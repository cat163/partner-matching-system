import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      Components({
      resolvers: [VantResolver()],
    }),],
    server: {
        cors: true, // 允许跨域
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080',
            }
        }
    }

})

