<template>
  <div style="padding: 10px">
    <div style="background: #fff; border-radius: 8px; padding: 20px">
      <div class="button-group">
        <Button style="margin-right: 5px" size="large" @click="exportData(1)"
          ><Icon type="ios-download-outline"></Icon> 导出所有人的名单</Button
        >
        <Button size="large" v-show="selectedData.length !== 0" type="primary"
          ><Icon type="ios-download-outline"></Icon> 发送邮件</Button
        >
        <Button size="large" class="invite-button" type="primary"
          ><Icon type="ios-download-outline"></Icon> 创建邀请链接</Button
        >
      </div>
      <br />
      <Table
        ref="table"
        max-height="670"
        border
        stripe
        :columns="columns"
        :data="userList"
        @on-selection-change="onSelectChange"
      ></Table>
      <br />
    </div>
    <Drawer
            title="Create"
            v-model="value3"
            width="720"
            :mask-closable="false"
            :styles="styles"
        >
            <Form :model="formData">
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="Name" label-position="top">
                            <Input v-model="formData.name" placeholder="please enter user name" />
                        </FormItem>
                    </Col>
                </Row>
                <FormItem label="Description" label-position="top">
                    <Input type="textarea" v-model="formData.desc" :rows="4" placeholder="please enter the description" />
                </FormItem>
            </Form>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="value3 = false">Cancel</Button>
                <Button type="primary" @click="value3 = false">Submit</Button>
            </div>
        </Drawer>
  </div>
</template>

<script>
import {getAdminList} from '@/api'
export default {
  name: "orguser",
  data() {
    return {
      departmentLabel: {
        JISHU: "技术部",
        DUOMEITI: "多媒体部",
        XUANCHUAN: "宣传部",
        HUODONG: "活动部",
        YANJIUSHENG: "研究生部",
        WAILIAN: "外联部"
      },
      selectedData: [],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          type: "index",
          width: 80,
          align: "center",
        },
        {
          title: "名字",
          key: "name",
        },
        {
          title: "部门",
          key: "department",
          filters: [
            {
              label: "技术部",
              value: "JISHU",
            },
            {
              label: "宣传部",
              value: "XUANCHUAN",
            },
            {
              label: "多媒体部",
              value: "DUOMEITI",
            },
            {
              label: "活动部",
              value: "HUODONG",
            },
            {
              labe: "外联部",
              value: "WAILIAN"
            }
          ],
          filterMethod(value, row) {
            return row.department.indexOf(value) > -1;
          },
          render: (h, params) => {
            return h("div", [
              h("span", this.departmentLabel[params.row.department]),
            ]);
          },
        },
        {
          title: "邮箱",
          key: "email",
        },
      ],
      userList: [],
    };
  },
  mounted() {
    getAdminList().then((res) => {
      this.userList = res.data;
    })
  },
  methods: {
    exportData(type) {
      if (type === 1) {
        this.$refs.table.exportCsv({
          filename: "CSSA名单",
          columns: this.columns.slice(2),
          data: this.userList.map((user) => {
            let copy = {...user}
            copy.department = this.departmentLabel[copy.department]
            return copy
          })
        });
      } else if (type === 2) {
        this.$refs.table.exportCsv({
          filename: "CSSA名单（部分）",
          original: false,
        });
      }
    },
    onPageChange: function (index) {
      this.currentPage = index;
    },
    onSelectChange: function(selection, _){
      this.selectedData = selection;
      console.log(this.selectedData)
    }
  },
};
</script>

<style scoped>
.button-group {
  position: relative;
}
.invite-button {
  position: absolute;
  right: 10px;
}
</style>