<template>
    <div>
        <!-- タブUI -->
        <!--ヘッダー55px分下げる-->
        <v-app-bar
        fixed
        flat
        color="white"
        height="60px"
        style="top: 55px;">
            <v-tabs
            fixed-tabs
            show-arrows
            center-active
            v-model="selected_tab"
            color="deep-purple lighten-1"
            >
                <v-tab
                v-for="day in days"
                :key="day.id"
                :href="`#tab-${day.id}`"
                >
                    {{ day.title }}
                </v-tab>
            </v-tabs>
        </v-app-bar>

        <!-- タブの内容 -->
        <!--タブ60px分下げる-->
        <swiper style="margin-top: 60px;" ref="tabItems" :options="swiperOptions" @slideChange="swiperSlided" @slideChangeTransitionEnd="swiperSlideEnd">
            <swiper-slide
            v-for="day in days"
            :key="day.id"
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
            </swiper-slide>
        </swiper>
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
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

import 'swiper/swiper-bundle.css'

export default {
    name: 'Schedule',
    mounted () {
        this.$refs.tabItems.$swiper.slideTo(this.$route.query.tab - 1, 0);
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    methods: {
        getEventColor (event) {
            return event.color
        },
        eventPopup (arg) {
            this.popupEnable = true;
            this.popuping = arg.event;
        },
        swiperSlided: function () {
            let tab = this.$refs.tabItems.$swiper.activeIndex + 1;
            this.selected_tab = 'tab-' + tab;
        },
        swiperSlideEnd: function() {
            this.$router.replace({ query: { tab: this.selected_tab.slice(-1) } });
        },
    },
    computed: {
            selected_tab: {
                set: function (tab) {
                    this.currentTab = tab.slice(-1);
                    let swiperTab = this.$refs.tabItems.$swiper.activeIndex + 1;
                    if (tab.slice(-1) != swiperTab) {
                        let diff = tab.slice(-1) - swiperTab;
                        if (diff > 0) {
                            [...Array(diff)].map(() =>
                                this.$refs.tabItems.$swiper.slideNext()
                            );
                        } else {
                            [...Array(diff * -1)].map(() =>
                                this.$refs.tabItems.$swiper.slidePrev()
                            );
                        }
                    }
                },
                get: function () {
                    var tab = this.currentTab;
                    var ctab;
                    if (tab > 0 && tab <= this.tabnum) {
                        ctab = 'tab-' + tab;
                    } else {
                        if (this.$route.query.tab != undefined) {
                            ctab = 'tab-' + this.$route.query.tab;
                        } else {
                            this.$router.replace({ query: { tab: '1' } });
                            ctab = 'tab-1';
                        }
                    }
                    return ctab
                }
            },
    },
    data: () => ({
        swiperOptions: {
            keyboard: {
                enabled: true,
            },
        },
        tabnum: 3,
        currentTab: null,
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
