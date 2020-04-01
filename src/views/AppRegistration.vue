<template>
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Регистрация</v-toolbar-title>
                  <v-spacer />
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field label="Email" v-model="email" prepend-icon="email" type="text" />
                    <v-text-field label="Телефон" v-model="phone" prepend-icon="phone" type="text" />

                    <v-text-field
                      id="password"
                      label="Пароль"
                      v-model="password"
                      prepend-icon="lock"
                      type="password"
                    />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn @click="submit()" color="primary">Войти</v-btn>
                </v-card-actions>
              </v-card>
              <v-card-text>
                <v-btn block text to="/admin/auth">
                     Авторизироваться
                </v-btn>
              </v-card-text>
              <v-card-text>
                <v-btn block text to="/admin/resetPassword">
                     Востановить пароль
                </v-btn>
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked(val) {
        return val;
      }
    }
  },
  data: () => ({
    name: "",
    email: "",
    phone: "",
    password: "",
    ip: "",
    inset: false,
      items: [
        'default',
        'vertical',
      ],
    variant: 'default',
  }),
  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      axios({
        method: "get",
        url: "https://api.ipify.org/?format=json"
      })
        .then(response => {
          this.ip = response.data.ip;
        })
        .catch(error => {
          console.log(error);
        });
    },
    get_name_browser() {
      // получаем данные userAgent
      var ua = navigator.userAgent;
      // с помощью регулярок проверяем наличие текста,
      // соответствующие тому или иному браузеру
      if (ua.search(/Chrome/) > 0) return "Google Chrome";
      if (ua.search(/Firefox/) > 0) return "Firefox";
      if (ua.search(/Opera/) > 0) return "Opera";
      if (ua.search(/Safari/) > 0) return "Safari";
      if (ua.search(/MSIE/) > 0) return "Internet Explorer";
      // условий может быть и больше.
      // сейчас сделаны проверки только
      // для популярных браузеров
      return "Не определен";
    },
    submit() {
      this.$v.$touch();
      axios({
        method: "post",
        url: "http://localhost:8081/insertAuthData",
        data: {
          email: this.email,
          phone: this.phone,
          show: false,
          password: this.password,
          ip: this.ip,
          browser: this.get_name_browser()
        }
      })
       /*  .then(response => {
          alert(5);
          //this.$router.push({ path: `/admin/auth` })
        })
        .catch(function() {
          console.log("FAILURE!!");
        }); */
    }
  }
};
</script>
<style scoped>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>

