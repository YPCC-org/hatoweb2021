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
            color="orange"
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
                        v-for="class_card in card.classes"
                        :key="class_card.key"
                        >
                            <classCard
                            :tab="class_card.tab"
                            :classkey="class_card.key"
                            :room="class_card.room"
                            :title="class_card.title"
                            :src="class_card.src"
                            :text="class_card.text"
                            :api="class_ten_api[class_card.key]"
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
                            v-for="class_card in allClasses()"
                            :key="class_card.key"
                            >
                                <classCard
                                :tab="class_card.tab"
                                :classkey="class_card.key"
                                :room="class_card.room"
                                :title="class_card.title"
                                :src="class_card.src"
                                :text="class_card.text"
                                :api="class_ten_api[class_card.key]"
                                ></classCard>
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
                console.log("cookie")
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
                      tab: 1,
                      room: "1-A",
                      title: "中学1年生より賢いの?",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      text: "一気にたくさんのゲームができて楽しいです!\nぜひ来てください!",
                  },
                  {
                      key: "1B",
                      tab: 1,
                      room: "1-B",
                      title: "将軍塚古墳からの脱出",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      text: "古墳からの脱出を目指してゲームに挑戦!",
                  },
                  {
                      key: "2A",
                      tab: 1,
                      room: "2-A",
                      title: "極限推理",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      text: "ミステリ好きに贈る、本格派推理ゲーム\n貴方にこの謎がとけますか?",
                  },
                  {
                      key: "2B",
                      tab: 1,
                      room: "2-B",
                      title: "VS屋代",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      text: "VS嵐で人気だった2つのゲームを\n仲間と協力して高得点を目指そう!",
                  },
                  {
                      key: "3A",
                      tab: 1,
                      room: "3-A",
                      title: "夜に賭ける",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      text: "遂に、日本に登場したカジノ・IR!\n様々な賭け要素を生かして、日本経済を動かす大富豪になろう!※賭けるのは実際の通貨ではありません",
                  },
                  {
                      key: "3B",
                      tab: 1,
                      room: "3-B",
                      title: "MAID",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      text: "メイドが鬼になってしまった世界で、\nメイドに追いかけられながら「心のリボン」を探して\nメイドを救い出せ!",
                  },
              ]
          },
          {
              id: 2, grade: "高1", classes: [
                  {
                      key: "11",
                      tab: 2,
                      room: "1-1",
                      title: "占いの館",
                      src: require("@/assets/class_image/11.jpg"),
                      text: "おはようでやんす。突然ですが、あなたは占いを信じますか信じないなら1度占われてみませんか?\nそうしたら何かが変わるはずです。ほな、いただきまぁす。",
                  },
                  {
                      key: "12",
                      tab: 2,
                      room: "1-2",
                      title: "Make one page of memories",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      text: "バルーンを使った写真スポットです!!\nカッコ可愛い写真を沢山撮りに来てください!!",
                  },
                  {
                      key: "13",
                      tab: 2,
                      room: "1-3",
                      title: "ユニバーサルスタジオ",
                      src: require("@/assets/class_image/13.jpg"),
                      text: "インスタ映えスポットで写真を撮ったり\nアニメや任天堂の世界に入り込めちゃう?!",
                  },
                  {
                      key: "14",
                      tab: 2,
                      room: "1-4",
                      title: "トイストーリーマニア",
                      src: require("@/assets/class_image/14.jpg"),
                      text: "ディズニーの人気アトラクション「トイストーリーマニア」がモチーフのシューティングゲーム・ストラックアウトです!",
                  },
                  {
                      key: "15",
                      tab: 2,
                      room: "1-5",
                      title: "カジノ",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      text: "お菓子の景品も用意しているので、ぜひ来てください!",
                  },
                  {
                      key: "16",
                      tab: 2,
                      room: "1-6",
                      title: "インディージョーンズ",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      text: "インディージョーンズをテーマに、謎解き・射的・輪投げ・わんわんパニックを行います!それぞれにクリア条件をつけ、クリア回数によって景品をゲットできます!あなたは...この試練をクリアすることが出来るのか?お試しください!",
                  },
                  {
                      key: "17",
                      tab: 2,
                      room: "1-7",
                      title: "FEOラボから世界へ!",
                      src: require("@/assets/class_image/17.jpg"),
                      text: "ここでは新たな化学物質を見つけるために日々奮闘しています!果たして、FEOラボの意味とは?",
                  },
              ]
          },
          {
              id: 3, grade: "高2", classes: [
                  {
                      key: "21",
                      tab: 3,
                      room: "232",
                      title: "脱出ゲームDEYO!",
                      src: require("@/assets/class_image/21.jpg"),
                      text: "TV番組\"脱出ゲームDERO!\"のパロディ",
                  },
                  {
                      key: "22",
                      tab: 3,
                      room: "233",
                      title: "射的",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      text: "こんにちは!2年2組です!私たちは、2棟の3階で射的を行っています。あなたが欲しい商品があるかもしれません!ぜひ来てゲットしていってください!!!",
                  },
                  {
                      key: "23",
                      tab: 3,
                      room: "234",
                      title: "トイ・ストーリーマニアに行きたい人全員集合!",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      text: "的を倒して得点ゲット!\n2-3がつくるトイ・ストーリーマニアの世界、ぜひお楽しみあれ!",
                  },
                  {
                      key: "24",
                      tab: 3,
                      room: "212",
                      title: "犯人の犯沢さん",
                      src: require("@/assets/class_image/24.jpg"),
                      text: "たまには悪役だっていいじゃない!",
                  },
                  {
                      key: "25",
                      tab: 3,
                      room: "213",
                      title: "リアル脱出ゲーム",
                      src: require("@/assets/class_image/25.jpg"),
                      text: "いろいろな謎を準備して待ってます\nぜひお越しください!!︎",
                  },
                  {
                      key: "26",
                      tab: 3,
                      room: "223",
                      title: "トランプの兵士たちに見つからないようにゴールを目指せ!",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      text: "不思議の国に迷い込んでしまった!?\nトランプの兵士に見つからないように4つの謎を解いて脱出を目指せ!",
                  },
                  {
                      key: "27",
                      tab: 3,
                      room: "224",
                      title: "カジノ",
                      src: require("@/assets/class_image/27.jpg"),
                      text: "教室という狭い空間ですが、ギャンブルの快感を味わって いってください!",
                  },
              ]
          },
          {
              id: 4, grade: "高3", classes: [
                  {
                      key: "31",
                      tab: 4,
                      room: "3-1",
                      title: "Bismuth Labyrinth",
                      src: require("@/assets/class_image/31.jpg"),
                      text: "クラスにて人気だった2案の折衷です。\n不自然さには目を瞑ってください。",
                  },
                  {
                      key: "32",
                      tab: 4,
                      room: "3-2",
                      title: "モンスターズインク",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      text: "モンスターズインクのアトラクションが楽しめます。\nぜひ来て下さい。",
                  },
                  {
                      key: "33",
                      tab: 4,
                      room: "3-3",
                      title: "縁日",
                      src: require("@/assets/class_image/33.jpg"),
                      text: "私たち3年3組は縁日をやります!\nみんながドキドキワクワクするような屋台が盛りだくさん!\n楽しめること間違いなし!\n1棟に来たらちょっと立ち寄ってみないかい?",
                  },
                  {
                      key: "34",
                      tab: 4,
                      room: "3-4",
                      title: "クイズ大会",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      text: "色んなジャンルがあるよ!\nあなたは全問正解できるかな?",
                  },
                  {
                      key: "35",
                      tab: 4,
                      room: "3-5",
                      title: "ゴーストバスターズ",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      text: "3年5組です!\n皆さんが楽しめるアトラクションを用意して待っているのでぜひ来てください!",
                  },
                  {
                      key: "36",
                      tab: 4,
                      room: "3-6",
                      title: "プーさんのハニーハント",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      text: "ハニーポットに乗って、プーさんと一緒にハチミツを探そう!",
                  },
                  {
                      key: "37",
                      tab: 4,
                      room: "3-7",
                      title: "ドクター7〜恐怖の病棟〜",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      text: "とある呪われた病院、そこに踏み入れたら...",
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
