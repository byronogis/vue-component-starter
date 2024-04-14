<script setup lang="ts">
import {
  onMounted,
  reactive,
  ref,
  watch,
  watchEffect,
} from 'vue'
import { Repl, useStore, useVueImportMap } from '@vue/repl'
import '@vue/repl/style.css'

// retrieve some configuration options from the URL
const query = new URLSearchParams(location.search)

let Monaco: any
const isMounted = ref(false)
// 为了适配服务端渲染，组件本身，以及 Monaco 编辑器只在挂载完成后渲染
onMounted(() => {
  import('@vue/repl/monaco-editor').then((res) => {
    Monaco = res.default
    isMounted.value = true
  })
})

const {
  importMap: builtinImportMap,
  vueVersion,
  productionMode,
} = useVueImportMap({
  // specify the default URL to import Vue runtime from in the sandbox
  // default is the CDN link from jsdelivr.com with version matching Vue's version
  // from peerDependency
  runtimeDev: 'cdn link to vue.runtime.esm-browser.js',
  runtimeProd: 'cdn link to vue.runtime.esm-browser.prod.js',
  serverRenderer: 'cdn link to server-renderer.esm-browser.js',
})

const typescriptVersion = ref('5.4.5')

const store = useStore(
  {
    // pre-set import map
    builtinImportMap,
    vueVersion,
    typescriptVersion,
    // starts on the output pane (mobile only) if the URL has a showOutput query
    showOutput: ref(query.has('showOutput')),
    // starts on a different tab on the output pane if the URL has a outputMode query
    // and default to the "preview" tab
    outputMode: ref <any>(query.get('outputMode') || 'preview'),
  },
  // initialize repl with previously serialized state
  location.hash,
)

// persist state to URL hash
watchEffect(() => history.replaceState({}, '', store.serialize()))

// use a specific version of Vue
vueVersion.value = '3.4.21'
// production mode is enabled
productionMode.value = true

const previewOptions = reactive({})

// TS 版本切换部分
const tsVersions = ref<string[]>([])
/** 获取所有 TypeScript 版本 */
async function fetchTsVersions() {
  const res = await fetch('https://data.jsdelivr.com/v1/package/npm/typescript')
  const { versions } = (await res.json()) as { versions: string[] }
  tsVersions.value = versions.filter(v => !v.includes('dev') && !v.includes('insiders'))
}
fetchTsVersions()

// vue 版本切换相关
const vueVersions = ref<string[]>([])
/** 获取所有 Vue 版本 */
async function fetchVueVersions() {
  const res = await fetch('https://data.jsdelivr.com/v1/package/npm/vue')
  const { versions } = (await res.json()) as { versions: string[] }
  // if the latest version is a pre-release, list all current pre-releases
  // otherwise filter out pre-releases
  let isInPreRelease = versions[0].includes('-')
  const filteredVersions: string[] = []
  for (let i = 0; i < versions.length; i++) {
    const v = versions[i]
    if (v.includes('-')) {
      if (isInPreRelease) {
        filteredVersions.push(v)
      }
    }
    else {
      filteredVersions.push(v)
      isInPreRelease = false
    }
    if (v === '3.0.10') {
      break
    }
  }
  vueVersions.value = filteredVersions
}
fetchVueVersions()

const isVueLoading = ref(false)

watch(vueVersion, (v) => {
  v && setVueVersion(v)
})

function setVueVersion(v: string) {
  if (isVueLoading.value) {
    return
  }

  vueVersion.value = v
  // isVueLoading.value = true;

  // store.setVueVersion(v).finally(() => {
  //   isVueLoading.value = false;
  // });
}
</script>

<template>
  <div v-if="isMounted">
    <Repl
      :store="store"
      :editor="Monaco"
      :auto-resize="true"
      :clear-console="false"
      :preview-options="previewOptions"
    />

    <Teleport to=".VPNavBarSearch">
      <div class="flex items-center text-14px">
        <label class="playground-label">Vue: </label>
        <select v-model="vueVersion" class="playground-select" :disabled="isVueLoading">
          <option value="latest">
            latest
          </option>
          <option v-for="item in vueVersions" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
        <i class="mr-4" />
        <label class="playground-label">TypeScript: </label>
        <select v-model="typescriptVersion" class="playground-select">
          <option value="latest">
            latest
          </option>
          <option v-for="item in tsVersions" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
    </Teleport>
  </div>
</template>

<style scoped lang="postcss">
:deep(.vue-repl) {
  height: calc(100vh - var(--vp-nav-height));
}
</style>
