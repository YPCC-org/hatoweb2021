<template>
  <div>
    <v-row class="mx-auto pt-3">
      <v-col cols="11" md="6" class="mx-auto py-0 mt-3" v-for="c in stages" :key="c.name">
        <v-card outlined style="white-space:pre-wrap; word-wrap:break-word;">
          <v-card-title>
            {{ c.name }}
          </v-card-title>
          <v-card-subtitle>
            {{ c.place }}
          </v-card-subtitle>
          <v-card-text>
            {{ c.ex }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
    name: 'Stage',
    data: () => ({
      stages: [
        { 
            name: "",
            place: "",
            ex: ""
        },
      ],
    }),
};
</script>

