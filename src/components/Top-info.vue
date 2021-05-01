<template>
    <div>

        <v-list-item @click="popupEnable = true">
            {{ title }}
            <v-spacer></v-spacer>
            {{ formatedTime.mm }}/{{ formatedTime.dd }}
        </v-list-item>

        <v-dialog v-model="popupEnable">
            <v-card style="height: 800">
                <v-card-title>
                    {{ title }}
                    <v-spacer></v-spacer>
                    <v-icon>mdi-information</v-icon>
                </v-card-title>
                <v-card-subtitle>
                    {{ formatedTime.mm }}/{{ formatedTime.dd }}
                    {{ formatedTime.hh }}:{{ formatedTime.mi }}
                </v-card-subtitle>
                <v-card-text style="white-space: pre-wrap">
                    {{ text }}
                </v-card-text>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
export default {
  name: 'Top-info',
  props: ['title', 'text', 'time'],
  components: {
  },
  computed: {
    formatedTime: function () {
      var d = new Date(this.time);
      var mm = d.getMonth() + 1;
      var dd = d.getDate();
      var hh = ('0' + d.getHours()).slice(-2);
      var mi = ('0' + d.getMinutes()).slice(-2);
      return {'mm': mm, 'dd': dd, 'hh': hh, 'mi': mi}
    }
  },
  data: () => ({
    popupEnable: false,
  }),
};
</script>

<style>
</style>
