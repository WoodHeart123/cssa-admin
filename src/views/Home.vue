<template>
  <div class="home-container">
    <div class="home-content">
      <div class="home-split-pane">
        <h3>我的文宣</h3>
      </div>
      <div class="home-split-pane">
        <h3>我的活动</h3>
      </div>
    </div>
    <div class="home-content">
      <div slot="right" class="home-split-horizontal">
        <div style="padding:10px">
            <h3 >文宣安排</h3>
        </div>
        <div class="timeline-scroll">
            <Timeline style="margin-top:40px;z-index: 5">
          <TimelineItem v-for="article in articleSchedule" :key="article.id">
            <Card>
              <a href="#" slot="extra" @click.prevent="changeLimit">
                <Icon type="ios-loop-strong"></Icon>
                {{article.isExternal?"":"安排排版人员"}}
              </a>
              <p slot="title">{{ article.date }}</p>

              <p class="content">主题：<a>{{ article.title }}</a>{{article.isExternal?"（外部）":""}}</p>
              <p v-show="!article.isExternal" class="content">负责人：{{ article.author }}</p>
              <p class="content">创建人：{{ article.author }}</p>
            </Card>
          </TimelineItem>
          <TimelineItem><a href="#">查看更多</a></TimelineItem>
        </Timeline>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { fetchUserData } from "@/api";
import { getAdminList} from "@/api";
export default {
  name: "home",
  data() {
    return {
      userInfo: "",
      userList: [],
      articleSchedule: [
        {
          id: 1,
          date: "2023-11-01",
          title: "Conference on AI",
          author: "John Doe",
        },
        {
          id: 2,
          date: "2023-11-10",
          title: "Workshop on Machine Learning",
          author: "Alice Smith",
        },
        {
          id: 3,
          date: "2023-11-15",
          title: "Web Development Seminar",
          isExternal: true,
          author: "Bob Johnson",
        },
        {
          id: 4,
          date: "2023-11-20",
          title: "Cybersecurity Bootcamp",
          author: "Charlie Brown",
        },
        {
          id: 5,
          date: "2023-11-28",
          title: "Networking Event for Developers",
          author: "Eve Adams",
        },
      ],
    };
  },
  mounted(){
    getAdminList().then((res) => {
      this.userList = res.data;
    });
  },
  methods: {
    getUserData() {
      fetchUserData().then((res) => {
        this.userInfo = JSON.stringify(res, null, 4);
      });
    },
  },
};
</script>

<style scoped>
.home-container {
  padding: 10px;
  padding-top: 5px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.home-content {
  border-radius: 5px;

  margin: 10px;
  flex-direction: column;
}


.home-split-pane {
  padding: 10px;
  background: #fff;
  margin: 10px;
}

.home-split-horizontal {
  height: 100%;
  background: #fff;
  border-radius: 8px;
  position: relative;
}
.timeline-scroll{
    padding: 0 20px 20px 20px;
    height: calc(100% - 50px);
    overflow-y: hidden;
}
.timeline-scroll:hover, .timeline-scroll:active, .timeline-scroll:focus {
  overflow-y: auto;
}
.timeline-scroll::-webkit-scrollbar-track-piece {
  background-color: #f8f8f800;
}
.timeline-scroll::-webkit-scrollbar {
  width: 6px;
  transition: all 2s;
}
.timeline-scroll::-webkit-scrollbar-thumb {
  background-color: #dddddd;
  border-radius: 100px;
}
.timeline-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
}
.timeline-scroll::-webkit-scrollbar-corner {
  background-color: rgba(255, 255, 255, 0);
}

</style>