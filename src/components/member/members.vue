<template>
  <div>
    <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem>
        <router-link :to="{name:'Layout'}">Home</router-link>
      </BreadcrumbItem>
      <BreadcrumbItem>人員列表</BreadcrumbItem>
    </Breadcrumb>
    <Card>
      <div style="height: 600px">
        <Table size="small" :loading="loading" border ref="selection" :columns="columns" :data="memberdata"></Table>
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
          <span style="display:inline-block;width:100px;">Name:</span>
          <Input style="width:auto" v-model="editedItem.name" placeholder=""></Input><br>
          <span style="display:inline-block;width:100px;">Age:</span>
          <Input style="width:auto" v-model="editedItem.age" placeholder=""></Input><br>
          <span style="display:inline-block;width:100px;">Address:</span>
          <Input style="width:auto" v-model="editedItem.address" placeholder=""></Input><br>
          <span style="display:inline-block;width:100px;">Date:</span>
          <Input style="width:auto" v-model="editedItem.date" placeholder=""></Input>
        </Modal>
      </div>
    </Card>
    <!-- {{posts}} -->
  </div>
</template>

<script>
import VueRx from 'vue-rx';
// import { Observable, interval, fromEvent, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import Vue from 'vue';

export default {
  data() {
    return {
      loading: true,
      token: this.GLOBAL.XSRF_TOKEN,
      dataCount: 0,
      pageSize: 5,
      editModal: false,
      columns: [
        // {
        //   type: 'selection',
        //   width: 60,
        //   align: 'center'
        // },
        {
          title: 'ID',
          key: 'id',
          width: 50,
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
          width: 150,
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
            }, '編輯')
          ])
        }
      ],
      posts: [
      ],
      memberdata: [
      ],
      editedItem: {
        name: '123',
        age: 0,
        address: '',
        date: '1911-01-01'
      },
      editedIndex: -1
    };
  },
  beforeCreate() {
  },
  beforeMount() {
    this.getMember();
    console.log(this.posts);
    console.log(this.memberdata);
  },
  mounted() {
    console.log(this.posts);
    console.log(this.memberdata);
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
    modifymamber() {
      Object.assign(this.memberdata[this.editedIndex], this.editedItem);
      this.$Message.info('Saved');
      this.editedIndex = -1;
    },
    getMember() {
      const header = { Authorization: `Bearer ${this.GLOBAL.XSRF_TOKEN}` };
      ajax
        .post('/api/list', {}, header)
        .pipe(catchError((error) => {
          console.log('error: ', error);
        }))
        .subscribe(
          (obs) => {
            console.log(obs.response);
            this.posts = obs.response;
          },
          error => console.log(error),
          () => {
            console.log(213);
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
