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
                <v-card-title>お知らせ</v-card-title>
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>
                            mdi-information
                        </v-icon>
                    </v-list-item-icon>
                    公式ページができました！
                </v-list-item>
            </v-card>
        </v-container>

        <v-container>
            <v-card outlined>
                <v-card-title>ご挨拶</v-card-title>
                <v-card-content>
                </v-card-content>
            </v-card>
        </v-container>
    </div>
</template>

<script>
export default {
  name: 'Top',
  components: {},
  data: () => ({
  }),
};
</script>
