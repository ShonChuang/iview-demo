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
      <a href="" slot="extra" @click.prevent="createAccount()">
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
        <Modal v-model="modal2" width="360">
          <p slot="header" style="color:#f60;text-align:center">
              <Icon type="ios-information-circle"></Icon>
              <span>Delete confirmation</span>
          </p>
          <div style="text-align:center">
            <p>After this task is deleted, the downstream 10 tasks will not be implemented.</p>
            <p>Will you delete it?</p>
          </div>
          <div slot="footer">
            <Button
              type="error"
              size="large"
              long
              :loading="modal_loading"
              @click="del"
            >Delete
            </Button>
          </div>
        </Modal>
      </div>
    </Card>
  </div>
</template>

<script>
// import { Observable, interval, fromEvent, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

export default {
  data() {
    return {
      loading: true,
      token: this.GLOBAL.XSRF_TOKEN,
      dataCount: 0,
      pageSize: 10,
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

    },
    modifymamber() {
      // Object.assign(this.memberdata[this.editedIndex], this.editedItem);
      const header = { 'Content-Type': 'application/json', Authorization: `Bearer ${this.GLOBAL.XSRF_TOKEN}` };
      // const body = JSON.stringify(this.editedItem);

      const body = JSON.stringify({
        id: this.editedItem.id,
        accountId: this.editedItem.accountId,
        password: 'abc123',
        memberName: this.editedItem.memberName,
        email: this.editedItem.email,
        mobilephone: this.editedItem.mobilephone,
        isEnable: true
      });
      ajax
        .post('/api/update', body, header)
        .pipe(catchError((error) => {
          console.log('error: ', error);
        }))
        .subscribe((obs) => {
          console.log(obs);
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
        .post('/api/list', {}, header)
        .pipe(catchError((error) => {
          console.log('error: ', error);
        }))
        .subscribe(
          (obs) => {
            this.posts = obs.response;
          },
          error => console.log(error),
          () => {
            console.log(this.posts);
            this.changepage(1);
            this.loading = false;
          }
        );
    }
  }
};
</script>

<style>
</style>
