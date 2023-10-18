<template>
  <div style="padding: 10px">
    <div style="background: #fff; border-radius: 8px; padding: 20px">
      <div class="button-group">
        <Button style="margin-right: 5px" size="large" @click="exportData(1)"
          ><Icon type="ios-download-outline"></Icon> 导出所有人的名单</Button
        >
        <Button
          size="large"
          v-show="selectedData.length !== 0"
          type="primary"
          @click="openEmail = true"
          ><Icon type="ios-download-outline"></Icon> 发送邮件</Button
        >
        <Button size="large" class="invite-button" type="primary" @click="clickInvite"
          ><Icon type="ios-download-outline"></Icon> 创建邀请链接</Button
        >
      </div>
      <br />
      <Tag
        type="border"
        v-for="selected in selectedData"
        :key="selected.id"
        :name="selected.id"
        closable
        @on-close="unselect"
        >{{ selected.name }}</Tag
      >
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
    <Drawer title="发送邮件" width="800" v-model="openEmail">
      <div class="input-title">
        <Input
          v-model="title"
          placeholder="输入标题"
          style="
            width: 100%;
            border-top: none !important;
            border-right: none !important;
          "
        />
      </div>

      <editor
        api-key="bc2eddfcntaynxr2qtyec7omlqxnvwmkqpa96kz0y27hadoh"
        v-model="content"
        :init="{
          height: 720,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount nonbreaking tabfocus',
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help',
        }"
      />
      <div class="drawer-footer">
        <Button style="margin-right: 8px" @click="openEmail = false"
          >取消</Button
        >
        <Button type="primary" @click="clickSend">发送</Button>
      </div>
    </Drawer>
    <Modal
        v-model="openInvite"
        title="邀请">

        <h3>该邀请链接有效期为3天，请在3天之内完成成员注册</h3>
        <a class="invite-link">{{inviteLink }}</a>
        <p>Content of dialog</p>
    </Modal>
  </div>
</template>

<script>
import { getAdminList, sendEmail, invite } from "@/api";
import Editor from "@tinymce/tinymce-vue";
export default {
  name: "orguser",
  components: {
    editor: Editor,
  },
  data() {
    return {
      openEmail: false,
      title: "",
      content: "",
      departmentLabel: {
        JISHU: "技术部",
        DUOMEITI: "多媒体部",
        XUANCHUAN: "宣传部",
        HUODONG: "活动部",
        YANJIUSHENG: "研究生部",
        WAILIAN: "外联部",
      },
      inviteLink: "",
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
              label: "外联部",
              value: "WAILIAN",
            },
            {
              label: "研究生部",
              value: "YANJIUSHENG",
            },
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
    });
  },
  methods: {
    unselect(e, id) {
      console.log(id);
      let index;
      this.userList.forEach((user, i) => {
        if (user.id === id) {
          index = i;
        }
      });
      this.$refs.table.toggleSelect(index);
    },
    clickInvite(){
      let userInfo = JSON.parse(localStorage.getItem("userInfo"))
      console.log(`${window.location.host}/#/register/cssa`)
      invite(userInfo.name).then((res) => {
        if(res.status === 100){
          this.inviteLink = `${window.location.host}/#/register/${res.data}`
          this.openInvite = true;
        }
        
      })
    },
    clickSend() {
      sendEmail(
        this.selectedData.map((user) => user.email),
        this.title,
        this.content
      ).then((res) => {
        if (res.status === 100) {
          this.title = "";
          this.content = "";
          this.openEmail = false;
          this.$Notice.open({
            title: "发送邮件成功",
            desc: "邮件已发送成功，请耐心等待1-10分钟保证邮件送达。",
            duration: 0,
          });
        }
      });
    },
    exportData(type) {
      if (type === 1) {
        this.$refs.table.exportCsv({
          filename: "CSSA名单",
          columns: this.columns.slice(2),
          data: this.userList.map((user) => {
            let copy = { ...user };
            copy.department = this.departmentLabel[copy.department];
            return copy;
          }),
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
    onSelectChange: function (selection, _) {
      this.selectedData = selection;
      console.log(this.selectedData);
    },
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
.input-title .ivu-input {
  border: none;
}
.drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
.invite-linl{
    white-space: pre-wrap; /* CSS3 */    
    white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */    
    white-space: -o-pre-wrap; /* Opera 7 */    
    word-wrap: break-word; /* Internet Explorer 5.5+ */
}
</style>