<template>
  <div :class="{ dashboard: true, sidebarOpened: sidebarState, sidebarClosed: !sidebarState }">
    <Header :sidebarState="sidebarState"></Header>
    <Sidebar v-on:update:sidebar-state="updateSidebarState($event)"></Sidebar>
    <b-container fluid class="app-container">
      <transition name="fade-transform" mode="out-in">
        <!-- or name="fade" -->
        <!-- <router-view :key="key"></router-view> -->
        <router-view/>
      </transition>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Sidebar from '@/views/Dashboard/Sidebar/index.vue';
import Header from '@/views/Dashboard/Header/index.vue';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

@Component({
  components: {
    Sidebar,
    Header,
  },
})
export default class Dashboard extends Vue {
  private sidebarState = true;

  private updateSidebarState(event: boolean) {
    this.sidebarState = event;
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.dashboard {
  background: $dashboardbg;
  color: white;
  width: 100%;
  height: 100%;
  transition: all .3s ease-out;

  .app-container {
    height: 100%;
    width: 100%;
    padding-top: $headerHeight + 10;
  }

  &.sidebarOpened {
    padding-left: $sideBarOpenedWidth;
  }

  &.sidebarClosed {
    padding-left: $sideBarClosedWidth;
  }
}
</style>
