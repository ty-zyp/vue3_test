import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'
export default mergeConfig(
  viteConfig,
  defineConfig({
    define: {
      'import.meta.vitest': 'undefined', // 源码内联测试配置
    }, 
    test: {
      // 启用基准测试模式  
      mode: 'benchmark',  
      // globals: true, // 全局引入vitest 位置一
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      includeSource: ['src/**/*.{js,ts}'], 
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: 'istanbul', // or 'v8'  默认使用v8
        reporter: ['text', 'html', 'json'],
        // reporters: ['verbose'],
        reporters: ['html'],
        // reportsDirectory: './tests/unit/coverage', // 修改输出报告位置
        exclude:['src/**/icons'] //不需要单元测试覆盖的地方
      },
      // browser: {
      //   enabled: true,
      //   name: 'chrome', // browser name is required
      // },
    }
  })
)