<template>
  <section class="page_404 h-screen w-100 d-flex align-center">
    <div class="w-100">
      <div class="four_zero_four_bg">
        <h1 class="text-center text-black font-italic">Oops!</h1>
      </div>

      <div class="d-flex flex-column align-center ga-3 mt-n12 text-black">
        <h3 class="text-h5">Something went wrong !!!</h3>
        <p>
          Something went wrong and we couldn't load this content.
          <strong>Refreshing the browser</strong> may fix the problem.
        </p>
        <div class="d-flex ga-3">
          <a :href="DEFAULT_URI">
            <v-btn
              color="success"
              variant="tonal"
              class="font-weight-bold"
              >Go to Home
            </v-btn>
          </a>
          <v-btn
            color="secondary"
            class="font-weight-bold"
            prepend-icon="mdi-reload"
            @click="reload"
          >
            Reload
          </v-btn>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { DEFAULT_URI } from "./constants/route"

const reload = () => window.location.reload()
</script>

<style scoped lang="scss">
.page_404 {
  padding: 40px 0;
  background: #fff;
  font-family: "Roboto";
  img {
    width: 100%;
  }

  .four_zero_four_bg {
    /* from public folder */
    background-image: url(/error_page.gif);
    height: 400px;
    background-position: center;
    h1 {
      font-size: 80px;
    }
  }
}
</style>
