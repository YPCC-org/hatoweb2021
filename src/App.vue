<template>
  <v-app style="background-color: #f4f5f7;">
    <v-main>
        <v-app-bar
		color="white"
        height="55px"
        flat
        fixed
        >
            <v-app-bar-nav-icon @click="drawer=true"></v-app-bar-nav-icon>
            <v-toolbar-title>
                {{ this.$route.name }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon link href="https://www.instagram.com/p/CNo7BAVBkJN/">
                <v-icon>
                    mdi-instagram
                </v-icon>
            </v-btn>
            <v-btn icon link href="https://twitter.com/YashiroPCClub">
                <v-icon>
                    mdi-twitter
                </v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer
        v-model="drawer"
        fixed
        temporary>
            <v-list
            nav
            shaped
            dense>
                <v-list-item-group>
                    <v-list-item link to="/">
                        <v-list-item-title>トップページ</v-list-item-title>
                    </v-list-item>
                    <v-list-item link to="class">
                        <v-list-item-title>クラス展</v-list-item-title>
                    </v-list-item>
                    <v-list-item link to="schedule">
                        <v-list-item-title>スケジュール</v-list-item-title>
                    </v-list-item>
                    <v-list-item link to="event">
                        <v-list-item-title>イベント</v-list-item-title>
                    </v-list-item>
                    <v-list-item link to="schoolex">
                        <v-list-item-title>校内展示</v-list-item-title>
                    </v-list-item>
                    <v-list-item link to="stage">
                        <v-list-item-title>ステージ</v-list-item-title>
                    </v-list-item>
                    <v-list-item link to="about">
                        <v-list-item-title>このページについて</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>


        <transition mode="out-in">
            <!--ヘッダー55px分下げる-->
            <router-view style="padding-top: 55px;"></router-view>
        </transition>

    </v-main>
  </v-app>
</template>

<style>
    html {
        height: 100%;
        background-color: #f4f5f7;
    }
    .v-enter-active, .v-leave-active {
            transition: opacity .3s;
        }
        .v-enter, .v-leave-to {
            opacity: 0;
        }
    </style>

<script>
export default {
    name: 'App',

    components: {
    },

    mounted : function(){
        let routeInstance = this.$route;
        this.createTitleDesc(routeInstance);
    },

    data: () => ({
        drawer: false,
    }),

    methods: {
        createTitleDesc : function(routeInstance){
            if(routeInstance.meta.title){
                let setTitle = routeInstance.meta.title;
                document.title = setTitle;
            } else {
                document.title = 'title is not set'
            }
            if(routeInstance.meta.desc){
                let setDesc = routeInstance.meta.desc + ' | MIYACHIN VUE';
                document.querySelector("meta[name='description']").setAttribute('content', setDesc)
            } else {
                document.querySelector("meta[name='description']").setAttribute('content', 'description is not set')
            }
        },
    },

    watch: {
        '$route' (routeInstance, from) {
            from;
            this.createTitleDesc(routeInstance);
        }
    },
};
</script>
