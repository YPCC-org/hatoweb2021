<template>
    <div>

        <!-- カード一覧 -->
        <v-card
        outlined
        elevation="3">
            <div style="position: relative">
                <!-- 画像 -->
                <v-img contain height="100%" :src="src" @click="popupEnable = true"></v-img>
                <!-- 閉じるボタン -->
                <v-card-actions style="float: right; position: absolute; right: 0px; top: 0px">
                    <v-btn
                    icon
                    :color="favoriteColor[isFav]"
                    @click="favorite()"
                    >
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>
                </v-card-actions>
            </div>
            <div @click="popupEnable = true;checkIsFav()">
            <!-- クラス展の名前 -->
            <v-card-subtitle>
                {{ title }}
            </v-card-subtitle>
            <!-- ステータス -->
            <v-card-text>
                <v-chip
                color="green"
                class="mr-2"
                outlined
                x-small
                v-if="isOpen"
                >
                    Open
                </v-chip>
                <v-chip
                color="red"
                class="mr-2"
                outlined
                x-small
                v-else
                >
                    Closed
                </v-chip>
                <!-- <v-chip -->
                <!-- class="mr-2" -->
                <!-- outlined -->
                <!-- x-small -->
                <!-- :color="statusColor[api.status - 1]" -->
                <!-- v-if="api &#38;&#38; isOpen"> -->
                <!--     混雑:{{ api.status }} -->
                <!-- </v-chip> -->
                <v-chip
                :color="statusColor[api.status - 1]"
                class="mr-2"
                outlined
                x-small
                v-if="api && isOpen"
                >
                    <v-icon
                    v-for="i in api.status"
                    :key="i"
                    :color="statusColor[api.status - 1]"
                    small
                    style="width: 0.5em;">mdi-human-male</v-icon>
                    <v-icon
                    v-for="i in (5 - api.status)"
                    :key="i"
                    color="grey"
                    small
                    style="width: 0.5em;">mdi-human-male</v-icon>
                </v-chip>
            </v-card-text>
            </div>
        </v-card>

        <!-- 詳細表示 -->
        <v-dialog v-model="popupEnable">
            <v-card style="height: 80%">
            <div style="position: relative">
                <!-- 画像 -->
                <v-img contain height="100%" :src="src"></v-img>
                <!-- 閉じるボタン -->
                <v-card-actions style="float: right; position: absolute; right: 5px; top: 5px">
                    <v-btn icon @click="popupEnable = false"><v-icon>mdi-close-circle</v-icon></v-btn>
                </v-card-actions>
            </div>
                <!-- クラス展の名前 -->
                <v-card-title>
                    <div style="display: inline-block">
                        {{ title }}
                    </div>
                    <!-- お気に入りボタン -->
                    <div style="display: inline-block;float: right">
                        <v-btn
                        icon
                        :color="favoriteColor[isFav]"
                        @click="favorite()"
                        >
                            <v-icon>mdi-heart</v-icon>
                        </v-btn>
                    </div>
                </v-card-title>
                <!-- 一言コメント -->
                <v-card-text v-if="api">
                    <div style="display: inline-block">
                        {{ api.comment }}
                    </div>
                    <div style="display: inline-block;float: right">
                        <v-icon>mdi-update</v-icon>
                        {{ updateTime }}
                    </div>
                </v-card-text>
                <!-- ステータス -->
                <v-card-text>
                    <v-chip
                    color="green"
                    class="mr-2"
                    outlined
                    x-small
                    v-if="isOpen"
                    >
                        Open
                    </v-chip>
                    <v-chip
                    color="red"
                    class="mr-2"
                    outlined
                    x-small
                    v-else
                    >
                        Closed
                    </v-chip>
                    <v-chip
                    :color="statusColor[api.status - 1]"
                    class="mr-2"
                    outlined
                    x-small
                    v-if="api && isOpen"
                    >
                        <v-icon
                        v-for="i in api.status"
                        :key="i"
                        :color="statusColor[api.status - 1]"
                        small
                        style="width: 0.5em;">mdi-human-male</v-icon>
                        <v-icon
                        v-for="i in (5 - api.status)"
                        :key="i"
                        color="grey"
                        small
                        style="width: 0.5em;">mdi-human-male</v-icon>
                    </v-chip>
                </v-card-text>
                <!-- 説明 -->
                <v-card-text style="white-space: pre-wrap">
                    {{ text }}
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-snackbar
        v-model="isOpenFavSnackBar"
        >
            「{{ title }}」をお気に入り(❤︎)に追加しました!
            <template v-slot:action="{ attrs }">
                <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="isOpenFavSnackBar = false">
                    OK
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
export default {
  name: 'Class-card',
  // titile     : クラス展の名前
  // src        : 画像のリンク
  // text       : クラス展の説明
  // isOpen     : クラス展が開いているか
  // api        : APIの返り値
  props: ['title', 'src', 'text', 'isOpen', 'api', 'classkey'],
  components: {
  },
  computed: {
    updateTime: function () {
      let d = new Date(this.api.updated_at)
      let hh = ('0' + d.getHours()).slice(-2);
      let mi = ('0' + d.getMinutes()).slice(-2);
      return hh + ':' + mi
    },
    popupEnable: {
        get: function () {
            if (this.$route.query.class == this.classkey) {
                return true
            } else {
                return false
            }
        },
        set: function (arg) {
            if (arg) {
                this.$router.replace({
                    query: {
                        tab: this.$route.query.tab,
                        class: this.classkey,
                    },
                });
            } else {
                this.$router.replace({
                    query: {
                        tab: this.$route.query.tab,
                    },
                });
            }
        },
    },
  },
  mounted () {
    this.checkIsFav()
  },
  updated () {
    this.checkIsFav()
  },
  methods: {
    // Tabが読み込まれたとき発火
    checkIsFav: function() {
    console.log("updated")
        if (this.$cookies.isKey(this.classkey)) {
            this.isFav = 1;
        } else {
            this.isFav = 0;
        }
    },
    // お気に入りに登録
    favorite: function() {
        if (this.isFav == 0){
            this.$cookies.set(this.classkey, true);
            this.isOpenFavSnackBar = true;
            this.isFav = 1;
        } else if (this.isFav == 1){
            this.$cookies.remove(this.classkey);
            this.isFav = 0;
        }
    },
  },
  data: () => ({
    favoriteColor: ["gray", "pink"],
    statusColor: ["blue", "cyan", "green", "orange", "red"],
    isFav: 0,
    isOpenFavSnackBar: false,
  }),
};
</script>

<style>
</style>
