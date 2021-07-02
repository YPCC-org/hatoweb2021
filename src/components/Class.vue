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
                      src: require("@/assets/class_image/1A.jpg"),
                      text: "1-Aでは「中学1年生よりも賢いの？」という学級展をしています。内容は、参加者が出される問題を解いていき、困った時には中学1年生の救済措置を使いながら、ポイントをゲットしていくゲームです。が、ポイントの取り方は一つではありません！このゲームでは、答える前に射的を打ち、あたったらボイントと解答権が貰えます。なので答えが外れてもポイントはもらえ、正解したら更にポイントがもらえます！また、本家では間違えたら終わりですが、ここでは制限時間内なら何回間違えてもOKです！一位になれるように頑張りましょう！",
                  },
                  {
                      key: "1B",
                      tab: 1,
                      room: "1-B",
                      title: "将軍塚古墳からの脱出",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      text: "将軍塚古墳で見学をしていたら、迷子になってしまった...！\nすると、子ハニワが攻撃をしてきた！ここから逃げるにはハニワたちを倒すしかない!石を投げて、ハニワを割ったり、輪を投げてハニワを封印したりしよう！そして、最後の勝負はハニワキング。クイズ対決で、見事勝利し、脱出せよ！ あなたは、ハニワたちに勝ち、古墳から脱出できるかな？",
                  },
                  {
                      key: "2A",
                      tab: 1,
                      room: "2-A",
                      title: "極限推理",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      text: "私達は「極限推理」と題した推理ゲームを行います。廃校と山奥のコテージ、二種類の殺人は世界線も内容も全く違うので、ぜひどちらにも挑戦してみて下さい。さらに今回は、謎を解いてステージをクリアするまでのタイムを競い、上位3グループを教室前のホワイトボードに掲示します。目指せ、ランクイン！狂気の殺人犯を、見つけ出せ！",
                  },
                  {
                      key: "2B",
                      tab: 1,
                      room: "2-B",
                      title: "VS屋代",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      text: "あなたは、テレビ番組「VS嵐」を見たことがありますか？2年B組では、「VS屋代」という企画を行います。この企画では、VS嵐の競技である、「コロコロバイキング」と、「カタカナ嵐」をプレイすることができます。ぜひ、来てください！",
                  },
                  {
                      key: "3A",
                      tab: 1,
                      room: "3-A",
                      title: "夜に賭ける",
                      src: require("@/assets/class_image/3A.jpg"),
                      text: "ブラックジャック・クイズ・ダーツ・コインタワー・・・\nここでは皆、王になる可能性を秘めている。敗者は常に勝者を獲っている。勝者は常に勝者ではいられない。夜の国を軽やかに翔け抜け、最後に王冠を手にするのは誰だ。",
                  },
                  {
                      key: "3B",
                      tab: 1,
                      room: "3-B",
                      title: "MAID〜それが見えたら、終わり。〜",
                      src: require("@/assets/class_image/3B.jpg"),
                      text: "こんにちは！3年B組です。私達のクラス展のテーマは「MAID 〜それが見えたら終わり〜」です。舞台は腐敗した世界。ご主人様が失脚して、国に染まってしまったメイド達があなたを見つけて追いかけてきます。果たして、あなたはメイド達から逃げ切り、「心のリボン」を探し出してメイド達を元の姿に戻し、救うことが出来るでしょうか！？タイムアタック形式で競います。来てくれた人には景品があるかも？\n3年B組でかわいいメイド達があなたをお待ちしています。",
                  },
              ]
          },
          {
              id: 2, grade: "高1", classes: [
                  {
                      key: "11",
                      tab: 2,
                      room: "433",
                      title: "ボッチャ",
                      src: require("@/assets/class_image/11.jpg"),
                      text: "東京2021東京パラリンピック正式種目「ボッチャ」誰でもできる簡単なルールですがやってみれば意外と奥が深いものです。皆さん一度友達、恋人とボッチャしてみませんか？かわいい女子が待ってます！！！！",
                  },
                  {
                      key: "12",
                      tab: 2,
                      room: "432",
                      title: "Make one page of memories〜黒板＆バルーンアートの世界へ〜",
                      src: require("@/assets/class_image/12.jpg"),
                      text: "我々一年二組は、『Make one page of memories〜黒板＆バルーンアートの世界へ〜』をやります。イェイ❗イェイ❗٩( ᐛ )و (≧▽≦) ここではその名の通り、黒板とフーセンガムを使ってインスタグラムやツイッターでトレンド入りを狙えるようなすごい写真が撮れる素晴らしいものを用意しています。\n高校生以下のMr.childrenには、入場者限定特典があります。\n「ヘンゼルとグレーテル」「お月さまのカラフルリングなメルヘンチック」をテーマにしたヴァルーンによる夢の世界へユーたちをいざないます。\nはっきり言って、マジでクオリティー高いです‼クオリティーヤバイです‼",
                  },
                  {
                      key: "13",
                      tab: 2,
                      room: "431",
                      title: "ユニバーサルスタジオYASHIRO",
                      src: require("@/assets/class_image/13.jpg"),
                      text: "1年3組の展示はユニバーサルスタジオYASHIROです！アトラクションで遊んだり、映える写真をたくさん撮ろう！撮影スポットは全部で4つ。マンガ・アニメの世界に飛び込めちゃうパネル、スーパーマリオのステージ・リトルマーメイドのキラキラした世界観を再現したスポット。そして黒板アートがあります！お友達との思い出に、是非撮ってみてはどうでしょうか。メインのアトラクションはスローイングスナイパーです！ボールをお馴染みの敵キャラに当てて倒して、ポイントをゲットしちゃいましょう。とにかく映えるユニバーサルスタジオYASHIRO！ぜひ来てくださいね！",
                  },
                  {
                      key: "14",
                      tab: 2,
                      room: "423",
                      title: "ホーンテッドマンション",
                      src: require("@/assets/class_image/14.jpg"),
                      text: "みんな知ってるディズニーのキャラクターがゴーストになってしまいました！！ゴーストたちの館からカードを見つけ出し撃退するボールと交換しましょう。ボールを投げてゴーストたちからみんなを守りましょう！！皆さんの力が必要です。\n1-4で待ってます！！！",
                  },
                  {
                      key: "15",
                      tab: 2,
                      room: "422",
                      title: "カジノ",
                      src: require("@/assets/class_image/15.jpg"),
                      text: "1-5はババ抜きやポーカーなどのトランプゲームのカジノを行います。景品はお菓子なのでもちろん合法です！！安心して下さい。来ていただけると嬉しいです！",
                  },
                  {
                      key: "16",
                      tab: 2,
                      room: "421",
                      title: "インディージョーンズ",
                      src: require("@/assets/class_image/1/1-1.jpg"),
                      text: "僕達1年6組ではアドベンチャー『インディージョーンズ』をプレイしてもらいます。インディージョーンズのような探検をするのに必要な能力を試すことの出来る「試練の洞窟」\nここでは知識・閃きの試練 狙撃の試練 縄投げの試練 反射神経の試練の4つの試練があり、皆さんにはこのうち3つの試練に挑戦してもらう。各試練ごとにクリア条件を設けてあるため、全てクリアを目指して頑張って欲しい。全てクリアすると景品が貰えるとか貰えないとか...\n全てのクリア条件はシビアに設定してあるため、中々全てクリアするのは難しいかもしれないが、君たちならできると信じている！幸運を祈る！若き探検隊達よ",
                  },
                  {
                      key: "17",
                      tab: 2,
                      room: "411",
                      title: "FeOラボから世界へ",
                      src: require("@/assets/class_image/17.jpg"),
                      text: "FeOラボでは新たな化学物質を発見するために、日々研究しています！皆さんには3つのゲームに挑戦していただきます。ゲームをクリアすると新たな化学物質を発見する手掛かりを得ることが出来ます。\n<研究者たちから一言>\n箱の中身当てクイズ:音や重さで箱の中身を当てる一風変わった箱の中身当てクイズ！\n間違い探し:簡単なものから難しいものまで！誰でも楽しめます！！\nパズル:あなたにこのパズルが解けるかな\n謎解き:諦めたらそこでゲーム終了ですよ。\nユーモア溢れる面白いゲームがたくさん！ぜひFeOラボにいらっしゃってください！",
                  },
              ]
          },
          {
              id: 3, grade: "高2", classes: [
                  {
                      key: "21",
                      tab: 3,
                      room: "232",
                      title: "脱出ゲーム DEYO！",
                      src: require("@/assets/class_image/21.jpg"),
                      text: "2年1組。謎に包まれたこの教室には4つの試練が待ち構えている。極限状態での協力プレイ、迫り来る天井や謎の石像からの恐怖や緊張の中、謎を解いて脱出できるのか！？そして最後の試練は突破できるのか！？\n「リアル脱出ゲームDEYO！」\n挑戦者求む",
                  },
                  {
                      key: "22",
                      tab: 3,
                      room: "233",
                      title: "あなたが欲しいものがあたるかもshateki",
                      src: require("@/assets/class_image/22.jpg"),
                      text: "2年2組です！私たちは2棟3階にて射的とフォトスポットを展開しています！射的は、面白い銃を使って、また、的に当てた点数に応じてクジが引けます！商品はお楽しみに！ついでにフォトスポットも寄っててね！！！",
                  },
                  {
                      key: "23",
                      tab: 3,
                      room: "234",
                      title: "トイストーリーマニアに行きたい人全員集合！",
                      src: require("@/assets/class_image/23.jpg"),
                      text: "2年3組では、トイストーリーマニアをモチーフとしたアトラクションを行います。台車に乗りながら、教室のコースを進みます。ボールで教室にたくさんおいてある的を当てて、得点をゲットするゲームです。ディズニーにいけない今のご時世、、私達が千曲市にディズニーシーを作りました。本家を超えてしまうことだけが心配です。私達が作る屋代高校2-3トイストーリーマニアにお越し下さい！",
                  },
                  {
                      key: "24",
                      tab: 3,
                      room: "212",
                      title: "犯人の犯沢さん",
                      src: require("@/assets/class_image/24.jpg"),
                      text: "あなたは黒の組織のメンバーです。あなたは入り口の赤外線センサーを抜けて、一足先に犯行現場に入った犯沢さんの手伝いをしなければなりません。果たして、家の人が帰って来る前に犯行の痕跡を消すことが出来るか！？",
                  },
                  {
                      key: "25",
                      tab: 3,
                      room: "213",
                      title: "リアル脱出ゲーム",
                      src: require("@/assets/class_image/25.jpg"),
                      text: "思わず目を閉じたくなる恐怖、あなたは耐えられますか？？\nここは数ヶ月前に主が行方不明になった館。\nこの辺りでは奇妙な殺人事件が数多く起こっている。\n遺産目当てで足を踏み入れた者は二度と戻ってくることはなかった…\n誰もいないはずのこの館にはいくつかの謎が。\n君たちは無事遺産を奪い逃げ切ることは出来るのか？！？！\nこの怖さ半端ない決して後ろを振り向くな。",
                  },
                  {
                      key: "26",
                      tab: 3,
                      room: "223",
                      title: "不思議の国のアリス",
                      src: require("@/assets/class_image/26.jpg"),
                      text: "2年6組は不思議の国のアリスをモチーフとした謎解き脱出ゲームを行います。謎を解きながら迷路を進み、ゴールを目指します。謎は全部で4問あり、正解することによって先に進むことができます。解けない場合には、スタッフがヒントを出し、先に進めるようアシストします。問題は午前と午後で変えるため、2日間でこのコースを計4回楽しむことができます。多くの皆様の挑戦をお待ちしております。",
                  },
                  {
                      key: "27",
                      tab: 3,
                      room: "224",
                      title: "カジノ",
                      src: require("@/assets/class_image/27.jpg"),
                      text: "こんにちは！我ら2年7組は、カジノをやります。カジノと言ってもどんなことをやるのか分からない人は少なくないと思います。カジノはチップを増やしていくことを目的とした、対戦相手と勝負の駆け引きを楽しめる言わば究極の運ゲーです。我らの担任であり、伝説の数学教師であるA先生も「カジノ=人生」と言うほど夢中になると沼にハマってしまいます。今回、2年7組では本格的なカジノ(インディアンポーカー、ブラックジャック、ルーレット)をお楽しみいただけます。皆様のご来場を2年7組一同、心よりお待ちしております。",
                  },
              ]
          },
          {
              id: 4, grade: "高3", classes: [
                  {
                      key: "31",
                      tab: 4,
                      room: "123",
                      title: "Bismuth Labyrinth",
                      src: require("@/assets/class_image/31.jpg"),
                      text: "迷宮を突破して、自然の神秘の詰まった宝物をゲットしよう！！上手くいくかどうかはあなたの頭脳と運にかかっています。謎解きに自信のある方や、結晶に興味のある方、ぜひ一度いらしてください。楽しんで頂けること請け合いです。",
                  },
                  {
                      key: "32",
                      tab: 4,
                      room: "131",
                      title: "モンスターズインク",
                      src: require("@/assets/class_image/32.jpg"),
                      text: "僕たち3年2組はモンスターズインクのトロッコ的当てを企画しています。なんとトロッコは手作りです。頑張って作りました！褒めてくれてもいいんですよ？てか褒めてください。トロッコとは軽便鉄道や産業鉄道、軍用鉄道における貨車の一種。もしくは人力によって走らせる手押し車。英語の truck (トラック) のなまったものが語源とされる。的の大きさも皆さまが入れやすいように研究を重ね試行錯誤を繰り返しました！多少出来が悪くても勘弁してくださいね！！！",
                  },
                  {
                      key: "33",
                      tab: 4,
                      room: "132",
                      title: "縁日",
                      src: require("@/assets/class_image/33.jpg"),
                      text: "私たち3年3組は縁日をやります。\nみなさんお祭りは好きですか？\nお祭りでワクワクドキドキする楽しい屋台が3年3組の教室に集結！！！\n輪投げ、射的、サンダルカゴ入れ、そしてすくったお菓子はプレゼントのお菓子すくい！\n点数制なのでぜひ総合1位を目指してチャレンジしてみてください！\n1棟に来たらちょっと立ち寄ってみないかい？",
                  },
                  {
                      key: "34",
                      tab: 4,
                      room: "133",
                      title: "なぞとけ どうぶつの森",
                      src: require("@/assets/class_image/34.jpg"),
                      text: "『どうぶつの森』の世界の住人のあなた。「たぬきち商店」に借りたお金の支払い期限が迫っているのに、あと100000ベル足りないだなも〜やなんとかして残りのお金を稼ぐだなも！宝探しやストラックアウト、謎解きで「ベル」を稼いでローンを完済しよう！",
                  },
                  {
                      key: "35",
                      tab: 4,
                      room: "141",
                      title: "ゴーストバスターズ",
                      src: require("@/assets/class_image/35.jpg"),
                      text: "3年5組です！3年5組ではゴーストバスターズをテーマとしたクラス展を開きます。皆さんが楽しめるアトラクションを用意して待っているので是非来て下さい！",
                  },
                  {
                      key: "36",
                      tab: 4,
                      room: "142",
                      title: "プーさんのハニーハント",
                      src: require("@/assets/class_image/36.jpg"),
                      text: "3年6組ではあの大人気テーマパークのアトラクション「プーさんのハニーハント」を忠実に再現しました！ハニーポットに乗ってプーさんと一緒にハチミツを探しに行こう！コロナ禍で、行きたくても行けなかったみなさん、ぜひ夢の国に来た気分を味わって下さい！！",
                  },
                  {
                      key: "37",
                      tab: 4,
                      room: "143",
                      title: "狂医病棟",
                      src: require("@/assets/class_image/37.jpg"),
                      text: "私達のクラスではお化け屋敷をやります。今年はいつもとひと味違うお化け屋敷を皆さんにお届け出来るよう様々な仕掛けを用意しました。舞台は閉鎖された廃病院。そこでは天才外科医がメスを探して暴れ出す？！「タ・ス・ケ・テ…」殺された者達の叫びが聞こえてくる…。身の毛もよだつ恐怖体験。是非遊びに来て下さい！",
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
