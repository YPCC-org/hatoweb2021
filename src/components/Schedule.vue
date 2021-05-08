<template>
    <div>
        <!-- タブUI -->
        <v-tabs
        fixed-tabs
        show-arrows
        center-active
        v-model="selected_tab"
        >
            <v-tab
            v-for="day in days"
            :key="day.id"
            :href="`#tab-${day.id}`"
            >
                {{ day.title }}
            </v-tab>
        </v-tabs>

        <!-- タブの内容 -->
        <v-tabs-items v-model="selected_tab" style="min-height: calc(100vh - 105px);">
            <v-tab-item
            v-for="day in days"
            :key="day.id"
            :value="`tab-${day.id}`"
            >
                <v-container>
                    <v-calendar
                    ref="calendar"
                    first-time="08:00"
                    interval-count=24
                    interval-minutes=30
                    color="primary"
                    type="category"
                    category-show-all
                    :categories="day.categories"
                    :events="day.events"
                    :event-color="getEventColor"
                    @click:event="eventPopup"
                    ></v-calendar>
                </v-container>
                <v-dialog
                v-model="popupEnable"
                v-if="popuping"
                >
                    <v-card style="height: 80%">
                        <v-card-title>
                            <table style="width: 100%;" border=0>
                                <tr>
                                    <td>
                                        {{ popuping.name }}
                                    </td>
                                    <td style="width: 1em;">
                                        <v-btn icon @click="popupEnable = false"><v-icon>mdi-close-circle</v-icon></v-btn>
                                    </td>
                                </tr>
                            </table>
                        </v-card-title>
                        <v-card-text style="white-space: pre-wrap">
                            {{ popuping.desc }}
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<style>
    .v-calendar-daily_head-weekday {
        display: none;
    }
    .v-calendar-daily_head-day-label {
        display: none;
    }
</style>

<script>
export default {
    name: 'Schedule',
    mounted () {
    },
    components: {
    },
    methods: {
        getEventColor (event) {
            return event.color
        },
        eventPopup (arg) {
            this.popupEnable = true;
            this.popuping = arg.event;
        },
    },
    computed: {
            selected_tab: {
                set: function (tab) {
                    this.$router.replace({ query: { tab: tab.slice(-1) } });
                },
                get: function () {
                    var tab = this.$route.query.tab;
                    var ctab;
                    if (tab > 0 && tab <= this.tabnum) {
                        ctab = 'tab-' + tab;
                    } else {
                        this.$router.replace({ query: { tab: '1' } });
                        ctab = 'tab-1';
                    }
                    return ctab
                }
            },
    },
    data: () => ({
        tabnum: 3,
        popupEnable: false,
        popuping: null,
        days: [
            {
                id: 1,
                title: "7/5(金)",
                categories: ["メイン"],
                events: [
                    {
                        id: 1,
                        name: "LHR & 準備",
                        desc: "ロングホームルームと準備をします。\nまあそんな感じで説明が入ります。",
                        start: new Date(new Date().setHours(8, 40, 0, 0)),
                        end: new Date(new Date().setHours(11, 0, 0, 0)),
                        category: "メイン",
                        color: "indigo",
                        timed: true,
                    },
                    {
                        id: 2,
                        name: "清掃 / 昼食",
                        desc: "hello",
                        start: new Date(new Date().setHours(11, 0, 0, 0)),
                        end: new Date(new Date().setHours(12, 0, 0, 0)),
                        category: "メイン",
                        color: "blue",
                        timed: true,
                    },
                    {
                        id: 3,
                        name: "ハト1GP",
                        desc: "hello",
                        start: new Date(new Date().setHours(12, 0, 0, 0)),
                        end: new Date(new Date().setHours(14, 45, 0, 0)),
                        category: "メイン",
                        color: "indigo",
                        timed: true,
                    },
                    {
                        id: 4,
                        name: "開会式 / 前夜祭",
                        desc: "hello",
                        start: new Date(new Date().setHours(14, 45, 0, 0)),
                        end: new Date(new Date().setHours(18, 30, 0, 0)),
                        category: "メイン",
                        color: "blue",
                        timed: true,
                    },
                ],
            },
            {
                id: 2,
                title: "7/6(土)",
                vnow: "2019-07-06",
            },
            {
                id: 3,
                title: "7/7(日)",
                vnow: "2019-07-07",
            },
        ],
    }),
};
</script>
