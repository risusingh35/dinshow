
<template>
  <div>
    <input type="text" name="vueTouchKeyboard" />

    <input type="text" placeholder="Text input" data-layout="normal" @focus="show" />
    <vue-touch-keyboard
      v-if="visible"
      :options="options"
      :layout="layout"
      :cancel="hide"
      :accept="accept"
      :input="input"
    />
  </div>
</template>
<script>
import vueTouchKeyboard from "vue-touch-keyboard";
import style from "vue-touch-keyboard/dist/vue-touch-keyboard.css";

console.log("vueTouchKeyboard::", vueTouchKeyboard);

import Vue from "vue";
Vue.use(vueTouchKeyboard);

export default {
  name: "VueTouchKeyboard",
  props: {
    reqdata: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      visible: false,
      layout: "normal",
      input: null,
      options: {
        useKbEvents: false,
        preventClickEvent: false,
      },
    };
  },

  watch: {
    reqdata(data) {
      console.log("data::", data);
      // if(data.type=='DeliveryChallan') {
      // 	this.printDeliveryChallan(data);
      // }
    },
  },
  mounted() {},
  created: async function () {
    console.log("vueTouchKeyboard Called......");
  },
  methods: {
    async notification(type = "danger", timeout = 3000, message = "") {
      let config = {
        timeout: timeout,
        status: type,
      };
      UIkit.notification(message, config);
    },
    accept(text) {
      this.notification("danger", 3000, "Input text:" + text);
      // alert("Input text: " + text);
      this.hide();
    },

    show(e) {
      this.input = e.target;
      this.layout = e.target.dataset.layout;

      if (!this.visible) this.visible = true;
    },

    hide() {
      this.visible = false;
    },
  },
};
</script>
