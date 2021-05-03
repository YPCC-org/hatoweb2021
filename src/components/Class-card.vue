<template>
    <div>

        <v-card
        outlined
        elevation="3"
        @click="popupEnable = true">
            <v-img contain height="100%" :src="src"></v-img>
            <v-card-subtitle>
                {{ title }}
            </v-card-subtitle>
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
                v-if="!isOpen"
                >
                    Closed
                </v-chip>
                <v-chip
                class="mr-2"
                outlined
                x-small
                color="blue"
                v-if="api">
                    混雑:{{ api.status }}
                </v-chip>
            </v-card-text>
        </v-card>

        <v-dialog v-model="popupEnable">
            <v-card style="height: 800">
                <v-img contain height="100%" :src="src"></v-img>
                <v-card-title>
                    <div style="display: inline-block">
                        {{ title }}
                    </div>
                    <div style="display: inline-block;float: right">
                        <v-btn
                        icon
                        :color="favoriteColor[isFav]"
                        @click="favorite()"
                        >
                            <v-icon>mdi-star</v-icon>
                        </v-btn>
                    </div>
                </v-card-title>
                <v-card-text v-if="api">
                    <div style="display: inline-block">
                        {{ api.comment }}
                    </div>
                    <div style="display: inline-block;float: right">
                        <v-icon>mdi-update</v-icon>
                        {{ updateTime }}
                    </div>
                </v-card-text>
                <v-card-text style="white-space: pre-wrap">
                    {{ text }}
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-snackbar
        v-model="isOpenFavSnackBar"
        >
            「{{ title }}」をお気に入りに追加しました
            <template v-slot:action="{ attrs }">
                <v-btn
                color="pink"
                text
                v-bind="attrs"
                @click="isOpenFavSnackBar = false">
                    Close
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
      var d = new Date(this.api.updated_at)
      var hh = ('0' + d.getHours()).slice(-2);
      var mi = ('0' + d.getMinutes()).slice(-2);
      return hh + ':' + mi
    }
  },
  mounted () {
    if (this.$cookies.isKey(this.classkey)) {
        this.isFav = 1;
    }
  },
  methods: {
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
    popupEnable: false,
    favoriteColor: ["gray", "yellow"],
    isFav: 0,
    isOpenFavSnackBar: false,
  }),
};
</script>

<style>
</style>
