<template>
    <div>

        <v-card
        outlined
        elevation="3"
        style="text-align: center"
        @click="popupEnable = true">
            <v-card-text>
                {{ text }}
            </v-card-text>
        </v-card>

        <v-dialog v-model="popupEnable">
            <v-card style="height: 800">
                <v-card-title>
                    {{ text }}の展示
                </v-card-title>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
export default {
  name: 'Class-card',
  props: ['text'],
  components: {
  },
  data: () => ({
    popupEnable: false,
  }),
};
</script>

<style>
</style>
