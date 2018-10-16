<template>
  <div>
    <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem>
        <router-link :to="{name:'Layout'}">Home</router-link>
      </BreadcrumbItem>
      <BreadcrumbItem>人員列表</BreadcrumbItem>
    </Breadcrumb>
    <Card>
      <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          人員列表
      </p>
      <a href="" slot="extra" v-on:click.prevent="createAccount">
          <Icon type="ios-loop-strong"></Icon>
          Create
      </a>
      <div style="height: 600px">
        <Table size="small"
        :loading="loading"
        border
        ref="selection"
        :columns="columns"
        :data="memberdata">
        </Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page
              :total="dataCount"
              :page-size="pageSize"
              show-total
              @on-change="changepage"
              show-elevator
              :current.sync="page"
            ></Page>
          </div>
        </div>
        <Modal
          v-model="editModal"
          title="編輯資料"
          ok-text="儲存"
          @on-ok="modifymamber"
        >
          <span style="display:inline-block;width:100px;">id:</span>
          {{editedItem.id}}<br>
          <span style="display:inline-block;width:100px;">accountId:</span>
          {{editedItem.accountId}}<br>
          <span style="display:inline-block;width:100px;">memberName:</span>
          <Input style="width:auto" v-model="editedItem.memberName" placeholder=""></Input><br>
          <span style="display:inline-block;width:100px;">email:</span>
          <Input style="width:auto" v-model="editedItem.email" placeholder=""></Input><br>
          <span style="display:inline-block;width:100px;">mobilephone:</span>
          <Input style="width:auto" v-model="editedItem.mobilephone" placeholder=""></Input><br>
          <span style="display:inline-block;width:100px;">帳號狀態:</span>
          <i-switch size="large" v-model="editedItem.isEnable">
            <span slot="open">啟用</span>
            <span slot="close">禁用</span>
          </i-switch><br>
          <span style="display:inline-block;width:100px;">creatTime:</span>
          {{editedItem.creatTime}}<br>
          <span style="display:inline-block;width:100px;">editTime:</span>
          {{editedItem.editTime}}
        </Modal>
        <Modal
          v-model="createModal"
          title="新增資料"
          ok-text="完成"
          @on-ok="callCreateAPI"
        >
          <span style="display:inline-block;width:100px;">accountId:</span>
          <Input style="width:auto" v-model="editedItem.accountId" placeholder="帳號"></Input><br>
          <span style="display:inline-block;width:100px;">password:</span>
          <Input style="width:auto" v-model="editedItem.password"
          placeholder="密碼" type="password"></Input><br>
          <span style="display:inline-block;width:100px;">memberName:</span>
          <Input style="width:auto" v-model="editedItem.memberName" placeholder="會員名稱"></Input><br>
          <span style="display:inline-block;width:100px;">email:</span>
          <Input style="width:auto" v-model="editedItem.email"
          placeholder="email" type="email"></Input><br>
          <span style="display:inline-block;width:100px;">mobilephone:</span>
          <Input style="width:auto" v-model="editedItem.mobilephone" placeholder="手機"></Input><br>
          <span style="display:inline-block;width:100px;">帳號狀態:</span>
          <i-switch size="large" v-model="editedItem.isEnable">
            <span slot="open">啟用</span>
            <span slot="close">禁用</span>
          </i-switch>
        </Modal>
      </div>
    </Card>
  </div>
</template>

<script>
// import { Observable, interval, fromEvent, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import Vue from 'vue';
import { Card, Breadcrumb, BreadcrumbItem, Table, Modal, Page, Switch, Message } from 'iview';

Vue.component('Breadcrumb', Breadcrumb);
Vue.component('BreadcrumbItem', BreadcrumbItem);
Vue.component('Table', Table);
Vue.component('Modal', Modal);
Vue.component('Page', Page);
Vue.component('iSwitch', Switch);
Vue.component('Message', Message);
// Vue.component('Button', Button);
Vue.component('Card', Card);
// Vue.component('Input', Input);
Vue.prototype.$Message = Message;
Vue.prototype.$Modal = Modal;

