<template>
  <v-sheet
    width="600px"
    class="mx-auto"
  >
    <div class="text-h4 font-weight-bold mb-2">Sign in</div>
    <div class="text-subtitle-1 mb-6">Enter your details below.</div>

    <form @submit.prevent="submit">
      <div class="d-flex ga-1 flex-column">
        <v-text-field
          v-model="name.value.value"
          :error-messages="name.errorMessage.value"
          label="Username"
        />

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          @click:append-inner="visible = !visible"
          v-model="password.value.value"
          :error-messages="password.errorMessage.value"
          label="Password"
        />

        <v-select
          v-model="select.value.value"
          class="mt-2"
          :items="items"
          item-title="name"
          item-value="value"
          label="Language"
          variant="outlined"
          hide-details
        >
          <template #selection="{ item }">
            <span>{{ item.title }}</span>
          </template>
        </v-select>
      </div>

      <div class="d-flex justify-space-between align-center mt-2 mb-3">
        <v-checkbox
          v-model="checkbox.value.value"
          value="1"
          label="Remember username"
          type="checkbox"
          color="blue"
          hide-details
        />

        <v-btn
          color="blue"
          variant="text"
          class="font-weight-bold"
        >
          Forgot password?
        </v-btn>
      </div>

      <div class="d-flex justify-center">
        <v-btn
          type="submit"
          width="300"
          height="48"
          color="blue"
          variant="elevated"
          class="me-4"
        >
          Sign In
        </v-btn>
      </div>
      <div class="text-subtitle-1 text-center mt-6 d-flex justify-center align-center">
        Don't have an account?
        <v-btn
          color="blue"
          variant="text"
          class="px-2"
        >
          Sign Up
        </v-btn>
      </div>
      <div class="text-subtitle-1 text-center my-1 d-flex justify-center align-center ga-2">
        Need help signing in?
        <span class="link text-decoration-underline text-grey-darken-2">Contact us</span>
      </div>
    </form>
  </v-sheet>
</template>

<script setup lang="ts">
definePageMeta({ layout: "access" })

import { useField, useForm } from "vee-validate"
import { login } from "~/apis/auth"
import { TITLE } from "~/constants/app"

const PAGE_TITLE = `Sign In | ${TITLE}`

useHead({ titleTemplate: () => PAGE_TITLE })

useSeoMeta({ title: PAGE_TITLE, ogTitle: PAGE_TITLE })

const { handleSubmit } = useForm({
  initialValues: {
    select: "eng",
    name: "",
    password: ""
  },
  validationSchema: {
    name(value: string) {
      if (value?.length >= 2) return true
      return "Name needs to be at least 2 characters."
    },
    password(value: string) {
      if (value?.length >= 2) return true
      return "Password needs to be at least 2 characters."
    }
  }
})

const name = useField("name")
const password = useField("password")
const select = useField("select")
const checkbox = useField("checkbox")

const visible = ref(false)
const items = ref([
  {
    name: "English",
    value: "eng"
  }
])

const submit = handleSubmit((values) => {
  login({
    email: values.name,
    password: values.password
  })
})
</script>
