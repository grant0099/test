<template>
  <b-modal ref="editModal" id="editModal" title="觀看帳號">
    <template #modal-footer="{ cancel }">
      <b-button style="color: white" variant="danger" @click="cancel()">取消</b-button>
      <b-button style="color: white" variant="success" @click="save()">確定</b-button>
    </template>
    <b-tabs content-class="mt-3" fill>
      <b-container>
        <b-tab title="帳號資訊" active></b-tab>
        <b-row>
          <label>帳號:</label>
          <b-form-input placeholder="請輸入客戶名稱" v-model="memberObj.account"></b-form-input>
        </b-row>
        <b-row style="margin-top: 24px">
          <b-form-group label="帳號 啟用/停用:">
            <b-form-radio-group v-model="memberObj.enable" :options="options" name="radio-inline"></b-form-radio-group>
          </b-form-group>
        </b-row>
      </b-container>
    </b-tabs>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { text: "啟用", value: "true" },
        { text: "停用", value: "false" },
      ],
    };
  },
  props: {
    memberObj: Object,
  },
  methods: {
    save() {
      this.$store.dispatch("updateMember", this.memberObj);
    },
  },
};
</script>
