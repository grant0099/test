<template>
  <div style="padding-top: 25px;">
    <b-card class="ml-5 mr-5" header="查詢條件" header-tag="header">
      <b-container>
        <b-row>
          <b-col cols="2" class="mt-2" style="text-align: right">
            <label>關鍵字：</label>
          </b-col>
          <b-col cols="10">
            <b-form-input placeholder="請輸入客戶名稱" v-model="searchInputObj.filterStr"></b-form-input>
          </b-col>
        </b-row>
        <b-row style="margin-top: 0">
          <b-col cols="2" style="text-align: right">
            <label>狀態：</label>
          </b-col>
          <b-col cols="10">
            <b-form-group>
              <b-form-checkbox
                v-model="searchInputObj.inUse"
                value="true"
                unchecked-value="false"
                style="display:inline-block"
              >
                使用中
              </b-form-checkbox>
              <b-form-checkbox
                v-model="searchInputObj.deactivated"
                value="true"
                unchecked-value="false"
                style="display:inline-block"
              >
                已停用
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row style="margin-top: 0">
          <b-col cols="2" style="text-align: right"></b-col>
          <b-col cols="10">
            <b-button class="btn-gradient color-9" variant="primary" @click="search">查詢</b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
    <b-card class="ml-5 mr-5" header="查詢結果" header-tag="header" style="top: 10%">
      <b-table id="my-table" :items="fitems" :fields="fields" :striped="false" head-variant="light" responsive="lg">
        <template #cell(id)="row">
          <div class="fontFormat">{{ row.item.id + 1 }}</div>
        </template>
        <template #cell(account)="row">
          <div class="fontFormat">{{ row.item.account }}</div>
        </template>
        <template #cell(enable)="row">
          <span v-show="!row.item.enable"><b-badge variant="danger">已停用</b-badge></span>
          <span v-show="row.item.enable"> <b-badge variant="success">使用中</b-badge></span>
        </template>
        <template #cell(action)="row">
          <b-button :ref="row.item.id" variant="primary" size="sm" @click="edit(row.item.id)" v-b-modal.editModal
            >觀看</b-button
          >
        </template>
      </b-table>
    </b-card>
    <AccountEditModal :memberObj="memberObj"></AccountEditModal>
  </div>
</template>

<script>
import AccountEditModal from "../../components/manageAdmin/AccountEditModal.vue";
export default {
  components: {
    AccountEditModal,
  },
  computed: {
    rows() {
      return this.items.length;
    },
    items() {
      return this.$store.getters.getItems;
    },
    fitems() {
      return this.items.filter((item) => {
        return (
          item.account.indexOf(this.filterObj.filterStr) > -1 &&
          ((item.enable === true && this.filterObj.inUse === "true") ||
            (item.enable === false && this.filterObj.deactivated === "true") ||
            (this.filterObj.deactivated === "false" && this.filterObj.inUse === "false"))
        );
      });
    },
  },
  data() {
    return {
      fields: [
        // 表格第一列
        {
          key: "id",
          label: "序號",
          class: "text-center",
          thStyle: "width: 12rem",
        },
        {
          key: "account",
          label: "帳號",
          class: "text-center",
          thStyle: "width: 28rem",
        },
        {
          key: "enable",
          label: "狀態",
          class: "text-center",
          thStyle: "width: 35rem",
        },
        {
          key: "createTime",
          label: "創建時間",
          class: "text-center",
          thStyle: "width: 35rem",
          sortable: true,
        },
        {
          key: "updateTime",
          label: "最後修改時間",
          class: "text-center",
          thStyle: "width: 35rem",
          sortable: true,
        },
        {
          key: "action",
          label: "動作",
          class: "text-center",
          thStyle: "width: 35rem",
        },
      ],
      filterObj: {
        inUse: "false",
        deactivated: "false",
        filterStr: "",
      },
      searchInputObj: {
        inUse: "false",
        deactivated: "false",
        filterStr: "",
      },
      memberObj: {
        id: -1,
        account: "123",
        enable: false,
        createTime: "",
        updateTime: "",
      },
    };
  },
  methods: {
    search() {
      this.filterObj = {
        inUse: this.searchInputObj.inUse,
        deactivated: this.searchInputObj.deactivated,
        filterStr: this.searchInputObj.filterStr,
      };
    },
    edit(id) {
      this.memberObj = {
        id: this.items[id].id,
        account: this.items[id].account,
        enable: this.items[id].enable,
        createTime: this.items[id].createTime,
        updateTime: this.items[id].updateTime,
      };
    },
  },
  beforeCreate() {
    this.$store.dispatch("getMember");
  },
};
</script>
