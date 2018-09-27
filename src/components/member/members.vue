<template>
  <div>

{{dataCount}}
{{token}}
    <Table size="small" border ref="selection" :columns="columns" :data="memberdata"></Table>
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
</template>

<script>
export default {
  data() {
    return {
      token: this.GLOBAL.XSRF_TOKEN,
      dataCount: 0,
      pageSize: 10,
      editModal: false,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: 'Name',
          key: 'name',
          sortable: true
        },
        {
          title: 'Age',
          key: 'age',
          sortable: true
        },
        {
          title: 'Address',
          key: 'address',
          sortable: true
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
            }, 'View'),
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
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
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
  mounted() {
    this.dataCount = this.posts.length;
    this.changepage(1);
  },


  methods: {
    changepage(index) {
      const start = (index - 1) * this.pageSize;
      const end = index * this.pageSize;
      this.memberdata = this.posts.slice(start, end);
    },
    show(index) {
      this.$Modal.info({
        title: 'User Info',
        content: `
        Name：${this.memberdata[index].name}<br>
        Age：${this.memberdata[index].age}<br>
        Address：${this.memberdata[index].address}`
      });
    },
    modifymamber() {
      Object.assign(this.memberdata[this.editedIndex], this.editedItem);
      this.$Message.info('Saved');
      this.editedIndex = -1;
    }
  }
};
</script>

<style>
</style>
