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
                <v-btn block text to="/admin/registration">
                     Регистрация на сайте
                </v-btn>
                </v-card-text>
            </v-col>
          </v-row>
          <v-row>
          <v-col v-if="show === true" class="pos-success fade-leave-active" cols="12" sm="8" md="5">
              <v-alert type="success">
                  Сообщение отправлено на почту
              </v-alert>
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
    email: "",
    show: false,
    ip: "",
    inset: false,
      items: [
        'default',
        'vertical',
      ],
    variant: 'default',
  }),
  computed: {
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
        url: "http://localhost:8081/resetAuthData",
        data: {
          email: this.email,
          ip: this.ip,
          browser: this.get_name_browser()
        }
      })
        .then(response => {
          console.log(response);
           this.show = true
        })
        .catch(function() {
          console.log("FAILURE!!");
        });
    }
  }
};
</script>
<style scoped>
#keep .v-navigation-drawer__border {
  display: none;
}
.pos-success {
    position: absolute;
    float: right;
    right: 0;
    top: 0;
    opacity: 1;
}
.fade-leave-active {
  transition: opacity .5s;
   opacity: 1;
}
</style>

