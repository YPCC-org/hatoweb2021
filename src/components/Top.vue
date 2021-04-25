<template>
    <div>
        <!-- カルーセル(トップの切り替え可能な画像) -->
        <v-container>
            <v-carousel
            :height="carousel_height"
            hide-delimiter-background
            delimiter-icon="mdi-bird"
            >
                <v-carousel-item v-for="carousel_image in carousel_images" :key="carousel_image.src">
                    <v-img contain :src="carousel_image.src" :max-height="carousel_height"></v-img>
                </v-carousel-item>
            </v-carousel>
        </v-container>

        <!-- ページへのリンク -->
        <v-container>
            <v-row>
                <v-col cols="6" v-for="link_button in link_buttons" :key="link_button.link">
                    <v-card outlined style="text-align: center" :to="link_button.link">
                        <v-card-text>
                            {{ link_button.txt }}
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <!-- ご挨拶 -->
        <v-container>
            <v-card outlined>
                <v-card-title>ご挨拶</v-card-title>
                <v-card-content>
                </v-card-content>
            </v-card>
        </v-container>

        <!-- お知らせ用Twitter TL-->
        <v-container>
            <v-card outlined>
                <v-card-title>お知らせ</v-card-title>
                <v-card-item>
                    <Timeline :id="user_id" sourceType="profile" :options="{ tweetLimit: '3' }" widget-class="tweet-tl" slug="noheader"/>
                </v-card-item>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import { Timeline } from "vue-tweet-embed";
export default {
  name: 'Top',
  components: {
    Timeline
  },
  data: () => ({
    user_id: "twitter",

    carousel_height: 200,
    carousel_images: [
        { src: require("@/assets/top.png")},
        { src: require("@/assets/top2.png")},
    ],

    link_buttons: [
        { txt: "クラス展", link: "/class"},
        { txt: "スケジュール", link: ""},
        { txt: "お知らせ", link: ""},
        { txt: "販売", link: ""},
    ],
  }),
};
</script>

<style>
</style>
