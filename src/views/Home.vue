<template>
  <div>
    <h1>Home</h1>
    <h4> Welcome to Dr Mad P4 laboratory. Here you can create the most monstruous viruses ever known</h4>
    <v-spacer></v-spacer>
    <v-carousel
        cycle
        height="400"
        hide-delimiter-background
        show-arrows-on-hover
    >
      <v-carousel-item
          v-for="(slide, i) in slides"
          :key="i"
          :src="slide.src"
      >
          <v-row
              class="fill-height"
              align="center"
              justify="center"
          >
            <v-btn
                x-large
                elevation="8"
                color="blue-grey lighten-4"
                :to="slide.path"
            >
              <h2
              >
                {{ slide.text }}
              </h2>

            </v-btn>
          </v-row>
      </v-carousel-item>
    </v-carousel>


  </div>
</template>

<script>

export default {
  data () {
    return {
      slides : [ { text: "Go to the Library to browse the collection of Dr Mad", src: "https://thumbs.dreamstime.com/b/armoire-des-fioles-24832124.jpg" , path:"/library/view"}, { text: "Go to the Lab to imagine new viruses", src: "https://eurofins-labovanpoucke.com/website/var/tmp/image-thumbnails/0/145/thumb__slideshowhomepage/_I7A5817.jpeg" , path:"/labo/slice"}],
    }
  },
  name: 'Home'
}
</script>

<style scoped>
#no-background-hover::before {
  background-color: transparent
}
</style>
