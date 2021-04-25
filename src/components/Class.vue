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
                            <classCard :text="class_card.text"></classCard>
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
                { text: "1-A" },
                { text: "1-B" },
            ]
        },
        {
            id: 2, grade: "中2", classes: [
                { text: "2-A" },
                { text: "2-B" },
            ]
        },
        {
            id: 3, grade: "中3", classes: [
                { text: "3-A" },
                { text: "3-B" },
            ]
        },
        {
            id: 4, grade: "高1", classes: [
                { text: "1-1" },
                { text: "1-2" },
                { text: "1-3" },
                { text: "1-4" },
                { text: "1-5" },
                { text: "1-6" },
                { text: "1-7" },
            ]
        },
        {
            id: 5, grade: "高2", classes: [
                { text: "2-1" },
                { text: "2-2" },
                { text: "2-3" },
                { text: "2-4" },
                { text: "2-5" },
                { text: "2-6" },
                { text: "2-7" },
            ]
        },
        {
            id: 6, grade: "高3", classes: [
                { text: "3-1" },
                { text: "3-2" },
                { text: "3-3" },
                { text: "3-4" },
                { text: "3-5" },
                { text: "3-6" },
                { text: "3-7" },
            ]
        },
    ],
    selected_tab: "tab-1"
  }),
};
</script>
