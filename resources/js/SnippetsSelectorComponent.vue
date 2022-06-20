<template>
  <div>
    <div class="selector" @click.stop.prevent="open = !open">
      Request Sample Language: <span v-text="lang"></span> <span v-if="client">/</span> <span v-if="client" v-text="client"></span> <i class="fa fa-caret-down"></i>
    </div>

    <div v-if="open" class="list">
      <div class="list-item" v-for="(item, name) in requestSampleConfigs" @mouseover="cursor_selected = item.snippet" @click.stop.prevent="select_snippet(item)">
        <i class="list-select fa fa-check" v-if="lang === item.snippet"></i>
        <span class="list-text" v-text="name"></span>
        <i v-if="item.libraries" class="list-open fa fa-angle-right"></i>
        <div v-if="item.libraries && cursor_selected === item.snippet" class="sub-list">
          <div class="list-item" v-for="(sub_item, sub_name) in item.libraries" @click.stop.prevent="select_snippet(item, sub_item)">
            <i class="list-select fa fa-check" v-if="client === sub_item"></i>
            <span class="list-text" v-text="sub_name"></span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { requestSampleConfigs } from "./helpers";

export default {
  name: 'snippet-selector',
  data() {
    return {
      open: false,
      requestSampleConfigs: requestSampleConfigs,
      cursor_selected: null,
      lang: 'javascript',
      client: 'xmlhttprequest',
    }
  },
  methods: {
    select_snippet(item, snippet = null) {
      if(snippet === null && item.libraries) {
        return false;
      }
      this.lang = item.snippet;
      this.$emit('select-lang', this.lang)
      if(snippet !== null) {
        this.client = snippet;
      }
      this.$emit('select-client', snippet)
      this.open = false;
    }
  }
}
</script>
<style lang="scss" scoped>
.selector {
  cursor: pointer;

  padding: 6px;
  &:hover {
    color: hsl(0deg 0% 15%);
    background-color: #f4f7fa;

  }
}

.list {
  position: absolute;
  z-index: 100000;
  left: 19px;
  top: 27px;

  border-radius: 2px;
  width: 273px;
  padding-bottom: 8px;
  padding-top: 8px;

  background-color: #fff;
  border: 1px solid hsl(200deg 6% 81%);
  box-sizing: border-box;

  .list-item {
    white-space: nowrap;
    padding: 4px 12px 4px 4px;
    font-size: 12px;
    display: flex;
    align-items: center;


  }
}

.list-select {
  width: 28px;
  font-size: 10px;
  text-align: center;
  flex-shrink: 0;
  position: absolute;
}

.list-open {

}

.list-text {
  max-width: 250px;
  width: 100%;
  padding-right: 32px;
  flex: 1 1;
  padding-left: 33px;
}

.sub-list {
  border-radius: 2px;
  z-index: 10;

  position: absolute;
  left: 267px;

  background-color: #fff;
  border: 1px solid hsl(200deg 6% 81%);
}
</style>
