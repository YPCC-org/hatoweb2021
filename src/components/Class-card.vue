<template>
    <div>

        <v-card
        outlined
        elevation="3"
        style="text-align: center"
        @click="popupEnable = true">
            <v-img contain height="100%" :src="src"></v-img>
            <v-card-text>
                {{ title }}
            </v-card-text>
        </v-card>

        <v-dialog v-model="popupEnable">
            <v-card style="height: 800">
                <v-img contain height="100%" :src="src"></v-img>
                <v-card-title>
                    {{ title }}
                </v-card-title>
                <v-card-text style="white-space: pre-wrap">
                    {{ text }}
                </v-card-text>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
export default {
  name: 'Class-card',
  props: ['title', 'src', 'text'],
  components: {
  },
  data: () => ({
    popupEnable: false,
  }),
};
</script>

<style>
</style>
