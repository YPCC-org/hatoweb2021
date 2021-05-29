<template>
    <div>

        <!-- タブUI -->
        <!--ヘッダー55px分下げる-->
        <v-app-bar
        fixed
        flat
        color="white"
        height="60px"
        style="top: 55px;">
            <v-tabs
            fixed-tabs
            show-arrows
            center-active
            v-model="selected_tab"
            >
                <v-tab
                v-for="card in cards"
                :key="card.id"
                :href="`#tab-${card.id}`"
                >
                    {{ card.grade }}
                </v-tab>
                <v-tab
                href="#tab-5"
                >
                    <v-icon>mdi-heart</v-icon>
                </v-tab>
            </v-tabs>
        </v-app-bar>

        <!-- タブの内容 -->
        <!--タブ60px分下げる-->
        <swiper style="margin-top: 60px;" ref="tabItems" :options="swiperOptions" @slideChange="swiperSlided" @slideChangeTransitionEnd="swiperSlideEnd">
            <!-- 通常のクラス展 -->
            <swiper-slide
            v-for="card in cards"
            :key="card.id"
            >
                <v-container>
                    <v-row>
                        <v-col
                        cols="6"
                        v-for="class_card in card.classes.filter(c => (c.isOpen == true) || (!is_show_closed))"
                        :key="class_card.key"
                        >
                            <classCard
                            v-if="class_card.isOpen || !is_show_closed"
                            :classkey="class_card.key"
                            :room="class_card.room"
                            :title="class_card.title"
                            :src="class_card.src"
                            :text="class_card.text"
                            :api="class_ten_api[class_card.key]"
                            :isOpen="class_card.isOpen"
                            @refreshFav="refreshFav"></classCard>
                        </v-col>
                    </v-row>
                </v-container>
            </swiper-slide>

            <!-- お気に入り -->
            <swiper-slide
            v-if="showFav"
            >
                <div v-if="!allClasses().length">
                    <v-container>
                        <div style="text-align: center">
                            <v-card outlined>
                                気になる展示をお気に入りに追加しましょう<br>
                                <v-icon>mdi-heart</v-icon>
                                <v-icon>mdi-arrow-right</v-icon>
                                <v-icon color="pink">mdi-heart</v-icon>
                            </v-card>
                        </div>
                    </v-container>
                </div>
                <div v-else>
                    <v-container>
                        <v-row>
                            <v-col
                            cols="6"
                            v-for="class_card in allClasses().filter(c => (c.isOpen == true) || (!is_show_closed))"
                            :key="class_card.key"
                            >
                                <classCard
                                v-if="class_card.isOpen || !is_show_closed"
                                :classkey="class_card.key"
                                :room="class_card.room"
                                :title="class_card.title"
                                :src="class_card.src"
                                :text="class_card.text"
                                :api="class_ten_api[class_card.key]"
                                :isOpen="class_card.isOpen"></classCard>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
            </swiper-slide>
        </swiper>

    </div>
</template>

<style>
    .swiper-wrapper {
        box-sizing: border-box;
    }
</style>

<script>
import classCard from "@/components/Class-card.vue";
import axios from "axios"
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

import 'swiper/swiper-bundle.css'

