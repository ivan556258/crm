<template>
 <div>
      <v-toolbar flat>
        <v-toolbar-title>Добавление водителя</v-toolbar-title>
        
        <v-spacer></v-spacer>
        
          <template>
            <v-btn color="success" class="mb-2" @click="save()" >{{formAutoTitle}}</v-btn>
            <v-btn color="primary" class="mb-2 ml-1" >{{formDriveTitle}}</v-btn>
          </template> 
    </v-toolbar>

<template>
  <v-card>
    <v-toolbar>
      <v-tabs
        slot="extension"
        v-model="tabs"
        background-color="transparent"
      >
        <v-tab> Профиль водителя </v-tab>
        <v-tab> Настройки </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <template>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="editedItem.lastname"
            :counter="150"
            label="Фамилия"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="8"
        >
          <v-text-field
            v-model="editedItem.firstname"
            :counter="150"
            label="Имя"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="8">
          <v-text-field
            v-model="editedItem.fathername"
            :counter="150"
            label="Отчество"
            required
          ></v-text-field>
          </v-col>
          <v-col cols="12" md="8">
           <v-select :items="status" v-model="editedItem.status" label="Статус"></v-select>
          </v-col>
         <v-col cols="12" md="12">
          <v-toolbar-title>Паспортные данные, удостоверение личности</v-toolbar-title>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.seriaAndNumberPassport"
            :counter="10"
            label="Серия и номер"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-menu
                      ref="brithdaymenu"
                      v-model="editedItem.brithdaymenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.brithday"
                          label="Дата рождения"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="brithdaypicker"
                        v-model="editedItem.brithday"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.issued"
            :counter="200"
            label="Выдан"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.codePollicia"
            :counter="14"
            label="Код подразделения"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-menu
                      ref="dateIssuedMenu"
                      v-model="editedItem.dateIssuedMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.dateIssuedDate"
                          label="Дата выдачи"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="dateIssuedPicker"
                        v-model="editedItem.dateIssuedDate"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.locationBrithday"
            :counter="125"
            label="Место рождения"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.addressRegistration"
            :counter="125"
            label="Адрес регистрации"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
           <v-switch v-model="editedItem.isOwner" class="ma-2" label="Является собственником"></v-switch>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.inn"
            :counter="25"
            label="СНИЛС / ИИН"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="12">
          <v-toolbar-title>Контактные данные</v-toolbar-title>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.phone"
            :counter="25"
            label="Телефон"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.email"
            :counter="25"
            label="E-mail"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.addressInLifes"
            :counter="250"
            label="Адрес фактического проживания"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.moreContacts"
            :counter="500"
            label="Дополнительные контакты"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="12">
          <v-toolbar-title>Данные водителя</v-toolbar-title>
         </v-col>
         <v-col cols="12" md="6">
           <v-switch v-model="editedItem.foreginDriversLicence" class="ma-2" label="Иностранное водительское удостоверение"></v-switch>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.classInsurance"
            :counter="50"
            label="Класс страховки"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.numberDriverLicence"
            :counter="50"
            label="Номер ВУ"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-menu
                      ref="dateIssuedDriverLicenceMenu"
                      v-model="editedItem.dateIssuedDriverLicenceMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.dateIssuedDriverLicenceDate"
                          label="Дата выдачи ВУ"
                          clearable
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="dateIssuedDriverLicencePicker"
                        v-model="editedItem.dateIssuedDriverLicenceDate"
                        max="2050-01-01"
                        min="1950-01-01"
                      ></v-date-picker>
                  </v-menu>
         </v-col>
         <v-col cols="12" md="6">
           <v-switch v-model="editedItem.isSelfCar" class="ma-2" label="Имеется личный автомобиль"></v-switch>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.carBrandAndNumber"
            :counter="100"
            label="Марка авто и номер"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.rating"
            :counter="50"
            label="Рейтинг"
            required
          ></v-text-field> 
         </v-col>
         <v-col cols="12" md="12">
          <v-toolbar-title>Дополнительные данные</v-toolbar-title>
         </v-col>
          <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.commentaries"
            :counter="450"
            label="Комментарий"
            required
          ></v-text-field> 
         </v-col>
      </v-row>
    </v-container>
</template>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
          <v-container>
             <v-row>
          <v-col cols="12" md="12">
                <v-toolbar-title>SMS</v-toolbar-title>
          </v-col>
          <v-col cols="12" md="6">
           <v-switch v-model="editedItem.informDriverBalanceChanges" class="ma-2" label="Информировать водителя при изменении баланса счета"></v-switch>
         </v-col>
         <v-col cols="12" md="6">
           <v-switch v-model="editedItem.informDriverBalanceLittle" class="ma-2" label="Информировать о необходимости пополнить счет при балансе меньше нуля"></v-switch>
         </v-col>
         <v-col cols="12" md="6">
           <v-switch v-model="editedItem.informDriverNewPenalty" class="ma-2" label="Информировать о новых штрафах ГИБДД"></v-switch>
         </v-col>
         <v-col cols="12" md="6">
           <v-switch v-model="editedItem.informDriverOilChange" class="ma-2" label="Информировать о необходимости замены масла"></v-switch>
         </v-col>
          <v-col cols="12" md="12">
                <v-toolbar-title>Блокировка автомобиля</v-toolbar-title>
          </v-col>
          <v-col cols="12" md="6">
           <v-switch v-model="editedItem.allowedBlocked" class="ma-2" label="Разрешение блокировки"></v-switch>
         </v-col>
         <v-col cols="12" md="6">
          <v-text-field
            v-model="editedItem.thresholdBalanceForDriver"
            :counter="6"
            label="Пороговый баланс водителя"
            required
          ></v-text-field> 
         </v-col>
          <v-col cols="12" md="12">
                <v-toolbar-title>Yandex API</v-toolbar-title>
          </v-col>
          <v-col cols="12" md="6">
           <v-switch v-model="editedItem.onAutomaticRentMoney" class="ma-2" label="Включить автоматические списания арендной платы с диспетчерской"></v-switch>
         </v-col>
               </v-row>
    </v-container>
          </v-card-text>
        </v-card>
        
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
</div>
</template>

