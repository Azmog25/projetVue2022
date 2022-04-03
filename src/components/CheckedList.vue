<template>
  <div>
    <v-simple-table>
      <tr>
        <th>
          <h3 v-for="(e,index) in parts" :key="index">
            <input type="checkbox" :id="index" :value="index" v-model="chosenEntries" @change="$emit('chosen-changed',chosenEntries)">
            <label :for="index"><span v-for="(f,index) in fields" :key="index">{{e[f]}} </span></label>
          </h3>
        </th>
      </tr>
    </v-simple-table>
  </div>
</template>

<script>

  export default {
    name: 'CheckedList',
    props: ['entries','fields'],
    data() {
      return {
        chosenEntries:[],
        parts: this.$store.getters.getParts
      }
    }
  }
</script>

<style scoped>
</style>