export default {
  data() {
    return {
      loading: true,
      edit_loading: true,
      token: this.GLOBAL.XSRF_TOKEN,
      dataCount: 0,
      pageSize: 10,
      page: 1,
      createModal: false,
      editModal: false,
      options: [
        { text: 'Yes', value: true },
        { text: 'No', value: false }
      ],
      columns: [
        {
          title: 'ID',
          key: 'id',
          width: 100,
          align: 'center'
          // sortable: true
        },
        {
          title: '姓名',
          key: 'memberName'
          // sortable: true
        },
        {
          title: 'email',
          key: 'email'
          // sortable: true
        },
        {
          title: '手機',
          key: 'mobilephone'
          // sortable: true
        },
        {
          title: 'Action',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.show(params.index);
                }
              }
            }, '詳細'),
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.editedIndex = params.index;
                  this.editedItem = Object.assign({}, this.memberdata[params.index]);
                  this.editModal = true;
                }
              }
            }, '編輯'),
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.deletemember(this.memberdata[params.index].id);
                }
              }
            }, '刪除')
          ])
        }
      ],
      posts: [
      ],
      memberdata: [
      ],
      defaultItem: {
        isEnable: true
      },
      editedItem: {
      },
      editedIndex: -1
    };
  },
  beforeCreate() {
  },
  beforeMount() {
    this.getMember();
  },
  mounted() {
  },
  updated() {
    this.dataCount = this.posts.length;
  },
  methods: {
    changepage(index) {
      const start = (index - 1) * this.pageSize;
      const end = index * this.pageSize;
      this.memberdata = this.posts.slice(start, end);
    },
    show(index) {
      this.$Modal.info({
        title: '詳細資料',
        content: `
        ID：${this.memberdata[index].id}<br>
        accountId：${this.memberdata[index].accountId}<br>
        姓名：${this.memberdata[index].memberName}<br>
        email：${this.memberdata[index].email}<br>
        手機：${this.memberdata[index].mobilephone}<br>
        建立時間：${this.memberdata[index].creatTime}<br>
        最後修改間：${this.memberdata[index].editTime}`
      });
    },
    createAccount() {
      this.editedItem = this.defaultItem;
      this.createModal = true;
    },
    callCreateAPI() {
      const header = { 'Content-Type': 'application/json', Authorization: `Bearer ${this.GLOBAL.XSRF_TOKEN}` };

      const body = JSON.stringify({
        accountId: this.editedItem.accountId,
        password: this.editedItem.password,
        memberName: this.editedItem.memberName,
        email: this.editedItem.email,
        mobilephone: this.editedItem.mobilephone,
        isEnable: this.editedItem.isEnable
      });
      ajax
        .post('/api/create', body, header)
        .pipe(catchError((error) => {
          console.log('error: ', error);
        }))
        .subscribe((obs) => {
          console.log('Create: ', obs);
          this.getMember();
        });
      this.$Message.info('Saved');
      this.editedIndex = -1;
    },
    modifymamber() {
      const header = { 'Content-Type': 'application/json', Authorization: `Bearer ${this.GLOBAL.XSRF_TOKEN}` };


      const body = JSON.stringify({
        id: this.editedItem.id,
        accountId: this.editedItem.accountId,
        password: 'abc123',
        memberName: this.editedItem.memberName,
        email: this.editedItem.email,
        mobilephone: this.editedItem.mobilephone,
        isEnable: this.editedItem.isEnable
      });
      ajax
        .post('/api/update', body, header)
        .pipe(catchError((error) => {
          console.log('error: ', error);
        }))
        .subscribe(() => {
          this.getMember();
        });
      this.$Message.info('Saved');
      this.editedIndex = -1;
    },
    deletemember(index) {
      const header = { 'Content-Type': 'application/json', Authorization: `Bearer ${this.GLOBAL.XSRF_TOKEN}` };
      const body = JSON.stringify({
        id: index
      });
      ajax
        .post('/api/delete', body, header)
        .pipe(catchError((error) => {
          console.log('error: ', error);
        }))
        .subscribe(() => {
          this.getMember();
        });
      this.$Message.info('Deleted');
    },
    getMember() {
      const header = { 'Content-Type': 'application/json', Authorization: `Bearer ${this.GLOBAL.XSRF_TOKEN}` };
      ajax
        .post('/api/iqmemberlist', {}, header)
        .pipe(catchError((error) => {
          console.log('error: ', error);
        }))
        .subscribe(
          (obs) => {
            this.posts = obs.response;
          },
          error => console.log(error),
          () => {
            this.changepage(this.page);
            this.loading = false;
          }
        );
    }
  }
};
</script>

<style>
</style>
