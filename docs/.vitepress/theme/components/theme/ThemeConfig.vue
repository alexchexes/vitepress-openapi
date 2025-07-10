<script setup lang="ts">
import type { SandboxData } from '../../sandboxData'
import { DEFAULT_OPERATION_SLOTS, useTheme } from 'vitepress-openapi/client'
import { inject } from 'vue'

const sandboxData = inject('sandboxData') as SandboxData

const themeConfig = useTheme()

const availablePagesTypes = [
  'PagesByOperation',
  'PagesBySpec',
  'PagesByTag',
  'Introduction',
]

const availableSidebarItemsTypes = [
  'default',
  'itemsByTags',
  'itemsByPaths',
]

const requestBodyViews = ['schema', 'contentType']
const jsonViewerRenderers = ['vue-json-pretty', 'shiki']
const responseCodeSelectors = ['tabs', 'select']
const playgroundModes = ['text', 'tree', 'table']
const operationBadges = ['deprecated', 'operationId']
</script>

<template>
  <div
    class="flex flex-col gap-4 p-2 overflow-y-auto"
  >
    <div class="flex flex-col gap-2">
      <h3>VitePress</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start gap-4">
        <label for="showSidebar" class="flex items-center gap-2">
          <input
            id="showSidebar"
            type="checkbox"
            :checked="sandboxData.showSidebar.value"
            @change="sandboxData.showSidebar.value = $event.target.checked"
          >
          Show sidebar
        </label>

        <label for="showAside" class="flex items-center gap-2">
          <input
            id="showAside"
            type="checkbox"
            :checked="sandboxData.showAside.value"
            @change="sandboxData.showAside.value = $event.target.checked"
          >
          Show aside
        </label>
      </div>
    </div>


    <div
      v-if="sandboxData.showSidebar.value"
      class="flex flex-col gap-2"
    >
      <h3>Sidebar</h3>
      <div class="grid grid-cols-2 gap-2">
        <label
          v-for="type in availableSidebarItemsTypes"
          :key="type"
          class="flex items-center gap-2"
        >
          <input
            type="radio"
            :checked="sandboxData.sidebarItemsType.value === type"
            @change="sandboxData.sidebarItemsType.value = type"
          >
          {{ type }}
        </label>

        <label v-if="sandboxData.sidebarItemsType.value === 'itemsByPaths'" for="depth" class="flex items-center gap-2">
          <span>Depth</span>
          <input
            id="depth"
            type="number"
            min="1"
            max="6"
            :value="sandboxData.sidebarItemsDepth.value"
            @input="sandboxData.sidebarItemsDepth.value = $event.target.value"
          >
        </label>
        <label v-if="sandboxData.sidebarItemsType.value === 'itemsByPaths'" for="collapsible" class="flex items-center gap-2">
          <input
            id="collapsible"
            type="checkbox"
            :checked="sandboxData.sidebarItemsCollapsible.value"
            @change="sandboxData.sidebarItemsCollapsible.value = $event.target.checked"
          >
          Collapsible
        </label>
      </div>
  </div>

  <div class="flex flex-col gap-2">
      <h3>i18n</h3>
      <div class="grid grid-cols-2 gap-2">
        <OALocaleSelect />
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <h3>Pages</h3>
      <div class="grid grid-cols-2 gap-2">
        <label
          v-for="component in availablePagesTypes"
          :key="component"
          class="flex items-center gap-2"
        >
          <input
            type="radio"
            :checked="sandboxData.previewComponent.value === component"
            @change="sandboxData.previewComponent.value = component"
          >
          {{ component }}
        </label>
      </div>
    </div>

    <div
      v-if="sandboxData.previewComponent.value === 'PagesBySpec'"
      class="flex flex-col gap-2"
    >
      <h3>Spec</h3>
      <div class="grid grid-cols-3 items-start gap-4">
        <label for="groupByTags" class="flex items-center gap-2">
          <input
            id="groupByTags"
            type="checkbox"
            :checked="themeConfig.getSpecConfig().groupByTags.value"
            @change="themeConfig.setSpecConfig({ groupByTags: $event.target.checked })"
          >
          Group by tags
        </label>

        <div class="flex flex-col">
          <label for="collapsePaths" class="flex items-center gap-2">
            <input
              id="collapsePaths"
              type="checkbox"
              :checked="themeConfig.getSpecConfig().collapsePaths.value"
              @change="themeConfig.setSpecConfig({ collapsePaths: $event.target.checked })"
            >
            Collapse paths
          </label>
          <small class="text-muted-foreground">
            Toggle `Group by tags` to see the effect
          </small>
        </div>

        <label for="showPathsSummary" class="flex items-center gap-2">
          <input
            id="showPathsSummary"
            type="checkbox"
            :checked="themeConfig.getSpecConfig().showPathsSummary.value"
            @change="themeConfig.setSpecConfig({ showPathsSummary: $event.target.checked })"
          >
          Show paths summary
        </label>

        <label for="avoidCirculars" class="flex items-center gap-2">
          <input
            id="avoidCirculars"
            type="checkbox"
            :checked="themeConfig.getSpecConfig().avoidCirculars.value"
            @change="themeConfig.setSpecConfig({ avoidCirculars: $event.target.checked })"
          >
          Avoid circulars
        </label>

        <label for="lazyRendering" class="flex items-center gap-2">
          <input
            id="lazyRendering"
            type="checkbox"
            :checked="themeConfig.getSpecConfig().lazyRendering.value"
            @change="themeConfig.setSpecConfig({ lazyRendering: $event.target.checked })"
          >
          Lazy rendering
        </label>

        <label for="wrapExamples" class="flex items-center gap-2">
          <input
            id="wrapExamples"
            type="checkbox"
            :checked="themeConfig.getWrapExamples()"
            @change="themeConfig.setSpecConfig({ wrapExamples: $event.target.checked })"
          >
          Wrap examples
        </label>

        <label for="disableDownload" class="flex items-center gap-2">
          <input
            id="disableDownload"
            type="checkbox"
            :checked="themeConfig.getSpecDisableDownload()"
            @change="themeConfig.setSpecConfig({ disableDownload: $event.target.checked })"
          >
          Disable download
        </label>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <h3>Request Body</h3>
      <div class="grid grid-cols-2 gap-2">
        <label v-for="view in requestBodyViews" :key="view" class="flex items-center gap-2">
          <input
            type="radio"
            :checked="themeConfig.getRequestBodyDefaultView() === view"
            @change="themeConfig.setRequestBodyDefaultView(view as any)"
          >
          {{ view }}
        </label>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <h3>JSON Viewer</h3>
      <div class="grid grid-cols-2 gap-2">
        <label for="jsonViewerDeep" class="flex items-center gap-2">
          <span>Depth</span>
          <input
            id="jsonViewerDeep"
            type="number"
            min="1"
            :value="themeConfig.getJsonViewerDeep()"
            @input="themeConfig.setJsonViewerDeep(Number($event.target.value))"
          >
        </label>
        <label v-for="renderer in jsonViewerRenderers" :key="renderer" class="flex items-center gap-2">
          <input
            type="radio"
            :checked="themeConfig.getJsonViewerRenderer() === renderer"
            @change="themeConfig.setJsonViewerRenderer(renderer as any)"
          >
          {{ renderer }}
        </label>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <h3>Schema Viewer</h3>
      <div class="grid grid-cols-2 gap-2">
        <label for="schemaViewerDeep" class="flex items-center gap-2">
          <span>Depth</span>
          <input
            id="schemaViewerDeep"
            type="number"
            min="1"
            :value="themeConfig.getSchemaViewerDeep()"
            @input="themeConfig.setSchemaViewerDeep(Number($event.target.value))"
          >
        </label>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <h3>Response</h3>
      <div class="grid grid-cols-2 gap-2">
        <label v-for="type in responseCodeSelectors" :key="type" class="flex items-center gap-2">
          <input
            type="radio"
            :checked="themeConfig.getResponseCodeSelector() === type"
            @change="themeConfig.setResponseCodeSelector(type as any)"
          >
          {{ type }}
        </label>
        <label for="responseMaxTabs" class="flex items-center gap-2">
          <span>Max tabs</span>
          <input
            id="responseMaxTabs"
            type="number"
            min="1"
            :value="themeConfig.getResponseCodeMaxTabs()"
            @input="themeConfig.setResponseCodeMaxTabs(Number($event.target.value))"
          >
        </label>
        <div class="flex flex-col gap-1">
          <span>Body view</span>
          <div class="flex gap-2">
            <label v-for="view in requestBodyViews" :key="'resp-' + view" class="flex items-center gap-2">
              <input
                type="radio"
                :checked="themeConfig.getResponseBodyDefaultView() === view"
                @change="themeConfig.setResponseBodyDefaultView(view as any)"
              >
              {{ view }}
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <h3>Playground</h3>
      <div class="grid grid-cols-2 gap-2">
        <label v-for="mode in playgroundModes" :key="mode" class="flex items-center gap-2">
          <input
            type="radio"
            :checked="themeConfig.getPlaygroundJsonEditorMode() === mode"
            @change="themeConfig.setPlaygroundJsonEditorMode(mode as any)"
          >
          {{ mode }}
        </label>
        <label for="playgroundMainMenuBar" class="flex items-center gap-2">
          <input
            id="playgroundMainMenuBar"
            type="checkbox"
            :checked="themeConfig.getPlaygroundJsonEditorMainMenuBar()"
            @change="themeConfig.setPlaygroundJsonEditorMainMenuBar($event.target.checked)"
          >
          Main menu bar
        </label>
        <label for="playgroundNavigationBar" class="flex items-center gap-2">
          <input
            id="playgroundNavigationBar"
            type="checkbox"
            :checked="themeConfig.getPlaygroundJsonEditorNavigationBar()"
            @change="themeConfig.setPlaygroundJsonEditorNavigationBar($event.target.checked)"
          >
          Navigation bar
        </label>
        <label for="playgroundStatusBar" class="flex items-center gap-2">
          <input
            id="playgroundStatusBar"
            type="checkbox"
            :checked="themeConfig.getPlaygroundJsonEditorStatusBar()"
            @change="themeConfig.setPlaygroundJsonEditorStatusBar($event.target.checked)"
          >
          Status bar
        </label>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <h3>Security</h3>
      <div class="grid grid-cols-2 gap-2">
        <label for="defaultScheme" class="flex items-center gap-2">
          <span>Default scheme</span>
          <input
            id="defaultScheme"
            type="text"
            :value="themeConfig.getSecurityDefaultScheme() || ''"
            @input="themeConfig.setSecurityDefaultScheme($event.target.value || null)"
          >
        </label>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <h3>Server</h3>
      <div class="grid grid-cols-2 gap-2">
        <label for="allowCustomServer" class="flex items-center gap-2">
          <input
            id="allowCustomServer"
            type="checkbox"
            :checked="themeConfig.getServerAllowCustomServer()"
            @change="themeConfig.setServerConfig({ allowCustomServer: $event.target.checked })"
          >
          Allow custom server
        </label>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <h3>Operation</h3>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <h5>Hidden Slots</h5>
          <div class="grid grid-cols-2 gap-2">
            <label v-for="slot in DEFAULT_OPERATION_SLOTS" :key="slot" class="flex items-center gap-2">
              <input
                type="checkbox"
                :checked="themeConfig.getOperationHiddenSlots().includes(slot)"
                @change="themeConfig.getOperationHiddenSlots().includes(slot) ? themeConfig.getOperationHiddenSlots().splice(themeConfig.getOperationHiddenSlots().indexOf(slot), 1) : themeConfig.getOperationHiddenSlots().push(slot)"
              >
              {{ slot }}
            </label>
          </div>
        </div>

        <div>
          <h5>Badges</h5>
          <div class="grid grid-cols-2 gap-2">
            <label v-for="badge in operationBadges" :key="badge" class="flex items-center gap-2">
              <input
                type="checkbox"
                :checked="themeConfig.getOperationBadges().includes(badge)"
                @change="themeConfig.getOperationBadges().includes(badge) ? themeConfig.setOperationBadges(themeConfig.getOperationBadges().filter(b => b !== badge)) : themeConfig.setOperationBadges([...themeConfig.getOperationBadges(), badge])"
              >
              {{ badge }}
            </label>
          </div>
        </div>

        <div>
          <h5>Operation Columns</h5>
          <div class="grid grid-cols-2 gap-2">
            <label v-for="col in [1, 2]" :key="col" class="flex items-center gap-2">
              <input
                type="radio"
                :checked="themeConfig.getOperationCols() === col"
                @change="themeConfig.setOperationCols(col)"
              >
              {{ col }}
            </label>
          </div>
        </div>

        <div>
          <h5>Path</h5>
          <div class="grid grid-cols-2 gap-2">
            <label for="showBaseUrl" class="flex items-center gap-2">
              <input
                id="showBaseUrl"
                type="checkbox"
                :checked="themeConfig.getShowBaseURL()"
                @change="themeConfig.setShowBaseURL($event.target.checked)"
              >
              Show base URL
            </label>
            <label for="defaultBaseUrl" class="flex items-center gap-2">
              <span>Default URL</span>
              <input
                id="defaultBaseUrl"
                type="text"
                :value="themeConfig.getOperationDefaultBaseUrl()"
                @input="themeConfig.setOperationDefaultBaseUrl($event.target.value)"
              >
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h3 {
  @apply mt-0 font-semibold;
}
</style>
