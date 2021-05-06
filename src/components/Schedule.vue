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
        <v-tabs-items v-model="selected_tab">
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
                    ></v-calendar>
                </v-container>
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
    method: {
        getEventColor (event) {
            return event.color
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
        days: [
            {
                id: 1,
                title: "7/5(金)",
                categories: ['メイン'],
                events: [
                    {
                        name: "LHR & 準備",
                        start: new Date(new Date().setHours(8, 40, 0, 0)),
                        end: new Date(new Date().setHours(11, 0, 0, 0)),
                        category: 'メイン',
                        color: 'indigo',
                        timed: true,
                    },
                    {
                        name: "清掃 / 昼食",
                        start: new Date(new Date().setHours(11, 0, 0, 0)),
                        end: new Date(new Date().setHours(12, 0, 0, 0)),
                        category: 'メイン',
                        color: 'blue',
                        timed: true,
                    },
                    {
                        name: "ハト1GP",
                        start: new Date(new Date().setHours(12, 0, 0, 0)),
                        end: new Date(new Date().setHours(14, 45, 0, 0)),
                        category: 'メイン',
                        color: 'indigo',
                        timed: true,
                    },
                    {
                        name: "開会式 / 前夜祭",
                        start: new Date(new Date().setHours(14, 45, 0, 0)),
                        end: new Date(new Date().setHours(18, 30, 0, 0)),
                        category: 'メイン',
                        color: 'blue',
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
