<template>
  <div v-html="gencode"></div>
</template>

<script>
import Prism from "reprism";

import { highlight, loadLanguages } from "reprism";
import jsx from "reprism/languages/jsx";
import java from "reprism/languages/java";
import javascript from "reprism/languages/javascript";
import clojure from "reprism/languages/clojure";
import csharp from "reprism/languages/csharp";
import http from "reprism/languages/http";
import kotlin from "reprism/languages/kotlin";
import php from "./php";
import phpextras from "reprism/languages/php-extras";
import powershell from "reprism/languages/powershell";
import r from "reprism/languages/r";
import ruby from "reprism/languages/ruby";
import swift from "reprism/languages/swift";
import bash from "reprism/languages/bash";
import ocaml from "reprism/languages/ocaml";
import python from "reprism/languages/python";
import json from "reprism/languages/json";
import textile from "reprism/languages/textile";

loadLanguages(jsx, java, bash, javascript, clojure, csharp, http, kotlin, php, powershell, r, ruby, swift, ocaml, python, json, textile);

if (typeof document !== "undefined") {
  // Provide window.Prism for plugins
  window.Prism = Prism;
  require("prismjs/plugins/normalize-whitespace/prism-normalize-whitespace");
  console.log(Prism.plugins)
  Prism.plugins.NormalizeWhitespace.setDefaults({
    'remove-trailing': true,
    'remove-indent': true,
    'left-trim': true,
    'right-trim': true,
    'break-lines': 60, //max number of characters in each line before break
    'tabs-to-spaces': 4,
  });
  Prism.hooks.add('before-sanity-check', function (env) {
    env.element.innerHTML = env.element.innerHTML.replace(/<br>/g, '\n');
    env.code = env.element.textContent;
  });
}

export default {
  name: 'code-block',
  props: {
    value: {
      type: String,
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
  },
  computed: {
    gencode() {
      return highlight(this.value, this.lang)
    },
  },
  methods: {

  }
}
</script>
<style lang="scss">
//.json {
//  .token.property {
//    width: 100px;
//    &::before {
//      content: "\a    ";
//      white-space: pre;
//    }
//  }
//
//  .token.punctuation::before {
//    content: "\a";
//    white-space: pre;
//  }
//}
.reprism {
  white-space: pre-wrap !important;
}
</style>
