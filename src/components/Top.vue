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
            </v-card>
        </v-container>

        <!-- お知らせ用Twitter TL-->
        <v-container>
            <v-card
            elevation="3"
            outlined>
                <v-card-title>
                    お知らせ
                    <v-spacer></v-spacer>
                    <v-icon >mdi-twitter</v-icon>
                </v-card-title>
                <v-card-text>
                </v-card-text>
            </v-card>
        </v-container>

    </div>
</template>

<script>
export default {
  name: 'Top',
  components: {
  },
  data: () => ({
    carousel_height: 200,
    carousel_images: [
        { src: require("@/assets/carousel/top.png")},
        { src: require("@/assets/carousel/top2.png")},
    ],

    link_buttons: [
        { text: "クラス展", link: "/class"},
        /* { text: "スケジュール", link: ""}, */
        /* { text: "お知らせ", link: ""}, */
        /* { text: "販売", link: ""}, */
    ],
  }),
};
</script>

<style>
</style>
