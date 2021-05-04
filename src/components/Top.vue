<template>
    <div>

        <!-- カルーセル(トップの切り替え可能な画像) -->
        <v-container>
            <v-card>
                <v-carousel
                :height="carousel_height"
                hide-delimiter-background
                delimiter-icon="mdi-bird"
                >
                    <template v-slot:prev="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on">
                            mdi-chevron-left
                        </v-icon>
                    </template>
                    <template v-slot:next="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on">
                            mdi-chevron-right
                        </v-icon>
                    </template>
                    <v-carousel-item v-for="carousel_image in carousel_images" v-bind:key="carousel_image.src">
                        <v-img contain :src="carousel_image.src" :max-height="carousel_height"></v-img>
                    </v-carousel-item>
                </v-carousel>
            </v-card>
        </v-container>

        <!-- ページへのリンク -->
        <v-container>
            <v-row>
                <v-col cols="6" v-for="link_button in link_buttons" v-bind:key="link_button.link">
                    <v-card
                    outlined
                    elevation="3"
                    style="text-align: center"
                    :to="link_button.link">
                        <v-card-text>
                            <v-icon>{{ link_button.icon }}</v-icon>
                            <v-spacer></v-spacer>
                            {{ link_button.text }}
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <!-- ご挨拶 -->
        <v-container>
            <v-card
            elevation="3"
            outlined>
                <v-card-title>ご挨拶</v-card-title>
                <v-card-text>
                    あいさつの文章を<br>
                    入力<br>
                    することができます<br>
                </v-card-text>
            </v-card>
        </v-container>

        <!-- お知らせ -->
        <v-container>
            <v-card
            max-height="300"
            elevation="3"
            style="overflow: scroll"
            outlined>
                <v-card-title>
                    お知らせ
                </v-card-title>
                <v-card-subtitle style="text-align: right">
                    最終更新：{{ infoLastUpdate }}
                </v-card-subtitle>
                <v-card-text>
                    <v-simple-table>
                        <template v:slot:default>
                            <tbody>
                                <InfoCard
                                v-for="(info, index) in reversedInfoTexts"
                                v-bind:key="index"
                                :title="info.title"
                                :text="info.value"
                                :time="info.updated_at"></InfoCard>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card-text>
            </v-card>
        </v-container>

    </div>
</template>

<script>
import axios from "axios";
import InfoCard from "@/components/Top-info.vue";

export default {
  name: 'Top',
  mounted () {
    axios
      .get('https://hatoweb-api.herokuapp.com/info')
      .then(response => (this.infoTexts = response.data));
    let d = new Date
    this.infoLastUpdate = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
  },
  components: {
    InfoCard,
  },
  computed: {
    reversedInfoTexts: function () {
      return this.infoTexts
    }
  },
  data: () => ({
    infoTexts: {},
    infoLastUpdate: null,
    carousel_height: 200,
    carousel_images: [
        { src: require("@/assets/carousel/top.png")},
        { src: require("@/assets/carousel/top2.png")},
    ],

    link_buttons: [
        { text: "クラス展", link: "/class", icon: "mdi-account-group"},
        /* { text: "スケジュール", link: ""}, */
        /* { text: "お知らせ", link: ""}, */
        /* { text: "販売", link: ""}, */
    ],
  }),
};
</script>

<style>
</style>
