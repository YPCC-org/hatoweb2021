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
                            <table width="100%" border=0>
                                <tr>
                                    <td style="padding-right: 1em;">
                                        {{ title }}
                                    </td>
                                    <td width="1em" valign="top">
                                        <v-btn icon @click="popupEnable = false"><v-icon>mdi-close-circle</v-icon></v-btn>
                                    </td>
                                </tr>
                            </table>
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
      let d = new Date(this.time);
      let now = new Date();
      let diff = Math.abs((now.getTime() - d.getTime()));
      let isNew = false;
      let mm = d.getMonth() + 1;
      let dd = d.getDate();
      let hh = ('0' + d.getHours()).slice(-2);
      let mi = ('0' + d.getMinutes()).slice(-2);
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
