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
            color="blue"
            >
                <v-tab href="#tab-1">
                    7/2 (金)
                </v-tab>
                <v-tab href="#tab-2">
                    7/3 (土)
                </v-tab>
                <v-tab href="#tab-3">
                    7/4 (日)
                </v-tab>
                <v-tab href="#tab-4">
                  前夜祭
                </v-tab>
            </v-tabs>
        </v-app-bar>

        <!-- タブの内容 -->
        <!--タブ60px分下げる-->
        <swiper style="margin-top: 60px;" ref="tabItems" :options="swiperOptions" @slideChange="swiperSlided" @slideChangeTransitionEnd="swiperSlideEnd">
            <swiper-slide>
                <v-container>
                    <Fri class="col-12"></Fri>
                </v-container>
            </swiper-slide>
            <swiper-slide>
                <v-container>
                    <Sad class="col-12"></Sad>
                </v-container>
            </swiper-slide>
            <swiper-slide>
                <v-container>
                    <Sun class="col-12"></Sun>
                </v-container>
            </swiper-slide>
            <swiper-slide>
                <v-container>
                    <EveFest class="col-12"></EveFest>
                </v-container>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import Fri from '@/components/schedules/Fri.vue'
import Sad from '@/components/schedules/Sad.vue'
import Sun from '@/components/schedules/Sun.vue'
import EveFest from '@/components/schedules/Eve-festival.vue'

import 'swiper/swiper-bundle.css'

export default {
    name: 'Schedule',
    mounted () {
        this.$refs.tabItems.$swiper.slideTo(this.$route.query.tab - 1, 0);
    },
    components: {
        Fri,
        Sad,
        Sun,
        EveFest,
        Swiper,
        SwiperSlide,
    },
    methods: {
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
                            this.$router.replace({ query: { tab: '2' } });
                            ctab = 'tab-2';
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
        tabnum: 4,
        currentTab: null,
    }),
};
</script>
