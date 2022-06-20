<template>
  <div class="panel">
    <div class="panel-header">
      <div class="title">
        <SnippetsSelectorComponent @select-lang="(val) => this.lang = val" @select-client="(val) => this.client = val"/>
      </div>
      <div class="copy" type="button" @click="copyToClipboard">
        <i class="fa fa-copy mr-1"></i>
      </div>
    </div>
    <div class="panel-body">
      <div class="flex">
        <div class="code"><CodeBlockComponent v-model="snippet" :lang="lang"></CodeBlockComponent></div>
      </div>

      <div style="padding: 10px 100px;">
        <div class="form-group" v-for="item in queryString" v-if="item.input">
          <label class="control-label col-sm-2" v-text="item.name + ': '"></label>
          <div class="col-sm-10">
            <input type="text" class="form-control" v-model="inputs[item.name]" @input="gen_snippet">
          </div>
        </div>

        <div class="form-group" v-for="item in postParams" v-if="item.input">
          <label class="control-label col-sm-2" v-text="item.name + ': '"></label>
          <div class="col-sm-10">
            <input type="text" class="form-control" v-model="inputs[item.name]" @input="gen_snippet">
          </div>
        </div>
      </div>

      <button class="button is-primary rounded-md text-base" style="margin: 5px" @click="sendRequest">
        Send API Request
      </button>

      <div class="code">
        <CodeBlockComponent v-if="response" v-model="response" lang="json"></CodeBlockComponent>
        <CodeBlockComponent v-if="responseErr" v-model="responseErr" lang="textile"></CodeBlockComponent>
      </div>
    </div>


  </div>

</template>

<script>
import HTTPSnippet from "httpsnippet";
import SnippetsSelectorComponent from "./SnippetsSelectorComponent";
import CodeBlockComponent from "./CodeBlockComponent";
import copy from 'copy-to-clipboard';

export default {
  name: 'code-viewer',
  components: {
    SnippetsSelectorComponent, CodeBlockComponent
  },
  props: {
    url: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: false,
      default: 'GET'
    },
    params: {
      type: Object,
      required: false,
      default: function() {
        return {};
      }
    },
    headers: {
      type: Array,
      required: false,
      default: [{name: 'accept', value: 'application/json'}]
    },
    queryString: {
      type: Array,
      required: false,
      default: []
    },
    postParams: {
      type: Array,
      required: false,
      default: []
    },
    mimeType: {
      type: String,
      required: false,
      default: 'application/x-www-form-urlencoded'
    },
  },
  watch: {
    queryString(val) {

    },
    inputs(val) {
      console.log(val);
    }
  },
  data() {
    return {
      lang: 'javascript',
      client: 'xmlhttprequest',
      response: null,
      responseErr: null,
      inputs: {},
      snippet: ''
    }
  },
  methods: {
    copyToClipboard() {
      copy(this.snippet);
    },
    sendRequest() {
      let headers = {}
      for (let i in this.queryString) {
        headers[this.queryString[i].name] = this.queryString[i].value
      }
      let url = this.url + '?'
      for (let i in this.queryString) {
        if(!this.queryString[i].input) {
          url += this.queryString[i].name + '=' + this.queryString[i].value + '&'
        } else {
          url += this.queryString[i].name + '=' + (this.inputs[this.queryString[i].name] ?? '') + '&'
        }
      }

      const options = {method: this.method, headers: headers};
      if(this.method === 'POST') {
        let body = {};
        for (let i in this.postParams) {
          body[this.postParams[i].name] = this.postParams[i].value
        }
        options.body = new URLSearchParams(body)
      }
      fetch(url, options)
          .then(response => response.json())
          .then(response => {
            console.log(response);
            this.response = JSON.stringify(response, null, 4)
            this.responseErr = null
          })
          .catch(err => {
            console.log(err);
            this.responseErr = err.toString()
            this.response = null
          });
    },
    gen_snippet() {
      let queryString = [];
      for (let i in this.queryString) {
        if(!this.queryString[i].input) {
          queryString.push({name: this.queryString[i].name, value: this.queryString[i].value})
        } else {
          queryString.push({name: this.queryString[i].name, value: this.inputs[this.queryString[i].name] ?? ''})
        }
      }

      let method = this.method.toUpperCase()
      let param = {
        method: method,
        url: this.url,
        headers: this.headers,
        queryString: queryString,
      };
      if(method === 'POST' && this.postParams) {
        param.postData = {mimeType: this.mimeType, params: []};
        for (let i in this.postParams) {
          if(!this.postParams[i].input) {
            param.postData.params.push({name: this.postParams[i].name, value: this.postParams[i].value})
          } else {
            param.postData.params.push({name: this.postParams[i].name, value: this.inputs[this.queryString[i].name] ?? ''})
          }
        }
      }
      let snippet = new HTTPSnippet(param);
      this.snippet = snippet.convert(this.lang, this.client) || null;
    }
  },
  mounted() {
    for (let i in this.queryString) {
      if(!this.queryString[i].input) continue;
      this.$set(this.inputs, this.queryString[i].name, this.queryString[i].value);
    }
    for (let i in this.postParams) {
      if(!this.postParams[i].input) continue;
      this.$set(this.inputs, this.postParams[i].name, this.postParams[i].value);
    }
    this.gen_snippet()
  }
}
</script>
<style lang="scss" scoped>
  .panel {
    width: 100%;
    overflow: hidden;
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-radius: 5px;
    min-height: 500px;

    .panel-header {
      user-select: none;
      color: hsl(228deg 2% 41%);
      position: relative;
      padding-left: 16px;
      padding-right: 12px;
      line-height: 1;
      font-size: 12px;
      display: flex;
      border-color: hsl(217deg 35% 91%);
      background-color: #e0e6f0;
      align-items: center;

      .title {
        height: 36px;
        flex: 1 1;
        display: flex;
        align-items: center;
        cursor: pointer;

      }

      .copy {
        align-items: center;
        display: inline-flex;
        line-height: 0;
        outline: 2px solid transparent;
        outline-offset: 2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: hsl(225deg 2% 38%);
        padding-left: 6px;
        padding-right: 6px;
        height: 24px;
        font-weight: 500;
        font-size: 12px;
        border-width: 1px;
        border-radius: 2px;
        border-color: transparent;
        cursor: pointer;

        &:hover {
          color: hsl(0deg 0% 15%);
          background-color: #f4f7fa;
        }
      }
    }

    .panel-body {
      background-color: #f2f5fb;
    }
  }
  .flex {
    display: flex;
    white-space: pre-wrap
  }
  .code {
    font-size: 14px;
    word-break: break-all;
    padding: 12px 15px;
    overflow: auto;
    flex: 1 1;
  }

  .col-sm-2 {
    width: 16.66666667%;
  }
  .col-sm-10 {
    width: 83.33333333%;
    float: right;
    padding-left: 20px;
  }

  .control-label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
    padding-top: 7px;
    margin-bottom: 0;
    text-align: right;
  }

  .form-control {
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
    -webkit-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
  }
</style>
