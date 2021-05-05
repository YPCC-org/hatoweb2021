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
                {{day.title}}
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
export default {
    name: 'Schedule',
    mounted () {
    },
    components: {
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
            },
            {
                id: 2,
                title: "7/6(土)",
            },
            {
                id: 3,
                title: "7/7(日)",
            },
        ],
    }),
};
</script>
