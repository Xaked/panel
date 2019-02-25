<template>
  <div :class="{ header: true, sidebarClosed: !sidebarState }">
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class Header extends Vue {
  @Prop({ default: true }) private sidebarState!: boolean;
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.header {
  background: $accentColor;
  width: 100%;
  height: $headerHeight;
  color: $mainColor;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
