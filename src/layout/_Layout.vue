<template>
  <div class="layout">
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
      <Menu theme="dark" width="auto" accordion>
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            助手
          </template>
          <MenuGroup title="權限維護">
            <MenuItem name="1-1">群組維護</MenuItem>
            <MenuItem name="1-2" to="/Layout/members">人員列表</MenuItem>

          </MenuGroup>
          <MenuGroup title="777">
            <MenuItem name="1-3">888</MenuItem>
            <MenuItem name="1-4">999</MenuItem>

          </MenuGroup>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-keypad"></Icon>
            Item 2
          </template>
          <MenuItem name="2-1">Option 1</MenuItem>
          <MenuItem name="2-2">Option 2</MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-analytics"></Icon>
            Item 3
          </template>
          <MenuItem name="3-1">Option 1</MenuItem>
          <MenuItem name="3-2">Option 2</MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
      <Header
        :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"
        style="text-align: right"
      >
        <Button type="primary" @click="doLogout()">Logout</Button>
      </Header>
      <Content :style="{padding: '0 16px 16px'}">
        <!-- {{this.GLOBAL.XSRF_TOKEN}} -->
        <router-view name="meunArea"/>
      </Content>
    </Layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false
    };
  },
  methods: {
    doLogout() {
      this.$router.push({ name: 'Login' });
    }
  },
  beforeCreate() {
    if (this.GLOBAL.XSRF_TOKEN === '') {
      this.$router.push({ name: 'Login' });
    }
  }
};
</script>

<style>

</style>
