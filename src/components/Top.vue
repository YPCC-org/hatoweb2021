<template>
    <div>
        <v-container>
            <v-carousel
            height="250"
            hide-delimiters
            >
                <v-carousel-item src="@/assets/top.png"></v-carousel-item>
            </v-carousel>
        </v-container>

        <v-container>
            <v-row>
                <v-col cols="6">
                    <v-card outlined style="text-align: center" to="/class">
                        <v-card-text>
                            クラス展
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="6">
                    <v-card outlined style="text-align: center">
                        <v-card-text>
                            スケジュール
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="6">
                    <v-card outlined style="text-align: center">
                        <v-card-text>
                            お知らせ
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <v-container>
            <v-card outlined>
                <v-card-title>ご挨拶</v-card-title>
                <v-card-content>
                </v-card-content>
            </v-card>
        </v-container>

        <v-container>
            <v-card outlined>
                <v-card-title>お知らせ</v-card-title>
                <v-card-item>
                    <Timeline :id="user_id" sourceType="profile" :options="{ tweetLimit: '3' }" widget-class="tweet-tl"/>
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
    user_id: "yashiropcclub"
  }),
};
</script>

<style>
</style>
