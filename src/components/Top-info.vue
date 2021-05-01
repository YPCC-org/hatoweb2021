<template>
    <div>

        <v-list-item @click="popupEnable = true">
            {{ title }}
            <v-spacer></v-spacer>
            {{ new Date(time).getHours() }}:{{ new Date(time).getMinutes() }}
        </v-list-item>

        <v-dialog v-model="popupEnable">
            <v-card style="height: 800">
                <v-card-title>
                    {{ title }}
                    <v-spacer></v-spacer>
                    <v-icon>mdi-information</v-icon>
                </v-card-title>
                <v-card-subtitle>
                    {{ new Date(time).getMonth() + 1 }}/{{ new Date(time).getDate() }}
                    {{ new Date(time).getHours() }}:{{ new Date(time).getMinutes() }}
                </v-card-subtitle>
                <v-card-text>
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
  data: () => ({
    popupEnable: false,
  }),
};
</script>

<style>
</style>
