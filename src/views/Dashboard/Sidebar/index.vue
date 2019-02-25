<template>
  <div :class="{ sidebar: true, opened: sidebarState, closed: !sidebarState }">
    <h2 class="caption text-center" @click="toggleSidebar()"></h2>
    <hr>
    <router-link class="item" to="/dashboard">
      <font-awesome-icon icon="columns"/>
      <span class="name">Dashboard</span>
    </router-link>
    <div v-if="sidebarRoutes" class="routes">
      <span v-for="route in sidebarRoutes" :key="route.name">
        <router-link v-if="route.meta.show || true" class="item" :to="route.path">
          <font-awesome-icon :icon="route.meta.icon || ''"/>
          <span class="name">{{ route.name }}</span>
        </router-link>
      </span>
    </div>
    <router-link class="item" to="/">
      <font-awesome-icon icon="sign-out-alt"/>
      <span class="name">Exit</span>
    </router-link>
    <b-button variant="dark" class="openSidebar" @click="toggleSidebar()">
      <font-awesome-icon icon="bars"/>
    </b-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getSidebarState, setSidebarState } from '@/utils/sidebarState';

@Component({})
export default class Sidebar extends Vue {
  private sidebarState = true;
  private sidebarRoutes = undefined;

  private toggleSidebar() {
    this.sidebarState = !this.sidebarState;
    setSidebarState(this.sidebarState);
    this.$emit('update:sidebar-state', this.sidebarState);
  }

  private getSidebarRoutes(router: any) {
    let sidebarRoutes;
    if (router.options.routes) {
      router.options.routes.forEach((el: any) => {
        if (el.path && el.path === '/dashboard') {
          sidebarRoutes = el.children;
        }
      });
    }
    return sidebarRoutes;
  }

  private created() {
    this.sidebarRoutes = this.getSidebarRoutes(this.$router);
    this.sidebarState = getSidebarState();
    this.$emit('update:sidebar-state', this.sidebarState);
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.sidebar {
  color: $mainColor;
  background: $accentColor;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  transition: all .3s ease-out;
  button.openSidebar {
    position: fixed;
    top: .5rem;
    left: .5rem;
  }
  .caption {
    margin: 3px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
    cursor: pointer;
  }
  span.name::before {
    content: ' ';
  }
  .item {
    font-size: 1.3rem;
    text-align: left;
    width: $sideBarOpenedWidth;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;

    &:hover {
      background: $itemHovered;
    }

    &.router-link-exact-active {
      background: $itemActive;

      &:hover {
        background: $itemHovered;
      }
    }
  }
  &.opened {
    width: $sideBarOpenedWidth;
    span.name {
      display: inline;
    }
    button.openSidebar {
      display: none;
    }
    .caption::before {
      content: "XAKED";
    }
  }
  &.closed {
    width: $sideBarClosedWidth;
    span.name {
      display: none;
    }
    button.openSidebar {
      display: block;
    }
    .caption::before {
      content: "X";
    }
    .item {
      font-size: 1.3rem;
      width: $sideBarClosedWidth;
      padding: 8px;
      text-align: center;

      &.router-link-exact-active {
        background: $itemActive;
      }
    }
  }
}
</style>
