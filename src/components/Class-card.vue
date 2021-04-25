<template>
    <div>

        <v-card
        outlined
        elevation="3"
        @click="popupEnable = true">
            <v-img contain height="100%" :src="src"></v-img>
            <v-card-subtitle>
                {{ title }}
            </v-card-subtitle>
            <v-card-text>
                <v-chip
                color="green"
                outlined
                x-small
                v-if="isOpen"
                >
                    Open
                </v-chip>
                <v-chip
                color="red"
                outlined
                x-small
                v-if="!isOpen"
                >
                    Closed
                </v-chip>
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
  props: ['title', 'src', 'text', 'isOpen'],
  components: {
  },
  data: () => ({
    popupEnable: false,
  }),
};
</script>

<style>
</style>
