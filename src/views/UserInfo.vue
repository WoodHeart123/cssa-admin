<template>
    <div class="userinfo-container">
        <div class="userinfo-title">
            <h3>基本资料</h3>
        </div>
        <div class="userinfo-content">
            <div class="user-img">
                <img
                    :src="'https://cssa-mini-na.oss-us-west-1.aliyuncs.com/cssa-mini-avatar/' + this.userInfo.avatar + '.jpg'">
            </div>
            <div style="padding: 20px;">
                <h3>{{userInfo.name }}</h3>
            </div>
        </div>
        <div class="userinfo-title">
            <h3>联系方式</h3>
        </div>
    </div>
</template>

<script>
export default {
    name: 'userinfo',
    data() {
        return {
            userInfo: {},
        }
    },
    mounted() {
        this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
    },

}
</script>

<style scoped>
.user-img {
    width: 100px;
    height: 100px;
    background: #ddd;
    border-radius: 50%;
    margin: 0 40px;
    overflow: hidden;
}

.user-img:hover {
    filter: brightness(90%);
}

.user-img img {
    width: 100%;
}

.user-img:hover::before {
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    content: '修改头像';
}

.userinfo-content{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.userinfo-container {
    width: 600px;
    height: auto;
    padding: 10px;

    border-radius: 5px;
    margin: 10px;
    padding-top: 5px;
    background-color: white;
}</style>
