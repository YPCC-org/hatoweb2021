<template>
    <div>

        <!-- カルーセル(トップの切り替え可能な画像) -->
        <v-toolbar
        :height="carousel_height"
        flat
        >
            <v-card
            flat
            class="rounded-0"
            width="100%">
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
        </v-toolbar>

        <!-- ページへのリンク -->
        <v-row class="mx-auto pt-3">
            <v-col cols="11" md="6" v-for="link_button in link_buttons" v-bind:key="link_button.link" class="mx-auto py-0 mt-3">
                <v-card
                flat
                :to="link_button.link"
                :style="'border: 2.5px solid ' + link_button.color + ';'"
                class="py-0 my-0 rounded-2"
                style="text-align: center;">
                    <v-card-text :style="{color: link_button.color}">
                        <v-icon :style="{color: link_button.color}">{{ link_button.icon }}</v-icon>
                        <v-spacer></v-spacer>
                        {{ link_button.text }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- お知らせ -->
        <v-row class="mx-auto pt-3">
            <v-col cols="11" md="10" class="mx-auto py-0 pb-3 px-3">
                <v-card
                max-height="300"
                flat
                style="overflow: scroll; border: 2.5px solid #17a2b8;"
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
            </v-col>
        </v-row>

        <div class="text-center my-3">
            <small>Copyright © 2021 屋代高校PC同好会結成会</small>
        </div>
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
    ],

    link_buttons: [
        { text: "クラス展", link: "/class", icon: "mdi-account-group", color: "#FF9800"},
        { text: "スケジュール", link: "/schedule", icon: "mdi-clock", color: "#2196F3"},
        { text: "イベント", link: "/event", icon: "mdi-calendar-outline", color: "#4CAF50"},
        { text: "校内展示", link: "/schoolex", icon: "mdi-warehouse", color: "#E91E63"},
        { text: "ステージ", link: "/stage", icon: "mdi-spotlight-beam", color: "#9C27B0"},
        { text: "このページについて", link: "/about", icon: "mdi-information-outline", color: "#3F51B5"},
    ],
  }),
};
</script>

<style>
</style>