export default {
    name: 'Class',
    components: {
      classCard,
      Swiper,
      SwiperSlide,
    },

    // APIを定期取得
    methods: {
        // APIの返り値を代入
        setClasstenApi: function (response) {
            // 元の値が空(=エラー)の時
            if (this.class_ten_api == ""){
                this.class_ten_api = response.data;
            // 変更があった時
            } else if (response.data !== this.class_ten_api) {
                this.class_ten_api = response.data;
            }
        },
        // APIから値を取得する関数
        getClasstenApi: function () {
            if (document.hasFocus()) {
                axios
                    .get('https://hatoweb-api.herokuapp.com/class_ten')
                    .then(response => this.setClasstenApi(response));
            }
        },
        // 学年関係なくお気に入りされた全てのカードを返す
        // 本来computedでやるべきだが、cookiesの更新がcomputedに
        // ひっかからないので妥協
        allClasses: function() {
            let allCards = []
            for (const grade of this.cards){
                allCards = allCards.concat(grade.classes);
            }
            return allCards.filter(c => this.$cookies.isKey(c.key))
        },
        refreshFav: function () {
            this.showFav = false;
            this.showFav = true;
        },
        swiperSlided: function () {
            let tab = this.$refs.tabItems.$swiper.activeIndex + 1;
            this.selected_tab = 'tab-' + tab;
        },
        swiperSlideEnd: function() {
            this.$router.replace({ query: { tab: this.selected_tab.slice(-1) } });
        },
    },
    mounted () {
        axios
            .get('https://hatoweb-api.herokuapp.com/class_ten')
            .then(response => this.setClasstenApi(response));
        this.apiIntervalId = setInterval(this.getClasstenApi, 600000);
        this.$refs.tabItems.$swiper.slideTo(this.$route.query.tab - 1, 0);
    },
    beforeDestroy () {
      console.log('clearInterval');
      clearInterval(this.apiIntervalId);
    },

    data: () => ({
      // APIの定期取得用タイマーID
      apiIntervalId: undefined,
      // APIの返り値
      class_ten_api: "",
      cards: [
          {
            // TODO 開店中かの判定を作成する
              id: 1, grade: "中学", classes: [
                  {
                      key: "1A",
                      room: "1-A",
                      title: "1-A",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      text: "ここには1-Aのクラス展の説明が入ります\n改行も\n可能です",
                      isOpen: true
                  },
                  {
                      key: "1B",
                      room: "1-B",
                      title: "1-B",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: false
                  },
                  {
                      key: "2A",
                      room: "2-A",
                      title: "2-A",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: true
                  },
                  {
                      key: "2B",
                      room: "2-B",
                      title: "2-B",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: true
                  },
                  {
                      key: "3A",
                      room: "3-A",
                      title: "3-A",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: false
                  },
                  {
                      key: "3B",
                      room: "3-B",
                      title: "3-B",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: true
                  },
              ]
          },
          {
              id: 2, grade: "高1", classes: [
                  {
                      key: "11",
                      room: "1-1",
                      title: "1-1",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: true
                  },
                  {
                      key: "12",
                      room: "1-2",
                      title: "1-2",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: true
                  },
                  {
                      key: "13",
                      room: "1-3",
                      title: "1-3",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: true
                  },
                  {
                      key: "14",
                      room: "1-4",
                      title: "1-4",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: true
                  },
                  {
                      key: "15",
                      room: "1-5",
                      title: "1-5",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: true
                  },
                  {
                      key: "16",
                      room: "1-6",
                      title: "1-6",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: true
                  },
                  {
                      key: "17",
                      room: "1-7",
                      title: "1-7",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: true
                  },
              ]
          },
          {
              id: 3, grade: "高2", classes: [
                  {
                      key: "21",
                      room: "232",
                      title: "2-1",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: true
                  },
                  {
                      key: "22",
                      room: "233",
                      title: "2-2",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: true
                  },
                  {
                      key: "23",
                      room: "234",
                      title: "2-3",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: true
                  },
                  {
                      key: "24",
                      room: "212",
                      title: "2-4",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: true
                  },
                  {
                      key: "25",
                      room: "213",
                      title: "2-5",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: true
                  },
                  {
                      key: "26",
                      room: "223",
                      title: "2-6",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: true
                  },
                  {
                      key: "27",
                      room: "224",
                      title: "2-7",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: true
                  },
              ]
          },
          {
              id: 4, grade: "高3", classes: [
                  {
                      key: "31",
                      room: "3-1",
                      title: "3-1",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: true
                  },
                  {
                      key: "32",
                      room: "3-2",
                      title: "3-2",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: true
                  },
                  {
                      key: "33",
                      room: "3-3",
                      title: "3-3",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: true
                  },
                  {
                      key: "34",
                      room: "3-4",
                      title: "3-4",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: true
                  },
                  {
                      key: "35",
                      room: "3-5",
                      title: "3-5",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: true
                  },
                  {
                      key: "36",
                      room: "3-6",
                      title: "3-6",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: true
                  },
                  {
                      key: "37",
                      room: "3-7",
                      title: "3-7",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      isOpen: true
                  },
              ]
          },
      ],
      swiperOptions: {
        keyboard: {
            enabled: true,
        },
      },
      showFav: true,
      tabnum: 5,
      currentTab: null,
    }),
    computed: {
        selected_tab: {
            set: function (tab) {
                this.currentTab = tab.slice(-1);
                let swiperTab = this.$refs.tabItems.$swiper.activeIndex + 1;
                if (tab.slice(-1) != swiperTab) {
                    let diff = tab.slice(-1) - swiperTab;
                    if (diff > 0) {
                        [...Array(diff)].map(() =>
                            this.$refs.tabItems.$swiper.slideNext()
                        );
                    } else {
                        [...Array(diff * -1)].map(() =>
                            this.$refs.tabItems.$swiper.slidePrev()
                        );
                    }
                }
            },
            get: function () {
                var tab = this.currentTab;
                var ctab;
                if (tab > 0 && tab <= this.tabnum) {
                    ctab = 'tab-' + tab;
                } else {
                    if (this.$route.query.tab != undefined) {
                        ctab = 'tab-' + this.$route.query.tab;
                    } else {
                        this.$router.replace({ query: { tab: '1' } });
                        ctab = 'tab-1';
                    }
                }
                return ctab
            }
        },
    },
};
</script>
