<template>
    <v-components>

        <!-- タブUI -->
        <v-tabs
        fixed-tabs
        show-arrows
        v-model="selected_tab"
        next-icon="mdi-arrow-right-bold-circle"
        prev-icon="mdi-arrow-left-bold-circle">
            <v-tab v-for="card in cards" :key="card.id">
                {{ card.grade }}
            </v-tab>
        </v-tabs>

        <!-- タブの内容 -->
        <v-tabs-items v-model="selected_tab">
            <v-tab-item v-for="card in cards" :key="card.id">
                <v-container>
                    <v-row>
                        <v-col cols="6" v-for="class_card in card.classes" :key="class_card.text">
                            <classCard
                            :title="class_card.title"
                            :src="class_card.src"
                            :text="class_card.text"></classCard>
                        </v-col>
                    </v-row>
                </v-container>
            </v-tab-item>
        </v-tabs-items>

    </v-components>
</template>

<script>
import classCard from "@/components/Class-card.vue";
export default {
  name: 'Class',
  components: {
    classCard
  },
  data: () => ({
    cards: [
        {
            id: 1, grade: "中1", classes: [
                { title: "1-A", src: require("@/assets/class_image/1/1-1.jpg"),
                text: "ここには1-Aのクラス展の説明が入ります\n改行も\n可能です"
                },
                { title: "1-B", src: require("@/assets/class_image/1/1-1.jpg") },
            ]
        },
        {
            id: 2, grade: "中2", classes: [
                { title: "2-A", src: require("@/assets/class_image/1/1-1.jpg") },
                { title: "2-B", src: require("@/assets/class_image/1/1-1.jpg") },
            ]
        },
        {
            id: 3, grade: "中3", classes: [
                { title: "3-A", src: require("@/assets/class_image/1/1-1.jpg") },
                { title: "3-B", src: require("@/assets/class_image/1/1-1.jpg") },
            ]
        },
        {
            id: 4, grade: "高1", classes: [
                { title: "1-1", src: require("@/assets/class_image/1/1-1.jpg") },
                { title: "1-2", src: require("@/assets/class_image/1/1-1.jpg") },
                { title: "1-3", src: require("@/assets/class_image/1/1-1.jpg") },
                { title: "1-4", src: require("@/assets/class_image/1/1-1.jpg") },
                { title: "1-5", src: require("@/assets/class_image/1/1-1.jpg") },
                { title: "1-6", src: require("@/assets/class_image/1/1-1.jpg") },
                { title: "1-7", src: require("@/assets/class_image/1/1-1.jpg") },
            ]
        },
        {
            id: 5, grade: "高2", classes: [
                { title: "2-1", src: require("@/assets/class_image/1/1-1.jpg") },
                { title: "2-2", src: require("@/assets/class_image/1/1-1.jpg") },
                { title: "2-3", src: require("@/assets/class_image/1/1-1.jpg") },
                { title: "2-4", src: require("@/assets/class_image/1/1-1.jpg") },
                { title: "2-5", src: require("@/assets/class_image/1/1-1.jpg") },
                { title: "2-6", src: require("@/assets/class_image/1/1-1.jpg") },
                { title: "2-7", src: require("@/assets/class_image/1/1-1.jpg") },
            ]
        },
        {
            id: 6, grade: "高3", classes: [
                { title: "3-1", src: require("@/assets/class_image/1/1-1.jpg") },
                { title: "3-2", src: require("@/assets/class_image/1/1-1.jpg") },
                { title: "3-3", src: require("@/assets/class_image/1/1-1.jpg") },
                { title: "3-4", src: require("@/assets/class_image/1/1-1.jpg") },
                { title: "3-5", src: require("@/assets/class_image/1/1-1.jpg") },
                { title: "3-6", src: require("@/assets/class_image/1/1-1.jpg") },
                { title: "3-7", src: require("@/assets/class_image/1/1-1.jpg") },
            ]
        },
    ],
    selected_tab: "tab-1"
  }),
};
</script>
