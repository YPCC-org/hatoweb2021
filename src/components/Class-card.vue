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
                    {{ title }}
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
  props: ['title', 'src', 'text', 'isOpen', 'api'],
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
  data: () => ({
    popupEnable: false,
  }),
};
</script>

<style>
</style>