<script>
  import axios from "axios"
  export default {
    name: 'AppUserDriverProfileId',
    data () {
      return {
        tabs: null,
        status: [
          "активный", 
          "заблокированный", 
          "проверенный", 
          "удалённый", 
          "неактивный", 
          "предрегистрация", 
          "предрегистрация", 
          "предрегистрация",
          "непроверенный",
          "передан на взыскание"
          ],
      dialog: false,
      editedIndex: -1,
      editedItem:{
        _id: null,
        lastname: null,
        firstname: null,
        fathername: null,
        seriaAndNumberPassport: null,
        locationBrithday: null,
        addressRegistration: null,
        isOwner: false,
        phone: null,
        email: null,
        inn: null,
        classInsurance: null,
        numberDriverLicence: null,
        dateIssuedDriverLicenceMenu: null,
        dateIssuedDriverLicenceDate: null,
        addressInLifes: null,
        moreContacts: null,
        foreginDriversLicence: false,
        isSelfCar: false,
        carBrandAndNumber: null,
        rating: null,
        commentaries: null,
        brithdaymenu: null,
        informDriverBalanceChanges: false,
        informDriverBalanceLittle: false,
        informDriverNewPenalty: false,
        informDriverOilChange: false,
        allowedBlocked: false,
        onAutomaticRentMoney: false,
        thresholdBalanceForDriver: null,
        dateIssuedMenu: null,
        dateIssuedDate: null,
        brithday: null,
        issued: null,
        codePollicia: null,
        brithdaypicker: new Date().toISOString(),
        dateIssuedPicker: new Date().toISOString(),
        dateIssuedDriverLicencePicker: new Date().toISOString(),
        picker: new Date().toISOString(),
        status: null,
        }
      }
    },
    computed: {
      formDriveTitle () {
        return this.editedIndex === -1 ? 'Сохранить и выйти' : 'Редактировать и выйти'
      },
      formAutoTitle () {
        return this.editedIndex === -1 ? 'Сохранить' : 'Редактировать'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      this.initialize()
    },
    methods: {
      initialize () {
          axios({
            method: "get",
            url:"http://localhost:8081/selectDriverDataOne?id="+this.$route.params.id
          })
          .then(response => {
            this.ha = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
          axios({
          method: 'post',
          url: 'http://localhost:8081/updateDriverData',
          data: {
              lastname: this.editedItem.lastname,
              firstname: this.editedItem.firstname,
              fathername: this.editedItem.fathername,
              seriaAndNumberPassport: this.editedItem.seriaAndNumberPassport,
              locationBrithday: this.editedItem.locationBrithday,
              addressRegistration: this.editedItem.addressRegistration,
              isOwner: this.editedItem.isOwner,
              phone: this.editedItem.phone,
              email: this.editedItem.email,
              inn: this.editedItem.inn,
              classInsurance: this.editedItem.classInsurance,
              numberDriverLicence: this.editedItem.numberDriverLicence,
              dateIssuedDriverLicenceMenu: this.editedItem.dateIssuedDriverLicenceMenu,
              dateIssuedDriverLicenceDate: this.editedItem.dateIssuedDriverLicenceDate,
              addressInLifes: this.editedItem.addressInLifes,
              moreContacts: this.editedItem.moreContacts,
              foreginDriversLicence: this.editedItem.foreginDriversLicence,
              isSelfCar: this.editedItem.isSelfCar,
              carBrandAndNumber: this.editedItem.carBrandAndNumber,
              rating: this.editedItem.rating,
              commentaries: this.editedItem.commentaries,
              brithdaymenu: this.editedItem.brithdaymenu,
              informDriverBalanceChanges: this.editedItem.informDriverBalanceChanges,
              informDriverBalanceLittle: this.editedItem.informDriverBalanceLittle,
              informDriverNewPenalty: this.editedItem.informDriverNewPenalty,
              informDriverOilChange: this.editedItem.informDriverOilChange,
              allowedBlocked: this.editedItem.allowedBlocked,
              onAutomaticRentMoney: this.editedItem.onAutomaticRentMoney,
              thresholdBalanceForDriver: this.editedItem.thresholdBalanceForDriver,
              dateIssuedMenu: this.editedItem.dateIssuedMenu,
              dateIssuedDate: this.editedItem.dateIssuedDate,
              brithday: this.editedItem.brithday,
              issued: this.editedItem.issued,
              codePollicia: this.editedItem.codePollicia,
              brithdaypicker: this.editedItem.brithdaypicker,
              dateIssuedPicker: this.editedItem.dateIssuedPicker,
              dateIssuedDriverLicencePicker: this.editedItem.dateIssuedDriverLicencePicker,
              status: this.editedItem.status,
              _id: this.$route.params.id
          }
        })
      .then(function(){
        console.log('SUCCESS!!')
      })
      .catch(function(){
        console.log('FAILURE!!')
      })
      },
    },
  }
</script>