<template>
    <div>

        <v-list-item @click="popupEnable = true">
            {{ title }}
            <v-spacer></v-spacer>
                {{ formated.hh }}:{{ formated.mi }}
        </v-list-item>

        <v-dialog v-model="popupEnable">
            <v-card style="height: 800">
                <v-card-title>
                    {{ title }}
                    <v-spacer></v-spacer>
                    <v-icon>mdi-information</v-icon>
                </v-card-title>
                <v-card-subtitle>
                    {{ formated.mm }}/{{ formated.dd }}
                    {{ formated.hh }}:{{ formated.mi }}
                </v-card-subtitle>
                <v-card-text>
                    {{ text }}
                </v-card-text>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
function formatDate (raw) {
  var d = new Date(raw);
  var mm = d.getMonth() + 1;
  var dd = d.getDate();
  var hh = ('0' + d.getHours()).slice(-2);
  var mi = ('0' + d.getMinutes()).slice(-2);
  return {'mm': mm, 'dd': dd, 'hh': hh, 'mi': mi}
}

export default {
  name: 'Top-info',
  props: ['title', 'text', 'time'],
  components: {
  },
  computed: {
    formated: function () {
      return formatDate(this.time)
    }
  },
  data: () => ({
    popupEnable: false,
  }),
};
</script>

<style>
</style>
