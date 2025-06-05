import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import compression from 'vite-plugin-compression';
import zipPack from 'vite-plugin-zip-pack';
import { name } from './package.json';

// import Icons from 'unplugin-icons/vite';
// import IconsResolver from 'unplugin-icons/resolver';
// import AutoImport from 'unplugin-auto-import/vite';
// import Components from 'unplugin-vue-components/vite';

const resolve = (path) => fileURLToPath(new URL(path, import.meta.url));

export default ({ mode }) => {
    // eslint-disable-next-line no-undef
    const { VITE_PORT, VITE_BASE_URL, VITE_DROP_CONSOLE, VITE_APP_PROJECT } = loadEnv(mode, process.cwd());

    return defineConfig({
        base: VITE_BASE_URL,
        plugins: [
            vue(),
            vueJsx(),
            legacy(),
            compression({
                verbose: true, // 是否在控制台输出压缩结果
                disable: false, // 是否禁用 gzip 压缩
                threshold: 10240, // 压缩文件的大小阈值（以字节为单位）
                algorithm: 'gzip', // 压缩算法
                ext: '.gz', // 压缩文件的后缀名
                deleteOriginFile: false, // 是否删除原文件
                // 需要压缩的文件类型
                filter: (filename) => {
                    return /(\.js$|\.css$|\.html$)/.test(filename);
                },
            }),
            zipPack({
                inDir: 'dist',
                outDir: './dist',
                outFileName: `${name}-${VITE_APP_PROJECT}.zip`,
            }),
        ],
        resolve: {
            alias: {
                '@': resolve('src'),
                Api: resolve('src/api'),
                Assets: resolve('src/assets'),
                Constant: resolve('src/constant'),
                Mock: resolve('src/mock'),
                Utils: resolve('src/utils'),
                Store: resolve('src/store'),
                Router: resolve('src/router'),
                Locales: resolve('src/locales'),
                Hooks: resolve('src/hooks'),
                Views: resolve('src/views'),
                Components: resolve('src/components'),
                Layouts: resolve('src/components/layouts'),
                Icons: resolve('src/components/icons'),
                Widgets: resolve('src/components/widgets'),
                Style: resolve('src/style'),
            },
        },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                },
            },
        },
        esbuild: {
            // 移除日志打印及debugger
            drop: VITE_DROP_CONSOLE === 'true' ? ['console', 'debugger'] : [],
        },
        // 依赖优化 - 预构建
        optimizeDeps: {
            include: ['vue', 'vue-router', 'vue-i18n', 'axios', 'pinia'],
            exclude: [],
        },
        server: {
            // 端口号
            port: VITE_PORT,
            // 监听所有地址
            host: true,
            // 服务启动时是否自动打开浏览器
            open: false,
            // 允许跨域
            cors: true,
            // 自定义代理规则
            proxy: {},
            // 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
            warmup: {
                clientFiles: ['./index.html', './src/{views,components}/*'],
            },
        },
        build: {
            // 设置最终构建的浏览器兼容目标
            target: 'es2015',
            // 构建后是否生成 source map 文件
            sourcemap: false,
            //  chunk 大小警告的限制（以 kbs 为单位）
            chunkSizeWarningLimit: 2000,
            // 启用/禁用 gzip 压缩大小报告
            reportCompressedSize: false,
            // 自定义底层的 Rollup 打包配置
            rollupOptions: {
                output: {
                    // 指定 chunks 的入口文件模式
                    entryFileNames: 'static/js/[name]-[hash].js',
                    // 对代码分割中产生的 chunk 自定义命名
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    // 自定义构建结果中的静态资源名称
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
                    // 压缩 Rollup 产生的额外代码
                    compact: true,
                    // 创建自定义的公共 chunk
                    manualChunks: {
                        vue: ['vue', 'vue-router', 'vue-i18n'],
                    },
                },
            },
        },
    });
};
