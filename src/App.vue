<template>
  <v-app>
    <v-main>
        <v-app-bar
        color="white">
            <v-app-bar-nav-icon @click="drawer=true"></v-app-bar-nav-icon>
            <v-toolbar-title>
                鳩祭
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
        absolute
        temporary>
            <v-list
            nav
            dense>
                <v-list-item-group>
                    <v-list-item link to="/">
                        <v-list-item-title>トップページ</v-list-item-title>
                    </v-list-item>
                    <v-list-item link to="class">
                        <v-list-item-title>クラス展</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>お知らせ</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>スケジュール</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>販売</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <router-view></router-view>

    </v-main>
  </v-app>
</template>

<script>
export default {
    name: 'App',

    components: {
    },

    data: () => ({
        drawer: false,
    }),
};
</script>
