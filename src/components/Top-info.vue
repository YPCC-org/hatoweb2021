<template>
        <tr @click="popupEnable = true">

            <td>
                <v-chip
                    outlined
                    x-small
                    color="red"
                    v-if="formatedTime.isNew"
                    >
                        NEW
                </v-chip>
                {{ title }}
            </td>
            <td style="text-align: right">
                {{ formatedTime.mm }}/{{ formatedTime.dd }}
                {{ formatedTime.hh }}:{{ formatedTime.mi }}
            </td>

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

        </tr>
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
      var now = new Date();
      var diff = Math.abs((now.getTime() - d.getTime()));
      var isNew = false;
      if (diff <= 3600000) {
        isNew = true;
      }
      return {'mm': mm, 'dd': dd, 'hh': hh, 'mi': mi, 'isNew': isNew}
    }
  },
  data: () => ({
    popupEnable: false,
  }),
};
</script>

<style>
</style>
