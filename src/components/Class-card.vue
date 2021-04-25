<template>
    <v-card outlined style="text-align: center">
        <v-card-text>
            {{ text }}
        </v-card-text>
    </v-card>
</template>

<script>
export default {
  name: 'Class-card',
  props: ['text'],
  components: {
  },
  data: () => ({
  }),
};
</script>

<style>
</style>
